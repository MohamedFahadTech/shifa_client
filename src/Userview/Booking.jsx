import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ShoppingBagIcon, 
  CheckCircleIcon, 
  PlusIcon, 
  MinusIcon,
  SparklesIcon,
  FireIcon
} from "@heroicons/react/24/outline";

const Booking = () => {
  const [services, setServices] = useState([]);
  const [selections, setSelections] = useState({});
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("selection");

  // Professional HD Icon Mapping
  const categoryImages = {
    Shirt: "https://cdn-icons-png.flaticon.com/512/2503/2503380.png",
    Pant: "https://cdn-icons-png.flaticon.com/512/3534/3534312.png",
    Saree: "https://cdn-icons-png.flaticon.com/512/3115/3115534.png",
    Blanket: "https://cdn-icons-png.flaticon.com/512/824/824249.png", 
    Carpet: "https://cdn-icons-png.flaticon.com/512/1601/1601171.png",
    Curtain: "https://cdn-icons-png.flaticon.com/512/2550/2550130.png"
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/services");
        const data = res.data.data;
        setServices(data);
        
        const initial = {};
        data.forEach(cat => {
          initial[cat.category] = {
            fabric: cat.fabrics[0]?.name,
            mode: "Wash", 
            washQuality: "Normal",
            ironQuality: "Normal",
            count: 1
          };
        });
        setSelections(initial);
      } catch (err) { console.error("API Error:", err); }
    };
    fetchServices();
  }, []);

  const getUnitPrice = (catName) => {
    const sel = selections[catName];
    const catData = services.find(c => c.category === catName);
    const fabric = catData?.fabrics.find(f => f.name === sel.fabric);
    if (!fabric) return 0;

    let unitTotal = 0;

    // 1. Handle Combined "Wash & Iron" package if it exists (e.g. Linen)
    const combo = fabric.services.find(s => s.type === "Wash & Iron");
    if (combo) {
      return combo.options.find(o => o.label === (sel.washQuality === "Premium" ? "Premium" : "Standard") || o.label === "Normal")?.price || 0;
    }

    // 2. Individual Wash Logic
    if (sel.mode === "Wash" || sel.mode === "Both") {
      const washSrv = fabric.services.find(s => s.type === "Wash");
      unitTotal += washSrv?.options.find(o => o.label === sel.washQuality)?.price || 0;
    }

    // 3. Individual Iron Logic
    if (sel.mode === "Iron" || sel.mode === "Both") {
      const ironSrv = fabric.services.find(s => s.type === "Iron");
      // If Both is selected, Premium wash usually implies Steam iron
      const targetLabel = (sel.mode === "Both" && sel.washQuality === "Premium") ? "Steam" : sel.ironQuality;
      unitTotal += ironSrv?.options.find(o => o.label === targetLabel || o.label === "Normal")?.price || 0;
    }

    return unitTotal;
  };

  const updateCount = (catName, delta) => {
    setSelections(prev => ({
      ...prev,
      [catName]: { ...prev[catName], count: Math.max(1, prev[catName].count + delta) }
    }));
  };

  const addToCart = (catName) => {
    const sel = selections[catName];
    const unit = getUnitPrice(catName);
    const id = `${catName}-${sel.fabric}-${sel.mode}-${sel.washQuality}-${sel.ironQuality}`;

    setCart(prev => {
      const exists = prev.find(i => i.id === id);
      if (exists) return prev.map(i => i.id === id ? {...i, qty: i.qty + sel.count} : i);
      return [...prev, { 
        id, 
        name: catName, 
        desc: `${sel.fabric} (${sel.mode})`, 
        price: unit, 
        qty: sel.count 
      }];
    });
  };

  if (step === "success") return <SuccessScreen />;

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white min-h-screen font-sans">
      
      {/* LEFT COLUMN: Service Cards */}
      <div className="lg:col-span-2 space-y-8">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Select Items</h1>
            <p className="text-gray-500 font-medium">Premium cleaning for your essentials</p>
          </div>
          <SparklesIcon className="h-12 w-12 text-blue-500 bg-blue-50 p-2 rounded-2xl" />
        </header>

        {services.map((cat) => {
          const sel = selections[cat.category];
          if (!sel) return null;
          
          const currentFabric = cat.fabrics.find(f => f.name === sel.fabric);
          const hasWash = currentFabric.services.some(s => s.type === "Wash");
          const hasIron = currentFabric.services.some(s => s.type === "Iron");
          const isCombo = currentFabric.services.some(s => s.type === "Wash & Iron");

          return (
            <div key={cat.category} className="bg-slate-50 rounded-[3rem] p-8 flex flex-col md:flex-row gap-8 border border-slate-100 transition-all hover:shadow-2xl hover:shadow-blue-100 hover:bg-white">
              
              {/* IMAGE & QUANTITY */}
              <div className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 bg-white rounded-[2rem] shadow-sm flex items-center justify-center p-6 border border-slate-100">
                  <img src={categoryImages[cat.category] || categoryImages.Shirt} alt={cat.category} className="w-full h-full object-contain" />
                </div>
                <div className="flex items-center gap-5 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200">
                  <button onClick={() => updateCount(cat.category, -1)} className="hover:text-red-500 transition-colors"><MinusIcon className="h-6 w-6" /></button>
                  <span className="font-black text-xl text-slate-800 w-6 text-center">{sel.count}</span>
                  <button onClick={() => updateCount(cat.category, 1)} className="hover:text-blue-600 transition-colors"><PlusIcon className="h-6 w-6" /></button>
                </div>
              </div>

              {/* SELECTION AREA */}
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">{cat.category}</h2>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Available</span>
                </div>

                {/* FABRIC CHIPS */}
                <div className="flex flex-wrap gap-2">
                  {cat.fabrics.map(f => (
                    <button 
                      key={f.name} 
                      onClick={() => setSelections({...selections, [cat.category]: {...sel, fabric: f.name}})}
                      className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${sel.fabric === f.name ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-400 border border-slate-200'}`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>

                {/* SERVICE MODES */}
                {!isCombo && (
                  <div className="flex gap-8 border-b border-slate-200">
                    {["Wash", "Iron", "Both"].map(m => {
                      if (m === "Wash" && !hasWash) return null;
                      if (m === "Iron" && !hasIron) return null;
                      if (m === "Both" && (!hasWash || !hasIron)) return null;
                      
                      return (
                        <button 
                          key={m} 
                          onClick={() => setSelections({...selections, [cat.category]: {...sel, mode: m}})}
                          className={`pb-3 text-sm font-black transition-all border-b-4 ${sel.mode === m ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* QUALITY DROPDOWNS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(sel.mode === "Wash" || sel.mode === "Both" || isCombo) && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Wash Type</label>
                      <select 
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-white font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
                        value={sel.washQuality}
                        onChange={(e) => setSelections({...selections, [cat.category]: {...sel, washQuality: e.target.value}})}
                      >
                        <option value="Normal">Normal Wash</option>
                        <option value="Premium">Premium Wash</option>
                      </select>
                    </div>
                  )}

                  {(sel.mode === "Iron" || sel.mode === "Both") && !isCombo && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Iron Type</label>
                      <select 
                        className="w-full p-3 rounded-2xl border border-slate-200 bg-white font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100"
                        value={sel.ironQuality}
                        onChange={(e) => setSelections({...selections, [cat.category]: {...sel, ironQuality: e.target.value}})}
                      >
                        <option value="Normal">Normal Iron</option>
                        <option value="Steam">Steam Iron</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* PRICE & ACTION */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Total Amount</span>
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{getUnitPrice(cat.category) * sel.count}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(cat.category)}
                    className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200"
                  >
                    Add Order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT COLUMN: Basket Summary */}
      <div className="lg:col-span-1">
        <div className="bg-slate-900 text-white rounded-[3rem] p-8 shadow-2xl sticky top-10 overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
            <ShoppingBagIcon className="h-40 w-40" />
          </div>
          
          <h3 className="text-2xl font-black mb-8 relative z-10 flex items-center gap-3">
            <ShoppingBagIcon className="h-7 w-7 text-yellow-400" /> 
            Summary
          </h3>

          <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2 relative z-10 custom-scrollbar">
            {cart.length === 0 && (
              <p className="text-slate-400 font-medium py-10 text-center">Your basket is empty...</p>
            )}
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center group animate-in slide-in-from-right-5">
                <div className="flex-1">
                  <p className="font-black text-lg group-hover:text-yellow-400 transition-colors">{item.qty}x {item.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-yellow-400 text-lg">₹{item.price * item.qty}</p>
                  <p className="text-[9px] text-slate-500">₹{item.price} ea</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800 relative z-10">
            <div className="flex justify-between items-end mb-8">
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs font-bold uppercase">Grand Total</span>
                <span className="text-5xl font-black text-white">₹{cart.reduce((s, i) => s + (i.price * i.qty), 0)}</span>
              </div>
            </div>
            <button 
              onClick={() => setStep("success")}
              disabled={cart.length === 0}
              className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-xl hover:bg-yellow-400 hover:text-slate-900 transition-all shadow-2xl disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Success Screen UI
const SuccessScreen = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white p-6">
    <div className="max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
      <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <CheckCircleIcon className="h-16 w-16 text-green-600" />
      </div>
      <h1 className="text-5xl font-black text-slate-900 tracking-tighter">SUCCESS!</h1>
      <p className="text-slate-500 font-bold text-lg">Your pickup has been scheduled. Our team will arrive shortly.</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black tracking-widest hover:bg-blue-600 transition-all"
      >
        BOOK ANOTHER
      </button>
    </div>
  </div>
);

export default Booking;
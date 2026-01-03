import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ShoppingBagIcon, 
  CheckCircleIcon, 
  PlusIcon, 
  MinusIcon,
  XMarkIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

const Booking = () => {
  const [services, setServices] = useState([]);
  const [selections, setSelections] = useState(null); // Active item being configured
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("selection"); // selection, success

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
        setServices(res.data.data);
      } catch (err) { console.error("API Error:", err); }
    };
    fetchServices();
  }, []);

  const openConfigurator = (cat) => {
    setSelections({
      category: cat.category,
      fabric: cat.fabrics[0]?.name,
      mode: "Wash",
      washQuality: "Normal",
      ironQuality: "Normal",
      count: 1,
      raw: cat
    });
  };

  const getUnitPrice = (sel) => {
    if (!sel) return 0;
    const fabric = sel.raw.fabrics.find(f => f.name === sel.fabric);
    let unitTotal = 0;
    const combo = fabric.services.find(s => s.type === "Wash & Iron");
    if (combo) return combo.options.find(o => o.label === (sel.washQuality === "Premium" ? "Premium" : "Standard") || o.label === "Normal")?.price || 0;
    
    if (sel.mode === "Wash" || sel.mode === "Both") {
      const washSrv = fabric.services.find(s => s.type === "Wash");
      unitTotal += washSrv?.options.find(o => o.label === sel.washQuality)?.price || 0;
    }
    if (sel.mode === "Iron" || sel.mode === "Both") {
      const ironSrv = fabric.services.find(s => s.type === "Iron");
      const targetLabel = (sel.mode === "Both" && sel.washQuality === "Premium") ? "Steam" : sel.ironQuality;
      unitTotal += ironSrv?.options.find(o => o.label === targetLabel || o.label === "Normal")?.price || 0;
    }
    return unitTotal;
  };

  const addToCart = () => {
    const unit = getUnitPrice(selections);
    const id = `${selections.category}-${selections.fabric}-${selections.mode}-${selections.washQuality}-${selections.ironQuality}`;
    setCart(prev => {
      const exists = prev.find(i => i.id === id);
      if (exists) return prev.map(i => i.id === id ? {...i, qty: i.qty + selections.count} : i);
      return [...prev, { id, name: selections.category, desc: `${selections.fabric} • ${selections.mode}`, price: unit, qty: selections.count }];
    });
    setSelections(null);
  };

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));

  if (step === "success") return <SuccessScreen />;

  return (
    <div className="min-h-screen bg-slate-50 pb-32 lg:pb-10">
      {/* Header */}
      <nav className="bg-white border-b sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">Launderly.</h1>
          <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Pick-up Available
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Item Selection Grid */}
        <div className="lg:col-span-8">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">What are we cleaning?</h2>
            <p className="text-slate-500">Select an item to customize your service</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {services.map(cat => (
              <button 
                key={cat.category}
                onClick={() => openConfigurator(cat)}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col items-center group text-center"
              >
                <div className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform">
                  <img src={categoryImages[cat.category]} alt="" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-slate-700">{cat.category}</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Starting ₹{cat.fabrics[0]?.services[0]?.options[0]?.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBagIcon className="w-5 h-5" /> Your Basket
              </h3>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-xs font-bold">{cart.length} items</span>
            </div>

            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <PlusIcon className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Add items to get started</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center group animate-in fade-in slide-in-from-right-2">
                    <div>
                      <p className="font-bold text-sm">{item.qty}x {item.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-slate-900">₹{item.price * item.qty}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Total Amount</span>
                <span className="text-3xl font-black text-slate-900">₹{cart.reduce((s, i) => s + (i.price * i.qty), 0)}</span>
              </div>
              <button 
                onClick={() => setStep("success")}
                disabled={cart.length === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all disabled:opacity-30 active:scale-95 shadow-lg shadow-blue-200"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Item Configurator Modal */}
      {selections && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelections(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden p-8 animate-in slide-in-from-bottom-10 duration-300">
            <button onClick={() => setSelections(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors">
              <XMarkIcon className="w-6 h-6 text-slate-400" />
            </button>

            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center p-4">
                <img src={categoryImages[selections.category]} alt="" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 leading-none mb-2">{selections.category}</h3>
                <p className="text-blue-600 font-bold">₹{getUnitPrice(selections)} per unit</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Fabric */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Choose Fabric</label>
                <div className="flex flex-wrap gap-2">
                  {selections.raw.fabrics.map(f => (
                    <button 
                      key={f.name}
                      onClick={() => setSelections({...selections, fabric: f.name})}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${selections.fabric === f.name ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Type */}
              {!selections.raw.fabrics.find(f => f.name === selections.fabric).services.some(s => s.type === "Wash & Iron") && (
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Service Type</label>
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-2xl">
                    {["Wash", "Iron", "Both"].map(m => (
                      <button 
                        key={m}
                        onClick={() => setSelections({...selections, mode: m})}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${selections.mode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between bg-slate-50 p-6 rounded-3xl">
                <div>
                  <span className="text-sm font-bold text-slate-900">Total Quantity</span>
                  <p className="text-xs text-slate-500">How many items?</p>
                </div>
                <div className="flex items-center gap-6">
                  <button onClick={() => setSelections({...selections, count: Math.max(1, selections.count - 1)})} className="p-2 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-blue-600">
                    <MinusIcon className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-black text-slate-900 w-4 text-center">{selections.count}</span>
                  <button onClick={() => setSelections({...selections, count: selections.count + 1})} className="p-2 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-blue-600">
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button 
                onClick={addToCart}
                className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-bold text-lg flex justify-between items-center px-8 hover:bg-blue-700 transition-all active:scale-95"
              >
                <span>Add to Basket</span>
                <span className="flex items-center gap-1">
                  ₹{getUnitPrice(selections) * selections.count} <ChevronRightIcon className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SuccessScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-white p-6">
    <div className="text-center">
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircleIcon className="w-12 h-12 text-green-500" />
      </div>
      <h1 className="text-4xl font-black text-slate-900 mb-2">Order Confirmed!</h1>
      <p className="text-slate-500 font-medium mb-8">Our executive will reach you within 30 minutes.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold tracking-tight hover:bg-blue-600 transition-all"
      >
        Done
      </button>
    </div>
  </div>
);

export default Booking;
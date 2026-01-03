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
  const [selections, setSelections] = useState(null); 
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("selection"); 
  const [isMobileBasketOpen, setIsMobileBasketOpen] = useState(false);

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
  const totalAmount = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  if (step === "success") return <SuccessScreen />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Dynamic Header */}
      <nav className="w-full bg-white border-b sticky top-0 z-40 px-[5%] py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-black text-blue-600 tracking-tight">Launderly.</h1>
          <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="hidden xs:inline tracking-wide uppercase">Pickup Active</span>
          </div>
        </div>
      </nav>

      {/* Responsive Layout Container */}
      <main className="w-full max-w-7xl mx-auto p-[4%] lg:p-10 flex flex-col lg:flex-row gap-8 lg:items-start">
        
        {/* Left Section: Fluid Grid */}
        <div className="w-full lg:flex-[2]">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">Fast Service. <br className="sm:hidden" /> <span className="text-blue-600">Pure Clean.</span></h2>
            <p className="text-slate-400 mt-2 font-medium">Select items to get started</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {services.map(cat => (
              <button 
                key={cat.category}
                onClick={() => openConfigurator(cat)}
                className="bg-white aspect-square sm:aspect-auto sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col items-center justify-center group"
              >
                <div className="w-[40%] aspect-square mb-4 group-hover:scale-110 transition-transform">
                  <img src={categoryImages[cat.category]} alt="" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-slate-800 text-sm sm:text-lg">{cat.category}</span>
                <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest text-slate-300 mt-1">₹{cat.fabrics[0]?.services[0]?.options[0]?.price}+</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Sidebar: Flexible width */}
        <div className="hidden lg:block lg:flex-1 sticky top-28">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <BasketContent cart={cart} removeFromCart={removeFromCart} totalAmount={totalAmount} setStep={setStep} />
          </div>
        </div>
      </main>

      {/* Responsive Modal / Bottom Sheet */}
      {selections && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelections(null)} />
          <div className="relative bg-white w-full sm:max-w-lg rounded-t-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden p-8 sm:p-10 animate-in slide-in-from-bottom duration-300">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl p-3 flex items-center justify-center">
                        <img src={categoryImages[selections.category]} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">{selections.category}</h3>
                        <p className="text-blue-600 font-bold">₹{getUnitPrice(selections)}/unit</p>
                    </div>
                </div>
                <button onClick={() => setSelections(null)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100"><XMarkIcon className="w-6 h-6"/></button>
            </div>

            <div className="space-y-8">
              {/* Flexible Fabric Toggles */}
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Fabric Type</label>
                <div className="flex flex-wrap gap-2">
                  {selections.raw.fabrics.map(f => (
                    <button 
                      key={f.name}
                      onClick={() => setSelections({...selections, fabric: f.name})}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border ${selections.fabric === f.name ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive Service Tabs */}
              {!selections.raw.fabrics.find(f => f.name === selections.fabric).services.some(s => s.type === "Wash & Iron") && (
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Service Mode</label>
                  <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl">
                    {["Wash", "Iron", "Both"].map(m => (
                      <button 
                        key={m}
                        onClick={() => setSelections({...selections, mode: m})}
                        className={`py-3 rounded-xl text-xs font-black transition-all ${selections.mode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector - Large Touch Area */}
              <div className="flex items-center justify-between bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <span className="font-black text-slate-800 uppercase tracking-widest text-xs">Quantity</span>
                <div className="flex items-center gap-8">
                  <button onClick={() => setSelections({...selections, count: Math.max(1, selections.count - 1)})} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 active:scale-90"><MinusIcon className="w-5 h-5"/></button>
                  <span className="text-2xl font-black text-slate-900">{selections.count}</span>
                  <button onClick={() => setSelections({...selections, count: selections.count + 1})} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-200 active:scale-90"><PlusIcon className="w-5 h-5"/></button>
                </div>
              </div>

              {/* Add Button */}
              <button 
                onClick={addToCart}
                className="w-full bg-blue-600 text-white py-6 rounded-[1.8rem] font-black text-lg flex justify-between items-center px-10 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-200"
              >
                <span>Add Item</span>
                <span>₹{getUnitPrice(selections) * selections.count}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Basket Bar (Fluid) */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-8 left-[5%] right-[5%] z-40 transition-all animate-in slide-in-from-bottom-10">
            <button 
                onClick={() => setIsMobileBasketOpen(true)}
                className="w-full bg-slate-900 text-white p-5 rounded-[2rem] shadow-2xl flex justify-between items-center border border-slate-800"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center"><ShoppingBagIcon className="w-5 h-5" /></div>
                    <span className="font-black tracking-tight">{cart.length} Items Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl font-black">₹{totalAmount}</span>
                    <ChevronRightIcon className="w-4 h-4 text-slate-500" />
                </div>
            </button>
        </div>
      )}

      {/* Full Screen Mobile Basket Overlay */}
      {isMobileBasketOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsMobileBasketOpen(false)} />
            <div className="relative mt-auto bg-white rounded-t-[3rem] p-8 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
                <BasketContent cart={cart} removeFromCart={removeFromCart} totalAmount={totalAmount} setStep={setStep} isMobile />
            </div>
        </div>
      )}
    </div>
  );
};

// Reusable Flexible Basket Component
const BasketContent = ({ cart, removeFromCart, totalAmount, setStep, isMobile = false }) => (
    <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900">Your Basket</h3>
            <span className="text-xs font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{cart.length} Units</span>
        </div>

        <div className="space-y-6 mb-10">
            {cart.length === 0 ? (
                <div className="py-20 text-center opacity-30 font-black uppercase tracking-widest text-xs">Empty</div>
            ) : (
                cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div>
                            <p className="font-black text-slate-800 leading-tight">{item.qty}x {item.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tight">{item.desc}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-black text-slate-900">₹{item.price * item.qty}</span>
                            <button onClick={() => removeFromCart(item.id)} className="text-slate-200 hover:text-red-500 transition-colors">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>

        <div className="mt-auto border-t pt-8 space-y-6">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Grand Total</span>
                <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{totalAmount}</span>
            </div>
            <button 
                onClick={() => setStep("success")}
                disabled={cart.length === 0}
                className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-20 shadow-xl shadow-blue-100"
            >
                Checkout
            </button>
        </div>
    </div>
);

const SuccessScreen = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
    <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mb-8 animate-bounce">
        <CheckCircleIcon className="w-12 h-12" />
    </div>
    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Order Placed!</h1>
    <p className="text-slate-400 font-bold max-w-xs mx-auto mb-12">Hang tight! Our team is on the way to pick up your laundry.</p>
    <button 
      onClick={() => window.location.reload()}
      className="w-full max-w-sm bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl"
    >
      Continue Shopping
    </button>
  </div>
);

export default Booking;
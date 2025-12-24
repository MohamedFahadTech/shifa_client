import React, { useState } from 'react';
import { 
  PlusIcon, 
  MinusIcon, 
  MapPinIcon, 
  ShoppingBagIcon, 
  ShieldCheckIcon 
} from "@heroicons/react/24/outline";

const Booking = () => {
  // 1. State for Items
  const [items, setItems] = useState([
    { id: 1, name: 'T-Shirt / Top', price: 5, quantity: 0, icon: '👕' },
    { id: 2, name: 'Trousers / Jeans', price: 7, quantity: 0, icon: '👖' },
    { id: 3, name: 'Suit (2 Piece)', price: 15, quantity: 0, icon: '🧥' },
    { id: 4, name: 'Duvet / Blanket', price: 20, quantity: 0, icon: '🛌' },
  ]);

  const [location, setLocation] = useState({ lat: null, lng: null, status: 'Not Tracked' });

  // 2. Logic to Update Quantity
  const updateQuantity = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  // 3. Geolocation Logic
  const handleBooking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocation({ ...location, status: 'Locating...' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          status: 'Location Captured'
        };
        setLocation(userLoc);
        
        // Final Submission Logic
        const orderData = { items: items.filter(i => i.quantity > 0), total: totalPrice, location: userLoc };
        console.log("Order Submitted:", orderData);
        alert(`Booking Confirmed!\nLocation: ${userLoc.lat}, ${userLoc.lng}`);
      },
      () => {
        setLocation({ ...location, status: 'Permission Denied' });
        alert("Unable to retrieve your location. Please enable location services.");
      }
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-[#0B0C0F] italic uppercase">
          BOOK A <span className="text-[#F6C453] not-italic">SERVICE</span>
        </h2>
        <p className="text-gray-500 text-sm font-medium mt-1">Select your items and confirm your pickup location.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Item Selection */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-[28px] border border-gray-100 flex items-center justify-between hover:border-[#F6C453] transition-all shadow-sm group">
              <div className="flex items-center gap-4">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-[#0B0C0F]">{item.name}</h4>
                  <p className="text-xs text-gray-400 font-black tracking-widest">${item.price}.00 / Piece</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-2 bg-white rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-colors shadow-sm"
                >
                  <MinusIcon className="h-4 w-4 stroke-[3]" />
                </button>
                <span className="w-8 text-center font-black text-[#0B0C0F]">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-2 bg-white rounded-xl hover:bg-[#F6C453] transition-colors shadow-sm"
                >
                  <PlusIcon className="h-4 w-4 stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary & Location */}
        <div className="space-y-6">
          <div className="bg-[#0B0C0F] rounded-[32px] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6C453] opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ShoppingBagIcon className="h-5 w-5 text-[#F6C453]" /> Order Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Total Items</span>
                <span className="text-white font-bold">{totalItems}</span>
              </div>
              <div className="flex justify-between text-xl font-black border-t border-white/10 pt-4">
                <span>Total Cost</span>
                <span className="text-[#F6C453]">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-8">
              <div className="flex items-center gap-3">
                <MapPinIcon className={`h-5 w-5 ${location.lat ? 'text-emerald-400' : 'text-gray-500'}`} />
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Current Status</p>
                  <p className="text-xs font-bold">{location.status}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleBooking}
              disabled={totalItems === 0}
              className="w-full bg-[#F6C453] text-[#0B0C0F] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:pointer-events-none shadow-lg shadow-[#F6C453]/20"
            >
              Confirm Booking
            </button>
          </div>

          <div className="bg-gray-50 p-6 rounded-[28px] border border-gray-100 flex items-start gap-3">
            <ShieldCheckIcon className="h-5 w-5 text-emerald-500 shrink-0" />
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-tighter">
              By clicking confirm, we will capture your current location to dispatch our driver to your exact doorstep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
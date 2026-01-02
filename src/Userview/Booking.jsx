import React, { useState } from 'react';
import { 
  PlusIcon, 
  MinusIcon, 
  MapPinIcon, 
  ShoppingBagIcon, 
  ShieldCheckIcon,
  CreditCardIcon,
  BanknotesIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const Booking = () => {
  // 1. Expanded Menu Items
  const [items, setItems] = useState([
    { id: 1, name: 'T-Shirt / Top', price: 5, quantity: 0, icon: '👕' },
    { id: 2, name: 'Trousers / Jeans', price: 7, quantity: 0, icon: '👖' },
    { id: 3, name: 'Suit (2 Piece)', price: 15, quantity: 0, icon: '🧥' },
    { id: 4, name: 'Blanket / Duvet', price: 20, quantity: 0, icon: '🛌' },
    { id: 5, name: 'Premium Saree', price: 12, quantity: 0, icon: '🥻' },
    { id: 6, name: 'Large Carpet', price: 45, quantity: 0, icon: '🧹' },
  ]);

  const [location, setLocation] = useState({ lat: null, lng: null, status: 'Not Tracked' });
  const [step, setStep] = useState('selection'); // 'selection', 'payment', 'success'
  const [paymentMethod, setPaymentMethod] = useState('');

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  // 2. Geolocation + Progress to Payment
  const handleLocationCapture = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    setLocation({ ...location, status: 'Locating...' });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          status: 'Location Captured'
        });
        // Move to payment step after location is found
        setStep('payment');
      },
      () => {
        setLocation({ ...location, status: 'Permission Denied' });
        alert("Please enable location to proceed.");
      }
    );
  };

  const handleFinalSubmit = () => {
    const orderData = {
      items: items.filter(i => i.quantity > 0),
      total: totalPrice,
      location,
      paymentMethod
    };
    console.log("Final Order:", orderData);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-6">
        <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircleIcon className="h-12 w-12 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black">ORDER PLACED!</h2>
        <p className="text-gray-500">Our driver is heading to your location. Get your laundry ready!</p>
        <button onClick={() => window.location.reload()} className="text-[#F6C453] font-bold underline">Make another booking</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-[#0B0C0F] italic uppercase">
          {step === 'selection' ? 'Select ' : 'Complete '} 
          <span className="text-[#F6C453] not-italic">SERVICE</span>
        </h2>
        <div className="flex gap-4 mt-2">
            <div className={`h-1 flex-1 rounded-full ${step === 'selection' ? 'bg-[#F6C453]' : 'bg-gray-200'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step === 'payment' ? 'bg-[#F6C453]' : 'bg-gray-200'}`}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section: Changes based on Step */}
        <div className="lg:col-span-2 space-y-4">
          {step === 'selection' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-[28px] border border-gray-100 flex items-center justify-between hover:border-[#F6C453] transition-all shadow-sm group">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-[#0B0C0F] text-sm">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-black tracking-widest">${item.price}.00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 bg-white rounded-lg shadow-sm"><MinusIcon className="h-3 w-3" /></button>
                    <span className="w-5 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 bg-white rounded-lg shadow-sm"><PlusIcon className="h-3 w-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 space-y-6">
              <h3 className="text-xl font-black uppercase italic">Select Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'cod', name: 'Cash on Delivery', icon: <BanknotesIcon className="h-6 w-6"/> },
                  { id: 'gpay', name: 'Google Pay / UPI', icon: '🚀' },
                  { id: 'card', name: 'Debit/Credit Card', icon: <CreditCardIcon className="h-6 w-6"/> },
                  { id: 'paytm', name: 'Paytm Wallet', icon: '📱' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all ${
                      paymentMethod === method.id ? 'border-[#F6C453] bg-yellow-50' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-[#F6C453]">{method.icon}</span>
                    <span className="font-bold text-[#0B0C0F]">{method.name}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setStep('selection')}
                className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-black"
              >
                ← Go back to items
              </button>
            </div>
          )}
        </div>

        {/* Right Section: Summary */}
        <div className="space-y-6">
          <div className="bg-[#0B0C0F] rounded-[32px] p-8 text-white relative overflow-hidden">
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

            {step === 'selection' ? (
              <button 
                onClick={handleLocationCapture}
                disabled={totalItems === 0}
                className="w-full bg-[#F6C453] text-[#0B0C0F] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] disabled:opacity-50"
              >
                Confirm Location & Pay
              </button>
            ) : (
              <button 
                onClick={handleFinalSubmit}
                disabled={!paymentMethod}
                className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] disabled:opacity-50"
              >
                Finalize Order
              </button>
            )}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-[28px] border border-gray-100 flex items-start gap-3">
            <ShieldCheckIcon className="h-5 w-5 text-emerald-500 shrink-0" />
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-tighter">
              {step === 'selection' 
                ? "We use GPS to find your doorstep for pickup." 
                : "Your payment information is encrypted and secure."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
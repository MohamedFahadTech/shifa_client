import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  BanknotesIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const Booking = () => {
  const [services, setServices] = useState([]);
  const [items, setItems] = useState([]);
  const [step, setStep] = useState("selection");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    status: "Not Tracked"
  });

  /* 1️⃣ Fetch services from backend */
  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get("http://localhost:5000/services");
      setServices(res.data.data);
    };
    fetchServices();
  }, []);

  /* 2️⃣ Convert DB → Booking Items */
  useEffect(() => {
    if (!services.length) return;

    const flatItems = [];

    services.forEach(category => {
      category.fabrics.forEach(fabric => {
        fabric.services.forEach(service => {
          service.options.forEach(option => {
            flatItems.push({
              id: `${category.category}-${fabric.name}-${service.type}-${option.label}`,
              name: `${category.category} (${fabric.name})`,
              service: service.type,
              option: option.label,
              price: option.price,
              quantity: 0
            });
          });
        });
      });
    });

    setItems(flatItems);
  }, [services]);

  /* 3️⃣ Quantity Update */
  const updateQuantity = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  /* 4️⃣ Totals */
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.quantity * i.price, 0);

  /* 5️⃣ Location */
  const handleLocationCapture = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    setLocation({ ...location, status: "Locating..." });

    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          status: "Captured"
        });
        setStep("payment");
      },
      () => alert("Enable location permission")
    );
  };

  /* 6️⃣ Submit */
  const handleFinalSubmit = () => {
    const orderData = {
      items: items.filter(i => i.quantity > 0),
      totalPrice,
      location,
      paymentMethod
    };
    console.log("ORDER:", orderData);
    setStep("success");
  };

  /* SUCCESS SCREEN */
  if (step === "success") {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-6">
        <CheckCircleIcon className="h-16 w-16 text-emerald-500 mx-auto" />
        <h2 className="text-3xl font-black">ORDER PLACED</h2>
        <p className="text-gray-500">Pickup scheduled 🚚</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT */}
      <div className="lg:col-span-2 space-y-4">
        {step === "selection" && items.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-2xl flex justify-between border">
            <div>
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-xs text-gray-400">
                {item.service} - {item.option}
              </p>
              <p className="font-black">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => updateQuantity(item.id, -1)}>
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="font-bold">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {step === "payment" && (
          <div className="space-y-4">
            {[
              { id: "cod", label: "Cash on Delivery", icon: <BanknotesIcon className="h-5 w-5" /> },
              { id: "card", label: "Card", icon: <CreditCardIcon className="h-5 w-5" /> }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setPaymentMethod(p.id)}
                className={`w-full p-4 rounded-xl border ${
                  paymentMethod === p.id ? "border-yellow-400" : ""
                }`}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="bg-black text-white p-6 rounded-3xl space-y-6">
        <h3 className="flex items-center gap-2 font-bold">
          <ShoppingBagIcon className="h-5 w-5 text-yellow-400" />
          Order Summary
        </h3>

        <div className="flex justify-between">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between text-xl font-black">
          <span>Total</span>
          <span className="text-yellow-400">₹{totalPrice}</span>
        </div>

        {step === "selection" ? (
          <button
            disabled={!totalItems}
            onClick={handleLocationCapture}
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-black"
          >
            Confirm Location
          </button>
        ) : (
          <button
            disabled={!paymentMethod}
            onClick={handleFinalSubmit}
            className="w-full bg-emerald-500 py-3 rounded-xl font-black"
          >
            Place Order
          </button>
        )}

        <div className="flex gap-2 text-xs text-gray-400">
          <ShieldCheckIcon className="h-4 w-4 text-emerald-500" />
          Secure checkout
        </div>
      </div>
    </div>
  );
};

export default Booking;

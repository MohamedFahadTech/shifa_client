import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  UserPlusIcon, 
  PhoneIcon, 
  ChatBubbleLeftEllipsisIcon,
  CalendarDaysIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

// --- 1. YOUR ORIGINAL DESIGNED CARD ---
const CustomerCard = ({ name, phone, plan, balance, lastVisit }) => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center font-black text-sm">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h4 className="font-bold text-[#0B0C0F]">{name}</h4>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{plan} Member</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-400 font-bold uppercase">Total Business</p>
        <p className="text-sm font-black text-emerald-600">₹{balance}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2 mt-4">
      <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 py-2 bg-gray-50 rounded-xl text-[10px] font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors">
        <PhoneIcon className="h-3 w-3" /> Call
      </a>
      <a href={`https://wa.me/91${phone}`} target="_blank" className="flex items-center justify-center gap-2 py-2 bg-gray-50 rounded-xl text-[10px] font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
        <ChatBubbleLeftEllipsisIcon className="h-3 w-3" /> WhatsApp
      </a>
    </div>

    <div className="mt-4 pt-3 border-t border-dashed border-gray-100 flex justify-between items-center">
      <span className="text-[10px] text-gray-400 font-medium">Last Order: {lastVisit}</span>
      <button className="text-[10px] font-bold text-yellow-600 underline">View History</button>
    </div>
  </div>
);

// --- 2. MAIN COMPONENT ---
function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', password: 'password123'
  });

  // Fetch from DB
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      if (res.data.success) setCustomers(res.data.data);
    } catch (err) { console.error("Fetch error", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCustomers(); }, []);

  // Handle Add Client
  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/signup", formData);
      if (res.data.success) {
        setShowModal(false);
        setFormData({ name: '', email: '', phone: '', address: '', password: 'password123' });
        fetchCustomers(); // Refresh list
      } else {
        alert(res.data.message);
      }
    } catch (err) { alert("Error saving to database"); }
  };

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-2 relative">
      
      {/* TOP HEADER & SEARCH (Original Design) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-[#0B0C0F] uppercase tracking-tighter">
            Customer <span className="text-yellow-500">Directory</span>
          </h2>
          <p className="text-gray-400 text-xs font-bold">Manage your {customers.length} active clients</p>
        </div>
        
        <div className="flex flex-1 max-w-md items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            className="bg-transparent border-none text-sm focus:outline-none w-full font-medium"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-[#0B0C0F] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all"
        >
          <UserPlusIcon className="h-4 w-4" /> Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* CUSTOMER GRID */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <CustomerCard 
                key={c._id}
                name={c.name} 
                phone={c.phone} 
                plan={c.role === 'admin' ? 'Premium' : 'Regular'} 
                balance="0" 
                lastVisit="Recently Joined" 
              />
            ))}
          </div>
        </div>

        {/* SIDEBAR: PICKUP LIST (Original Design) */}
        <div className="space-y-4">
          <div className="bg-[#0B0C0F] rounded-[32px] p-6 text-white">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDaysIcon className="h-6 w-6 text-yellow-500" />
              <h3 className="font-bold text-sm">Recently Added</h3>
            </div>
            
            <div className="space-y-4">
              {customers.slice(-2).reverse().map((item, i) => (
                <div key={i} className="bg-white/5 p-3 rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                  <p className="text-sm font-bold">{item.name}</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                    <MapPinIcon className="h-3 w-3" /> {item.addresses || "No address"}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              View Schedule
            </button>
          </div>
          
          <div className="p-6 bg-yellow-50 rounded-[32px] border border-yellow-100">
             <p className="text-[10px] font-black text-yellow-700 uppercase mb-2">Pro Tip</p>
             <p className="text-xs text-yellow-800 leading-relaxed font-medium">
               Call Premium members 1 hour before pickup to confirm availability.
             </p>
          </div>
        </div>
      </div>

      {/* --- ADD CLIENT MODAL (Designed to match your UI) --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0C0F]/80 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute right-6 top-6 p-2 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-black text-[#0B0C0F] uppercase tracking-tighter mb-1">
              Add New <span className="text-yellow-500">Client</span>
            </h3>
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-8 tracking-widest">Enter details to save to database</p>

            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Full Name</label>
                <input 
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 ring-yellow-500/20"
                  placeholder="Marcus Aurelius"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Phone</label>
                  <input 
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none"
                    placeholder="98765..."
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Email</label>
                  <input 
                    type="email"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none"
                    placeholder="name@mail.com"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Address</label>
                <textarea 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none min-h-[100px]"
                  placeholder="Enter full pickup address..."
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className="w-full mt-4 bg-[#0B0C0F] text-white py-5 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black transition-all"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customer;
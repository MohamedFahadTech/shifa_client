import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  UserPlusIcon, 
  PhoneIcon, 
  ChatBubbleLeftEllipsisIcon,
  CalendarDaysIcon,
  MapPinIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

// 1. REUSABLE CARD COMPONENT
const CustomerCard = ({ name, phone, role, addresses, createdAt }) => {
  // Logic to format date from MongoDB timestamp
  const joinedDate = new Date(createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short'
  });

  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center font-black text-sm">
            {name ? name.split(' ').map(n => n[0]).join('') : 'U'}
          </div>
          <div>
            <h4 className="font-bold text-[#0B0C0F]">{name}</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {role || 'User'} Member
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase">Phone</p>
          <p className="text-sm font-black text-emerald-600">{phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 py-2 bg-gray-50 rounded-xl text-[10px] font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors">
          <PhoneIcon className="h-3 w-3" /> Call
        </a>
        <a href={`https://wa.me/91${phone}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 bg-gray-50 rounded-xl text-[10px] font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
          <ChatBubbleLeftEllipsisIcon className="h-3 w-3" /> WhatsApp
        </a>
      </div>

      <div className="mt-4 pt-3 border-t border-dashed border-gray-100 flex justify-between items-center">
        <span className="text-[10px] text-gray-400 font-medium">Joined: {joinedDate}</span>
        <button className="text-[10px] font-bold text-yellow-600 underline">View Profile</button>
      </div>
    </div>
  );
};

// 2. MAIN COMPONENT
function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch Data from Backend
  useEffect(() => {
    const getCustomers = async () => {
      try {
        // Replace with your actual backend URL if different
        const response = await axios.get("http://localhost:5000/users");
        if (response.data.success) {
          setCustomers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    getCustomers();
  }, []);

  // Search Filtering Logic
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-2 bg-[#F8F9FA] min-h-screen">
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-[#0B0C0F] uppercase tracking-tighter">
            Customer <span className="text-yellow-500">Directory</span>
          </h2>
          <p className="text-gray-400 text-xs font-bold">
            {loading ? 'Loading...' : `Managing ${filteredCustomers.length} registered clients`}
          </p>
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

        <button className="flex items-center justify-center gap-2 bg-[#0B0C0F] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all shadow-lg shadow-black/10">
          <UserPlusIcon className="h-4 w-4" /> Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* CUSTOMER GRID */}
        <div className="lg:col-span-3">
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-pulse">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-48 bg-gray-200 rounded-3xl"></div>
                ))}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <CustomerCard 
                    key={customer._id}
                    name={customer.name}
                    phone={customer.phone}
                    role={customer.role}
                    addresses={customer.addresses}
                    createdAt={customer.createdAt}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-gray-400 font-bold">
                  No customers found matching "{search}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-4">
          <div className="bg-[#0B0C0F] rounded-[32px] p-6 text-white sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDaysIcon className="h-6 w-6 text-yellow-500" />
              <h3 className="font-bold text-sm">Recently Joined</h3>
            </div>
            
            <div className="space-y-4">
              {customers.slice(0, 3).map((item, i) => (
                <div key={i} className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <p className="text-sm font-bold">{item.name}</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                    <MapPinIcon className="h-3 w-3" /> {item.addresses || 'No address added'}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              View All Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
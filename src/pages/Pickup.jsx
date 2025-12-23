import React, { useState } from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon, 
  TruckIcon, 
  MagnifyingGlassIcon,
  ChevronRightIcon 
} from "@heroicons/react/24/outline";

const PickupPage = () => {
  // Mock data for scheduled pickups
  const [pickups] = useState([
    { 
      id: 'P-101', 
      name: 'Marcus Aurelius', 
      address: '123 Roman Way, Sector 4', 
      time: '10:00 AM', 
      bags: 2, 
      type: 'Express',
      status: 'Pending' 
    },
    { 
      id: 'P-102', 
      name: 'Sophia Loren', 
      address: '45 Cinema Blvd, Apt 4B', 
      time: '11:30 AM', 
      bags: 1, 
      type: 'Standard',
      status: 'In Route' 
    },
    { 
      id: 'P-103', 
      name: 'Julian Casablancas', 
      address: '99 Rock St, Garage Studio', 
      time: '01:15 PM', 
      bags: 5, 
      type: 'Subscription',
      status: 'Pending' 
    },
  ]);

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black text-[#0B0C0F] italic leading-tight">
            PICKUP <span className="text-[#F6C453] not-italic">LOGISTICS</span>
          </h3>
          <p className="text-gray-500 text-sm font-medium">Manage driver dispatches and incoming laundry bags.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search address..." 
              className="bg-white border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#F6C453]/20 outline-none w-48 shadow-sm"
            />
          </div>
          <button className="bg-[#0B0C0F] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
            <TruckIcon className="h-5 w-5 text-[#F6C453]" />
            Dispatch Driver
          </button>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Today</p>
          <p className="text-xl font-black text-[#0B0C0F]">12</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-amber-400">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending</p>
          <p className="text-xl font-black text-[#0B0C0F]">08</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-blue-400">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">In Route</p>
          <p className="text-xl font-black text-[#0B0C0F]">03</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-emerald-400">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Completed</p>
          <p className="text-xl font-black text-[#0B0C0F]">01</p>
        </div>
      </div>

      {/* PICKUP CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pickups.map((p) => (
          <div 
            key={p.id} 
            className="group relative bg-white p-6 rounded-[32px] border border-gray-100 hover:border-[#F6C453] transition-all hover:shadow-xl hover:shadow-[#F6C453]/5 flex flex-col justify-between"
          >
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">Request {p.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${
                  p.type === 'Express' ? 'bg-rose-100 text-rose-600' : 
                  p.type === 'Subscription' ? 'bg-[#F6C453] text-[#0B0C0F]' : 'bg-gray-100 text-gray-500'
                }`}>
                  {p.type}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="flex items-center text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                  <ClockIcon className="h-3 w-3 mr-1" /> {p.time}
                </span>
                <span className={`text-[9px] font-bold mt-2 uppercase ${p.status === 'In Route' ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`}>
                   ● {p.status}
                </span>
              </div>
            </div>

            {/* Client Details */}
            <div className="mb-6">
              <h4 className="font-black text-[#0B0C0F] text-xl group-hover:text-[#F6C453] transition-colors">{p.name}</h4>
              <div className="flex items-start text-gray-500 text-sm mt-2">
                <MapPinIcon className="h-4 w-4 mr-1 mt-0.5 shrink-0 text-gray-400" /> 
                <span className="leading-relaxed">{p.address}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Load Size</span>
                <span className="text-sm font-black text-[#0B0C0F]">{p.bags} Estimated Bags</span>
              </div>
              <div className="flex gap-2">
                 <button className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-[#0B0C0F] transition-all border border-gray-100">
                    <PhoneIcon className="h-5 w-5" />
                 </button>
                 <button className="p-2 bg-[#0B0C0F] rounded-xl text-white hover:bg-gray-800 transition-all shadow-md">
                    <ChevronRightIcon className="h-5 w-5" />
                 </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Manual Pickup Placeholder */}
        <button className="border-2 border-dashed border-gray-200 rounded-[32px] p-6 flex flex-col items-center justify-center text-gray-400 hover:border-[#F6C453] hover:text-[#F6C453] transition-all group">
            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-2 group-hover:bg-[#F6C453]/10">
                <PlusIcon className="h-6 w-6" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">New Pickup</span>
        </button>
      </div>
    </div>
  );
};

// Internal PlusIcon if not imported
const PlusIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export default PickupPage;
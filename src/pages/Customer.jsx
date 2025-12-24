import React, { useState } from 'react';
import { 
  UserPlusIcon, 
  MapPinIcon, 
  PhoneIcon, 
  CalendarDaysIcon,
  ChevronRightIcon,
  StarIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

const CustomerCard = ({ name, email, plan, spent, lastOrder }) => (
  <div className="bg-white p-5 rounded-[24px] border border-gray-100 hover:border-[#F6C453] transition-all group cursor-pointer shadow-sm">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#0B0C0F] border border-gray-200">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-[#0B0C0F] group-hover:text-[#F6C453] transition-colors">{name}</h4>
        <p className="text-xs text-gray-400 font-medium">{email}</p>
      </div>
      <div className="text-right">
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${
          plan === 'Premium' ? 'bg-[#F6C453] text-[#0B0C0F]' : 'bg-gray-100 text-gray-500'
        }`}>
          {plan}
        </span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-50">
      <div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Total Spent</p>
        <p className="text-sm font-black text-[#0B0C0F]">{spent}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Last Visit</p>
        <p className="text-sm font-bold text-gray-600">{lastOrder}</p>
      </div>
    </div>
  </div>
);

function Customer() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#0B0C0F] italic">CLIENT <span className="text-[#F6C453] not-italic">HUB</span></h2>
          <p className="text-gray-500 text-sm font-medium">Manage your elite customer base and their preferences.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#0B0C0F] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
          <UserPlusIcon className="h-5 w-5 text-[#F6C453]" />
          Register New Client
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* MAIN CUSTOMER LIST */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['All', 'Premium Members', 'Regular', 'Inactive'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeTab === tab 
                  ? 'bg-[#0B0C0F] text-white border-[#0B0C0F]' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#F6C453]'
                }`}
              >
                {tab}
              </button>
            ))}
            <button className="ml-auto p-2 text-gray-400 hover:text-[#0B0C0F]">
              <FunnelIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomerCard name="Marcus Aurelius" email="marcus@empire.com" plan="Premium" spent="$1,420.00" lastOrder="2 days ago" />
            <CustomerCard name="Sophia Loren" email="sophia@style.it" plan="Regular" spent="$450.00" lastOrder="Today" />
            <CustomerCard name="Julian Casablancas" email="julian@strokes.com" plan="Premium" spent="$890.00" lastOrder="1 week ago" />
            <CustomerCard name="Amara Singh" email="amara@tech.io" plan="Regular" spent="$120.00" lastOrder="5 days ago" />
          </div>
        </div>

        {/* SIDEBAR: PICKUP SCHEDULE */}
        <div className="bg-white rounded-[32px] border border-gray-100 p-6 shadow-sm self-start">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-[#0B0C0F] text-sm uppercase tracking-widest">Today's Schedule</h3>
            <CalendarDaysIcon className="h-5 w-5 text-[#F6C453]" />
          </div>

          <div className="space-y-4">
            {[
              { time: "09:00 AM", type: "Pickup", client: "Marcus A.", color: "border-l-amber-400" },
              { time: "11:30 AM", type: "Delivery", client: "Sophia L.", color: "border-l-emerald-400" },
              { time: "02:00 PM", type: "Pickup", client: "Julian C.", color: "border-l-amber-400" },
              { time: "04:45 PM", type: "Delivery", client: "Amara S.", color: "border-l-emerald-400" },
            ].map((slot, i) => (
              <div key={i} className={`p-4 rounded-2xl bg-gray-50 border-l-4 ₹{slot.color} flex items-center justify-between group cursor-pointer hover:bg-gray-100 transition-colors`}>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{slot.time}</p>
                  <p className="text-sm font-bold text-[#0B0C0F]">{slot.client}</p>
                  <p className={`text-[10px] font-bold ₹{slot.type === 'Pickup' ? 'text-amber-600' : 'text-emerald-600'}`}>{slot.type}</p>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-gray-300 group-hover:text-[#0B0C0F]" />
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-xs font-bold text-gray-400 hover:border-[#F6C453] hover:text-[#F6C453] transition-all">
            + Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customer;
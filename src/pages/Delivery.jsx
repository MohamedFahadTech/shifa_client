import React, { useState } from 'react';
import { 
  TruckIcon, 
  CheckCircleIcon, 
  MapPinIcon, 
  UserCircleIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";

const DeliveryPage = () => {
  // Mock data for deliveries
  const [deliveries] = useState([
    { 
      id: 'DEL-402', 
      customer: 'Elena Rodriguez', 
      address: '77 Sunset Strip, Villa 12', 
      items: '5 Items (Dry Cleaned)', 
      priority: 'High',
      payment: 'Paid',
      status: 'Out for Delivery' 
    },
    { 
      id: 'DEL-405', 
      customer: 'James Miller', 
      address: 'Apartment 9C, Central Towers', 
      items: '10kg (Wash & Fold)', 
      priority: 'Normal',
      payment: 'COD - $18.50',
      status: 'Pending' 
    },
    { 
      id: 'DEL-409', 
      customer: 'Sarah Jenkins', 
      address: '12 Blue Jay Way', 
      items: '3 Suits', 
      priority: 'Normal',
      payment: 'Paid',
      status: 'Pending' 
    },
  ]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black text-[#0B0C0F] italic">
            OUTBOUND <span className="text-[#F6C453] not-italic">DISPATCH</span>
          </h3>
          <p className="text-gray-500 text-sm font-medium">Coordinate final deliveries and payment collections.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-[#0B0C0F] transition-all">
            <FunnelIcon className="h-5 w-5" />
          </button>
          <button className="bg-[#0B0C0F] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:shadow-lg transition-all">
            <TruckIcon className="h-5 w-5 text-[#F6C453]" />
            Optimize Routes
          </button>
        </div>
      </div>

      {/* DELIVERY LIST */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Delivery Queue</h4>
        </div>
        
        <div className="divide-y divide-gray-50">
          {deliveries.map((d) => (
            <div key={d.id} className="p-6 hover:bg-gray-50/50 transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Left: Info */}
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-2xl ${d.status === 'Out for Delivery' ? 'bg-blue-50 text-blue-500' : 'bg-gray-100 text-gray-400'}`}>
                  <TruckIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d.id}</span>
                    {d.priority === 'High' && (
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-[9px] font-black uppercase rounded">High Priority</span>
                    )}
                  </div>
                  <h4 className="text-lg font-black text-[#0B0C0F]">{d.customer}</h4>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <MapPinIcon className="h-3 w-3 mr-1" /> {d.address}
                  </p>
                </div>
              </div>

              {/* Middle: Items & Payment */}
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-12">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Package Details</p>
                  <p className="text-sm font-bold text-[#0B0C0F]">{d.items}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Status</p>
                  <p className={`text-sm font-black ${d.payment.includes('COD') ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {d.payment}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                <button className="flex-1 lg:flex-none px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-[#0B0C0F] hover:text-[#0B0C0F] transition-all flex items-center justify-center gap-2">
                  <ChatBubbleLeftRightIcon className="h-4 w-4" /> Message
                </button>
                <button className={`flex-1 lg:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  d.status === 'Out for Delivery' 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                  : 'bg-[#0B0C0F] text-white hover:bg-gray-800'
                }`}>
                  {d.status === 'Out for Delivery' ? 'Complete' : 'Start Delivery'}
                </button>
              </div>

            </div>
          ))}
        </div>
        
        {/* Footer info */}
        <div className="p-6 bg-gray-50/50 flex justify-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">End of Dispatch List</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
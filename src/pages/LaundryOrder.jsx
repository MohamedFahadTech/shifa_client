import React, { useState } from 'react';
import { 
  PlusIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  TagIcon,
  PrinterIcon,
  EllipsisVerticalIcon
} from "@heroicons/react/24/outline";

const OrderRow = ({ id, customer, items, status, weight, price, date }) => {
  const statusStyles = {
    "Pending": "bg-gray-100 text-gray-500",
    "Washing": "bg-blue-100 text-blue-600",
    "Drying": "bg-orange-100 text-orange-600",
    "Ready": "bg-emerald-100 text-emerald-600",
  };

  return (
    <tr className="group hover:bg-gray-50/50 transition-all border-b border-gray-50">
      <td className="py-4 px-2">
        <span className="text-sm font-black text-[#0B0C0F]">{id}</span>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{date}</p>
      </td>
      <td className="py-4">
        <p className="text-sm font-bold text-[#0B0C0F]">{customer}</p>
        <p className="text-xs text-gray-400">{items} Items</p>
      </td>
      <td className="py-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`}></span>
          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${statusStyles[status]}`}>
            {status}
          </span>
        </div>
      </td>
      <td className="py-4 text-sm font-medium text-gray-600">{weight} kg</td>
      <td className="py-4 text-sm font-black text-[#0B0C0F]">{price}</td>
      <td className="py-4 text-right">
        <button className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200">
          <PrinterIcon className="h-4 w-4 text-gray-400" />
        </button>
      </td>
    </tr>
  );
};

function LaundryOrder() {
  return (
    <div className="space-y-6">
      {/* 1. TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#0B0C0F] italic leading-tight">ORDER <span className="text-[#F6C453] not-italic">COMMAND</span></h2>
          <p className="text-gray-500 text-sm font-medium">Tracking {42} active laundry batches in real-time.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Invoice #..." 
              className="bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#F6C453]/20 outline-none w-64 shadow-sm"
            />
          </div>
          <button className="bg-[#F6C453] text-[#0B0C0F] p-3 rounded-xl shadow-lg shadow-[#F6C453]/20 hover:scale-105 transition-transform">
            <PlusIcon className="h-6 w-6 font-bold" />
          </button>
        </div>
      </div>

      {/* 2. ORDER STATUS SUMMARY BOXES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'In Queue', count: 12, color: 'border-gray-200' },
          { label: 'Cleaning', count: 18, color: 'border-blue-400' },
          { label: 'Finishing', count: 5, color: 'border-orange-400' },
          { label: 'Completed', count: 7, color: 'border-emerald-400' }
        ].map((item, idx) => (
          <div key={idx} className={`bg-white p-4 rounded-2xl border-b-4 ${item.color} shadow-sm`}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{item.label}</p>
            <p className="text-2xl font-black text-[#0B0C0F]">{item.count}</p>
          </div>
        ))}
      </div>

      {/* 3. MAIN ORDERS TABLE */}
      <div className="bg-white rounded-[32px] border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
          <h3 className="font-black text-[#0B0C0F] uppercase tracking-widest text-xs">Processing List</h3>
          <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#0B0C0F]">
            <FunnelIcon className="h-4 w-4" /> Filter Status
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="py-4 px-6">ID / Date</th>
                <th className="py-4">Customer Details</th>
                <th className="py-4">Process Status</th>
                <th className="py-4">Weight</th>
                <th className="py-4">Amount</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="px-6">
              <OrderRow id="#INV-9021" customer="Dianne Russell" items={12} status="Washing" weight="4.5" price="$24.00" date="Oct 24" />
              <OrderRow id="#INV-9022" customer="Guy Hawkins" items={3} status="Ready" weight="1.2" price="$12.50" date="Oct 24" />
              <OrderRow id="#INV-9023" customer="Albert Flores" items={25} status="Pending" weight="10.0" price="$85.00" date="Oct 23" />
              <OrderRow id="#INV-9024" customer="Bessie Cooper" items={8} status="Drying" weight="3.2" price="$18.00" date="Oct 23" />
              <OrderRow id="#INV-9025" customer="Kristin Watson" items={5} status="Washing" weight="2.1" price="$15.00" date="Oct 23" />
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-6 border-t border-gray-50 bg-gray-50/30 flex justify-center">
          <button className="text-xs font-black text-[#F6C453] uppercase tracking-widest hover:underline">
            Load More Transactions
          </button>
        </div>
      </div>
    </div>
  );
}

export default LaundryOrder;
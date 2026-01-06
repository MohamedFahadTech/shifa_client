import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  FunnelIcon, 
  MagnifyingGlassIcon,
  PrinterIcon
} from "@heroicons/react/24/outline";

// Helper component for table rows
const OrderRow = ({ id, customer, items, status, price, date }) => {
  const statusStyles = {
    "Pending": "bg-gray-100 text-gray-500",
    "Washing": "bg-blue-100 text-blue-600",
    "Ironing": "bg-purple-100 text-purple-600",
    "Drying": "bg-orange-100 text-orange-600",
    "Ready": "bg-emerald-100 text-emerald-600",
    "Delivered": "bg-gray-800 text-white",
  };

  return (
    <tr className="group hover:bg-gray-50/50 transition-all border-b border-gray-50">
      <td className="py-4 px-6">
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
          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${statusStyles[status] || 'bg-gray-100'}`}>
            {status}
          </span>
        </div>
      </td>
      <td className="py-4 text-sm font-black text-[#0B0C0F]">{price}</td>
      <td className="py-4 text-right px-6">
        <button className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200">
          <PrinterIcon className="h-4 w-4 text-gray-400" />
        </button>
      </td>
    </tr>
  );
};

function LaundryOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch data from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orders'); // Update with your Port
        const result = await response.json();
        if (result.success) {
          setOrders(result.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 2. Filter logic for search
  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen space-y-6">
      {/* TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#0B0C0F] italic leading-tight">
            ORDER <span className="text-[#F6C453] not-italic">COMMAND</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Monitoring {orders.length} active laundry batches.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Invoice or User..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#F6C453]/20 outline-none w-64 shadow-sm"
            />
          </div>
          <button className="bg-[#F6C453] text-[#0B0C0F] p-3 rounded-xl shadow-lg shadow-[#F6C453]/20 hover:scale-105 transition-transform">
            <PlusIcon className="h-6 w-6 font-bold" />
          </button>
        </div>
      </div>

      {/* SUMMARY BOXES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', count: orders.filter(o => o.status === 'Pending').length, color: 'border-gray-300' },
          { label: 'Washing', count: orders.filter(o => o.status === 'Washing').length, color: 'border-blue-400' },
          { label: 'Ready', count: orders.filter(o => o.status === 'Ready').length, color: 'border-emerald-400' },
          { label: 'Total', count: orders.length, color: 'border-[#F6C453]' }
        ].map((item, idx) => (
          <div key={idx} className={`bg-white p-4 rounded-2xl border-b-4 ${item.color} shadow-sm`}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{item.label}</p>
            <p className="text-2xl font-black text-[#0B0C0F]">{item.count}</p>
          </div>
        ))}
      </div>

      {/* MAIN ORDERS TABLE */}
      <div className="bg-white rounded-[32px] border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-black text-[#0B0C0F] uppercase tracking-widest text-xs">Live Processing List</h3>
          <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#0B0C0F]">
            <FunnelIcon className="h-4 w-4" /> Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="py-4 px-6">Invoice / Date</th>
                <th className="py-4">Customer ID</th>
                <th className="py-4">Status</th>
                <th className="py-4">Total Amount</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-400 font-medium">Loading Database...</td>
                </tr>
              ) : filteredOrders.map((order) => (
                <OrderRow 
                  key={order._id}
                  id={`#${order._id.slice(-6).toUpperCase()}`}
                  customer={order.userId}
                  items={order.items.reduce((acc, item) => acc + item.quantity, 0)}
                  status={order.status}
                  price={`$${order.totalAmount}`}
                  date={new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LaundryOrder;
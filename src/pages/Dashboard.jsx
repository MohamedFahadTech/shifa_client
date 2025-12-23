import React from 'react';
import { 
  ArrowUpIcon, 
  ClockIcon, 
  CheckBadgeIcon, 
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  FireIcon
} from "@heroicons/react/24/outline";

// Helper for Stats Card
const StatCard = ({ title, value, trend, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-black text-[#0B0C0F] mt-1">{value}</h3>
        <p className={`text-xs font-bold mt-2 flex items-center ${trend.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
          <ArrowUpIcon className={`h-3 w-3 mr-1 ${trend.includes('-') && 'rotate-180'}`} />
          {trend} <span className="text-gray-400 ml-1 font-medium italic">vs last week</span>
        </p>
      </div>
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </div>
);

function Dashboard() {
  const recentOrders = [
    { id: "#ORD-7721", customer: "Sarah Jenkins", service: "Dry Cleaning", status: "Washing", price: "$42.00", time: "2h ago" },
    { id: "#ORD-7719", customer: "James Miller", service: "Wash & Fold", status: "Ready", price: "$18.50", time: "5h ago" },
    { id: "#ORD-7718", customer: "Elena Rodriguez", service: "Ironing Only", status: "In Queue", price: "$12.00", time: "6h ago" },
  ];

  return (
    <div className="space-y-8">
      {/* 1. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Daily Revenue" 
          value="$1,284" 
          trend="+12.5%" 
          icon={CurrencyDollarIcon} 
          color="bg-[#F6C453]" 
        />
        <StatCard 
          title="Active Orders" 
          value="24" 
          trend="+4" 
          icon={FireIcon} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Ready for Pickup" 
          value="12" 
          trend="-2" 
          icon={CheckBadgeIcon} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Pending Queue" 
          value="08" 
          trend="+1" 
          icon={ClockIcon} 
          color="bg-blue-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. RECENT ORDERS TABLE */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-[#0B0C0F] italic">LIVE <span className="text-[#F6C453] not-italic">TRACKING</span></h3>
            <button className="text-sm font-bold text-gray-400 hover:text-[#0B0C0F]">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-bold text-sm">{order.id}</td>
                    <td className="py-4">
                      <p className="text-sm font-bold text-[#0B0C0F]">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.service}</p>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        order.status === 'Ready' ? 'bg-emerald-100 text-emerald-600' : 
                        order.status === 'Washing' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-black text-sm text-[#0B0C0F]">{order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. QUICK ACTIONS / SUMMARY */}
        <div className="bg-[#0B0C0F] rounded-[32px] p-8 text-white relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6C453] opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <h3 className="text-xl font-bold mb-6">Store Health</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Machine Capacity</span>
                <span className="text-[#F6C453] font-bold">85%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full">
                <div className="bg-[#F6C453] h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Next Delivery</p>
              <p className="text-lg font-bold italic">14:30 <span className="text-[#F6C453] not-italic">— 4 Orders</span></p>
            </div>

            <button className="w-full bg-[#F6C453] text-[#0B0C0F] py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center">
              <ArchiveBoxIcon className="h-5 w-5 mr-2" />
              New Pickup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import React from 'react';
import { 
  ArrowUpIcon, 
  TruckIcon, 
  CheckCircleIcon, 
  BanknotesIcon,
  UserGroupIcon,
  QueueListIcon
} from "@heroicons/react/24/outline";

// Simplified Stat Card for better scannability
const SimpleStat = ({ title, value, subtext, icon: Icon, bgColor }) => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center gap-5">
    <div className={`p-4 rounded-2xl ${bgColor}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{title}</p>
      <h3 className="text-2xl font-black text-[#0B0C0F]">{value}</h3>
      <p className="text-[10px] text-emerald-500 font-bold">{subtext}</p>
    </div>
  </div>
);

function Dashboard() {
  const activeTasks = [
    { id: "#ORD-7721", name: "Sarah J.", type: "Washing", progress: 60 },
    { id: "#ORD-7719", name: "James M.", type: "Ironing", progress: 90 },
    { id: "#ORD-7718", name: "Elena R.", type: "Pending", progress: 10 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-2">
      
      {/* 1. TOP BAR: TODAY'S PULSE */}
      {/* Usage: Quick glance at the most important numbers for the morning briefing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleStat 
          title="Total Cash" 
          value="$1,284" 
          subtext="+12% from yesterday" 
          icon={BanknotesIcon} 
          bgColor="bg-yellow-400" 
        />
        <SimpleStat 
          title="Deliveries" 
          value="12" 
          subtext="8 scheduled for PM" 
          icon={TruckIcon} 
          bgColor="bg-emerald-500" 
        />
        <SimpleStat 
          title="New Clients" 
          value="05" 
          subtext="Joined today" 
          icon={UserGroupIcon} 
          bgColor="bg-blue-500" 
        />
        <SimpleStat 
          title="In Progress" 
          value="24" 
          subtext="Laundry active" 
          icon={QueueListIcon} 
          bgColor="bg-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. REAL-TIME TRACKING (Action Center) */}
        {/* Usage: This is where you spend 80% of your time managing the shop floor */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-[#0B0C0F] uppercase tracking-tighter">
              Live <span className="text-yellow-500">Shop Floor</span>
            </h3>
            <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full animate-pulse">
              ● LIVE UPDATING
            </span>
          </div>

          <div className="space-y-6">
            {activeTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-xs">
                    {task.name.split(' ')[0][0]}
                  </div>
                  <div>
                    <p className="text-sm font-black">{task.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">{task.id} • {task.type}</p>
                  </div>
                </div>
                
                {/* Visual Progress Bar - Easier to understand than text */}
                <div className="flex items-center gap-4 w-1/3">
                   <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full" 
                        style={{ width: `${task.progress}%` }}
                      ></div>
                   </div>
                   <span className="text-[10px] font-black">{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. QUICK ACTIONS & ANALYTICS */}
        {/* Usage: Fast buttons for common tasks and long-term health */}
        <div className="space-y-6">
          <div className="bg-[#0B0C0F] rounded-[32px] p-8 text-white">
            <h3 className="text-md font-bold mb-6 flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-yellow-400" /> Shop Performance
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                 <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black">Efficiency</p>
                    <p className="text-2xl font-black italic">94%</p>
                 </div>
                 <div className="h-12 w-24 bg-white/5 rounded-lg flex items-end p-1 gap-1">
                    <div className="bg-yellow-400 w-full h-[40%] rounded-sm"></div>
                    <div className="bg-yellow-400 w-full h-[60%] rounded-sm"></div>
                    <div className="bg-yellow-400 w-full h-[90%] rounded-sm"></div>
                    <div className="bg-yellow-400 w-full h-[75%] rounded-sm"></div>
                 </div>
              </div>

              <button className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest mt-4 hover:brightness-110 active:scale-95 transition-all">
                Create New Order +
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-[28px] border border-blue-100">
            <p className="text-[10px] text-blue-600 font-black uppercase mb-1">Manager Note</p>
            <p className="text-xs text-blue-900 font-medium leading-relaxed">
              3 customers have requested pickup for tomorrow morning. Check "Pending Queue" to assign drivers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
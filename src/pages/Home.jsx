import React from 'react';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    ClockIcon,
    CheckBadgeIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";

const Home = () => {
    // Mock data for "Recent Activity"
    const activities = [
        { id: 1, type: 'Order Updated', desc: 'Order #9021 moved to "Washing"', time: '10 mins ago' },
        { id: 2, type: 'New Pickup', desc: 'Marcus Aurelius requested a pickup', time: '25 mins ago' },
        { id: 3, type: 'Payment', desc: 'Invoice #882 finished payment', time: '1 hour ago' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* 1. HERO WELCOME & QUICK ACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0B0C0F] rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                    {/* Decorative Gold Glow */}
                    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#F6C453] opacity-10 blur-[80px] rounded-full"></div>

                    <div>
                        <h2 className="text-4xl font-black italic tracking-tight">WELCOME BACK, <br />
                            <span className="text-[#F6C453] not-italic uppercase">Admin User</span>
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-md font-medium">
                            You have <span className="text-white font-bold">12 active orders</span> today.
                            The morning shift is 85% complete.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <button className="bg-[#F6C453] text-[#0B0C0F] px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-[#F6C453]/20">
                            <PlusIcon className="h-5 w-5 stroke-[3]" /> Book Service
                        </button>
                        <button className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                            <MagnifyingGlassIcon className="h-5 w-5" /> Track Order
                        </button>
                    </div>
                </div>

                {/* 2. LIVE STATUS MINI-CARD */}
                <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <h3 className="font-black text-[#0B0C0F] uppercase tracking-widest text-xs">Live Operation</h3>
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                    </div>

                    <div className="space-y-6 my-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><ClockIcon className="h-5 w-5" /></div>
                                <span className="text-sm font-bold text-gray-600">Washers Running</span>
                            </div>
                            <span className="font-black text-lg">08</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><ArrowPathIcon className="h-5 w-5" /></div>
                                <span className="text-sm font-bold text-gray-600">Pickups Pending</span>
                            </div>
                            <span className="font-black text-lg">04</span>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0B0C0F] hover:bg-gray-100 transition-all">
                        View Live Feed
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 3. CURRENT ORDERS OVERVIEW (Table) */}
                <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black text-[#0B0C0F] italic">CURRENT <span className="text-[#F6C453] not-italic uppercase">ORDERS</span></h3>
                        <button className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-[#F6C453]">View All</button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-gray-200 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center font-black text-[#0B0C0F] border border-gray-100 group-hover:bg-[#F6C453] group-hover:border-[#F6C453] transition-all">
                                        #90{item}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-[#0B0C0F]">Sarah Jenkins</h4>
                                        <p className="text-xs text-gray-400 font-medium">Dry Cleaning • 4 Items</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Status</p>
                                        <p className="text-xs font-bold text-amber-600">In Progress</p>
                                    </div>
                                    <CheckBadgeIcon className="h-6 w-6 text-gray-200 group-hover:text-emerald-500 transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. RECENT ACTIVITY LOG */}
                <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Recent Activity</h3>
                    <div className="space-y-8 relative">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-50"></div>

                        {activities.map((act) => (
                            <div key={act.id} className="relative pl-10">
                                <div className="absolute left-0 top-1 w-8 h-8 bg-white border-2 border-gray-50 rounded-full flex items-center justify-center z-10">
                                    <div className="h-2 w-2 rounded-full bg-[#F6C453]"></div>
                                </div>
                                <h4 className="text-sm font-black text-[#0B0C0F]">{act.type}</h4>
                                <p className="text-xs text-gray-500 font-medium mt-1">{act.desc}</p>
                                <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase">{act.time}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
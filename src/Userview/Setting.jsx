import React, { useState } from 'react';
import { 
  BuildingStorefrontIcon, 
  CurrencyRupeeIcon, 
  BellIcon, 
  ShieldCheckIcon,
  GlobeAltIcon,
  ReceiptPercentIcon
} from "@heroicons/react/24/outline";

const Setting = () => {
  // Example State for toggles
  const [notifications, setNotifications] = useState(true);

  const SettingSection = ({ title, description, icon: Icon, children }) => (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="p-3 bg-gray-50 rounded-2xl">
            <Icon className="h-6 w-6 text-[#F6C453]" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#0B0C0F] uppercase tracking-tighter">{title}</h3>
            <p className="text-xs text-gray-400 font-medium">{description}</p>
          </div>
        </div>
      </div>
      <div className="pt-2">{children}</div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-2">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-[#0B0C0F] italic">APP <span className="text-[#F6C453] not-italic">SETTINGS</span></h2>
        <p className="text-gray-500 text-sm font-medium">Configure shop operations and regional preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 1. Shop Profile */}
        <SettingSection 
          title="Shop Profile" 
          description="Update your business name and contact info."
          icon={BuildingStorefrontIcon}
        >
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Shop Name</label>
              <input type="text" className="w-full mt-1 bg-gray-50 border-none rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-[#F6C453]" defaultValue="Shifa Laundry" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Contact Number</label>
              <input type="text" className="w-full mt-1 bg-gray-50 border-none rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-[#F6C453]" defaultValue="+91 98765 43210" />
            </div>
          </div>
        </SettingSection>

        {/* 2. Billing & Currency */}
        <SettingSection 
          title="Billing Logic" 
          description="Manage GST and default currency."
          icon={CurrencyRupeeIcon}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-bold">Default Currency</span>
              <span className="text-sm font-black text-[#F6C453]">INR (₹)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-bold">Tax (GST) Rate</span>
              <span className="text-sm font-black text-[#F6C453]">18%</span>
            </div>
            <button className="w-full py-2 text-xs font-black text-blue-500 uppercase hover:underline">Edit Tax Profiles</button>
          </div>
        </SettingSection>

        {/* 3. Service Pricing (Quick View) */}
        <SettingSection 
          title="Price List" 
          description="Set standard rates for items."
          icon={ReceiptPercentIcon}
        >
          <div className="space-y-2">
            {[
              { item: "T-Shirt", price: "₹40" },
              { item: "Saree", price: "₹120" },
              { item: "Carpet (sqft)", price: "₹25" }
            ].map((p, i) => (
              <div key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                <span className="font-medium text-gray-600">{p.item}</span>
                <span className="font-black">₹{p.price}</span>
              </div>
            ))}
            <button className="w-full mt-4 bg-[#0B0C0F] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-800">Update All Prices</button>
          </div>
        </SettingSection>

        {/* 4. Communication */}
        <SettingSection 
          title="Automation" 
          description="Control WhatsApp and SMS alerts."
          icon={BellIcon}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-bold">WhatsApp Updates</p>
                <p className="text-[10px] text-gray-400">Send "Order Ready" messages</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-all relative ${notifications ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors">
                <GlobeAltIcon className="h-4 w-4" /> Edit Message Templates
              </button>
            </div>
          </div>
        </SettingSection>

      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-8">
        <button className="px-8 py-4 rounded-2xl text-sm font-bold text-gray-400 hover:text-black transition-all">Discard Changes</button>
        <button className="px-8 py-4 bg-[#F6C453] rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-[#F6C453]/20 hover:scale-[1.02] transition-all">Save All Settings</button>
      </div>
    </div>
  );
};

export default Setting;
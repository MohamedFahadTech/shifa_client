// SubscriptionPage.jsx
import React from 'react';
import { CheckBadgeIcon, SparklesIcon } from "@heroicons/react/24/solid";

const SubscriptionPage = () => {
  const plans = [
    { name: 'Silver Plan', price: '$49', perks: ['15kg / Month', 'Standard Wash', '48h Delivery'], color: 'bg-gray-100' },
    { name: 'Diamond Plan', price: '$129', perks: 
        ['Unlimited Wash', 'Dry Clean Included', 'Priority 12h Delivery'], color: 'bg-[#F6C453]' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-black text-[#0B0C0F]">ACTIVE 
            <span className="text-[#F6C453]">MEMBERSHIPS</span></h3>
        <p className="text-gray-500 text-sm">Managing 142 recurring customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative p-8 rounded-[32px] border border-gray-200 overflow-hidden ${plan.name === 'Diamond Plan' ? 'shadow-2xl shadow-[#F6C453]/20 border-[#F6C453]' : ''}`}>
            {plan.name === 'Diamond Plan' && (
              <div className="absolute top-5 right-5">
                <SparklesIcon className="h-8 w-8 text-[#F6C453]" />
              </div>
            )}
            <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Membership Tier</h4>
            <h2 className="text-3xl font-black text-[#0B0C0F] mb-4">{plan.name}</h2>
            <div className="text-4xl font-black mb-8">{plan.price}<span className="text-sm text-gray-400">/mo</span></div>
            
            <ul className="space-y-4 mb-8">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-center text-sm font-bold text-gray-700">
                  <CheckBadgeIcon className="h-5 w-5 text-[#F6C453] mr-2" /> {perk}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              plan.name === 'Diamond Plan' ? 'bg-[#0B0C0F] text-white hover:bg-gray-800' : 'bg-gray-100 text-[#0B0C0F] hover:bg-gray-200'
            }`}>
              Manage Subscribers
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SubscriptionPage;    

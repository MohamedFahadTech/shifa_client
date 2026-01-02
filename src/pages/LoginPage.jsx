import React, { useState } from "react";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, UserIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthPage() {
    
    const navigate = useNavigate();
    
    // Toggle & UI States
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // Form States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleAuth = async () => {
        const endpoint = isLogin ? '/user/login' : '/user/signup';
        if (!email || !password || (!isLogin && (!name || !phone))) {
            alert("Please fill in all required fields");
            return;
        }

        const payload = isLogin 
            ? { email, password } 
            : { name, email, password, phone, addresses: [{ addressLine: address }] };

        try {
            const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
            if (response.data.success) {
                if (isLogin) { navigate('/layout/home'); } 
                else { setIsLogin(true); }
            } else { alert(response.data.message); }
        } catch (error) {
            console.error('Auth error:', error);
        }
    };

    return (
        <div className="h-screen w-full flex bg-[#0B0C0F] overflow-hidden font-sans">
            {/* LEFT BRANDING SIDE */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 z-0 transition-transform duration-700 hover:scale-105 bg-[url('https://images.unsplash.com/photo-1545173153-93627708ef4a?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                
                {/* Decorative Blur Circles */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F6C453] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
                
                <div className="relative z-10 text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 border border-[#F6C453]/30 rounded-full bg-[#F6C453]/10 backdrop-blur-sm">
                        <span className="text-[#F6C453] text-xs font-bold tracking-[0.2em] uppercase">Premium Laundry</span>
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter text-white mb-4">
                        SHIFA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6C453] to-[#ffd885]">LAUNDRY</span>
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#F6C453] to-transparent mx-auto rounded-full"></div>
                </div>
            </div>

            {/* RIGHT FORM SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white shadow-2xl z-20">
                <div className="w-full max-w-md px-8 lg:px-12 py-4">
                    
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            {isLogin ? "Sign in to manage your laundry orders" : "Sign up to experience premium garment care"}
                        </p>
                    </div>

                    {/* Form Fields - Compact Spacing */}
                    <div className="space-y-3.5">
                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Full Name</label>
                                    <div className="relative group">
                                        <UserIcon className="absolute left-3 top-7.5 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#F6C453] transition-colors" />
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#F6C453]/20 focus:border-[#F6C453] transition-all outline-none" placeholder="John Doe" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Phone</label>
                                    <div className="relative group">
                                        <PhoneIcon className="absolute left-3 top-7.5 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#F6C453] transition-colors" />
                                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#F6C453]/20 focus:border-[#F6C453] transition-all outline-none" placeholder="9876..." />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Email Address</label>
                            <div className="relative group">
                                <EnvelopeIcon className="absolute left-3 top-7.5 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#F6C453] transition-colors" />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#F6C453]/20 focus:border-[#F6C453] transition-all outline-none" placeholder="name@email.com" />
                            </div>
                        </div>

                        {!isLogin && (
                             <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Default Address</label>
                                <div className="relative group">
                                    <MapPinIcon className="absolute left-3 top-7.5 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#F6C453] transition-colors" />
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2 w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#F6C453]/20 focus:border-[#F6C453] transition-all outline-none" placeholder="Street, Area, City" />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[11px] font-bold text-gray-500 uppercase">Password</label>
                            </div>
                            <div className="relative group">
                                <LockClosedIcon className="absolute left-3 top-7.5 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#F6C453] transition-colors" />
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[#F6C453]/20 focus:border-[#F6C453] transition-all outline-none" placeholder="••••••••" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-7.5 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                    {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2">
                            <button onClick={handleAuth} className="w-full py-3 bg-[#0B0C0F] text-white rounded-xl text-sm font-bold hover:bg-black transform transition-all active:scale-[0.98] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]">
                                {isLogin ? "Sign In" : "Create Account"}
                            </button>
                        </div>

                    </div>

                    {/* Toggle Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            {isLogin ? "New to Shifa Laundry?" : "Already a member?"}{" "}
                            <button onClick={() => setIsLogin(!isLogin)} className="font-extrabold text-[#F6C453] hover:text-[#d4a33d] transition-colors underline underline-offset-4">
                                {isLogin ? "Sign Up for free" : "Log in now"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
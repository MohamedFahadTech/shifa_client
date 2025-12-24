import React, { useState } from "react";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {

    const navigate = useNavigate();

    const [fahad, setEmail] = useState("");
    const [haneef, setPassword] = useState("");
    const EmailQ = (e) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {

        if (!fahad) {
            alert('usename required')
        }

        try {
            const kamal = await axios.post('http://localhost:5000/user/login', {
                email: fahad,
                password: haneef
            });
            console.log(kamal.data)
            if (kamal.data.success) {
                navigate('/layout/home')

            }
            else {
                alert(kamal.data.message)
            }
        }
        catch {
            console.log('error in login', error)
        }
    }






    return (
        <div className="min-h-screen flex bg-[#0B0C0F]">
            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#0B0C0F] items-center justify-center p-12 border-r border-white/10">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1545173153-93627708ef4a?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center"></div>

                <div className="relative z-10 text-center">
                    <h1 className="text-5xl font-bold tracking-tighter text-white mb-4">
                        SHIFA <span className="text-[#F6C453]">LAUNDRY</span>
                    </h1>
                    <p className="text-gray-300 text-lg tracking-widest uppercase">
                        Experience Premium Care
                    </p>

                    <div className="mt-8 flex justify-center space-x-2">
                        <span className="h-1 w-12 bg-[#F6C453] rounded-full"></span>
                        <span className="h-1 w-4 bg-[#F6C453]/50 rounded-full"></span>
                        <span className="h-1 w-4 bg-[#F6C453]/50 rounded-full"></span>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white lg:rounded-l-[40px]">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="mb-10 lg:hidden">
                        <h1 className="text-3xl font-bold text-[#0B0C0F]">
                            SHIFA <span className="text-[#F6C453]">LAUNDRY</span>
                        </h1>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-500">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    {/* FORM */}
                    <div className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={fahad}
                                    onChange={EmailQ}

                                    placeholder="name@company.com"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F6C453]"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-[#F6C453] hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={haneef}
                                    onChange={passwordChange}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F6C453]"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-[#F6C453] border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Remember for 30 days
                            </span>
                        </div>

                        {/* Sign In */}
                        <button
                            type="button"
                            onClick={handleLogin}

                            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-[#0B0C0F] hover:bg-gray-800 transition-all"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Google */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                className="h-5 w-5 mr-2"
                                alt="Google"
                            />
                            Sign in with Google
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="font-bold text-[#F6C453] hover:underline"
                        >
                            Sign up for free
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
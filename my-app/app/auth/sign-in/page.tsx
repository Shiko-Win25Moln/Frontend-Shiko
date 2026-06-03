'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Button from '@/Components/Button';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const router = useRouter(); // Initiera routern

    const handleContinue = async () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        
        localStorage.setItem("verificationEmail", email);

        try {
            
            await fetch("https://shikoverificationapi.azurewebsites.net/api/email-verification/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }), 
            });
        } catch (error) {
            console.error("Backend error:", error);
        }

        
        router.push("/Verification");
    };

    return (
        <div className="flex min-h-screen w-full bg-[#fcfcfc] p-4 lg:p-6 font-sans antialiased text-[#1e293b]">
            {/* LEFT HALF - GRADIENT BOX WITH BACKGROUND IMAGE */}
            <div className="hidden lg:flex lg:w-1/2 relative rounded-3xl overflow-hidden shadow-sm bg-gradient-to-tr from-[#f05a30] to-[#ff8f6b]">
                
                {/* Denna bild täcker nu hela vänstra halvan */}
                <img 
                    src="/Shiko-login.svg" 
                    alt="Shiko Design" 
                    className="w-full h-full object-cover absolute inset-0 mix-blend-overlay opacity-90" 
                />

                {/* Logotypen och namnet som flyter ovanpå bilden */}
                <div className="absolute top-10 left-10 flex items-center gap-2 z-10">
                    <span className="text-white text-3xl font-bold tracking-wide flex items-center gap-2">
                        <svg className="w-8 h-8 fill-white inline" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
                        </svg>
                        Shiko
                    </span>
                </div>
            </div>

            {/* RIGHT HALF - Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 bg-[#fcfcfc]">
                <div className="max-w-md w-full">

                    <h2 className="text-4xl font-semibold mb-2 text-[#1e293b]">Welcome</h2>
                    <p className="text-gray-400 text-sm mb-10">Please log in to your account to continue.</p>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#1e293b] mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f05a30] focus:border-transparent outline-none transition-all text-sm placeholder-gray-300"
                                    placeholder="Type your email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="text-right mt-2">
                                <a href="#" className="text-xs font-medium text-[#f05a30] hover:underline">
                                    Forgot your email address?
                                </a>
                            </div>
                        </div>

                        <Button onClick={handleContinue} variant="orange" size="md">Continue</Button>

                        <div className="relative flex py-6 items-center">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-xs font-normal">or continue with</span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        <button
                            onClick={() => { }}
                            className="w-full flex items-center justify-center gap-3 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-transparent text-gray-600 font-medium py-3.5 rounded-xl transition-colors text-sm shadow-sm"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 23 23">
                                <path fill="#f35325" d="M0 0h11v11H0z" />
                                <path fill="#81bc06" d="M12 0h11v11H12z" />
                                <path fill="#05a6f0" d="M0 12h11v11H0z" />
                                <path fill="#ffba08" d="M12 12h11v11H12z" />
                            </svg>
                            <span className="text-[#64748b]">Work or school account</span>
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
}
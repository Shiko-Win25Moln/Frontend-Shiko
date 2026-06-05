'use client';
 
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/Components/Button';
 
function PasswordForm() {
    const searchParams = useSearchParams();
 
    // 🚀 FIXAT: Vi initierar staten direkt från URL:en. Ingen useEffect behövs, vilket tar bort ESLint-felet!
    const [email, setEmail] = useState(() => searchParams.get('email') || '');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEmailPreFilled] = useState(() => !!searchParams.get('email'));
 
    const handleSignIn = async () => {
        if (!email) {
            alert("E-postadress saknas.");
            return;
        }
        if (!password) {
            alert("Ange ditt lösenord.");
            return;
        }
 
        setLoading(true);
 
        try {
            const response = await fetch('https://lms-auth-rasmus-cvcpfxgmd8hwhuas.spaincentral-01.azurewebsites.net/api/Users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
 
            if (response.ok) {
                const data = await response.json();
 
                if (data.accessToken) {
                    localStorage.setItem('token', data.accessToken);
                }
 
                window.location.href = ('/');
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert("Inloggningen misslyckades: " + (errorData.title || "Fel lösenord"));
            }
        } catch (error) {
            console.error('Anropet misslyckades:', error);
            alert('Kunde inte ansluta till servern. Kontrollera att din backend är igång.');
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div className="flex min-h-screen w-full bg-[#fcfcfc] p-4 lg:p-6 font-sans antialiased text-[#1e293b]">
            {/* VÄNSTER HALVA - Bilden */}
            <div className="hidden lg:flex lg:w-1/2 relative rounded-3xl overflow-hidden shadow-sm bg-gray-100">
                <img src="/Shiko-login.svg" alt="Shiko Design" className="w-full h-full object-cover" />
                <div className="absolute top-10 left-10 flex items-center gap-2">
                    <span className="text-white text-3xl font-bold tracking-wide flex items-center gap-2">
                        <svg className="w-8 h-8 fill-white inline" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
                        </svg>
                        Shiko
                    </span>
                </div>
            </div>
 
            {/* HÖGER HALVA - Formuläret */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 bg-[#fcfcfc]">
                <div className="max-w-md w-full">
                    <h2 className="text-4xl font-semibold mb-2 text-[#1e293b]">Enter Password</h2>
                    <p className="text-gray-400 text-sm mb-10">Please enter your password to log in to your account.</p>
 
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#1e293b] mb-2">Email address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isEmailPreFilled}
                                    className={`w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-xs outline-none ${isEmailPreFilled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'focus:ring-2 focus:ring-[#f05a30] focus:border-transparent'}`}
                                    placeholder="your-email@domain.com"
                                />
                            </div>
                        </div>
 
                        <div>
                            <label className="block text-sm font-semibold text-[#1e293b] mb-2">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f05a30] focus:border-transparent outline-none transition-all text-xs"
                                    placeholder="Type your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
 
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input type="checkbox" checked={keepLoggedIn} onChange={(e) => setKeepLoggedIn(e.target.checked)} className="w-4 h-4 rounded text-[#f05a30] focus:ring-[#f05a30] border-gray-300 transition-all accent-[#f05a30]" />
                                <span className="text-xs text-gray-400 font-medium">Keep me logged in</span>
                            </label>
                            <a href="/auth/forgot-password" className="text-xs font-medium text-[#f05a30] hover:underline">Forgot your password?</a>
                        </div>
 
                        <div className="pt-2">
                            <Button onClick={handleSignIn} disabled={loading} variant="orange" size="md">{loading ? 'Signing in...' : 'Sign In'}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default function PasswordPage() {
    return (
        <Suspense fallback={<div className="p-6 text-center text-xs text-gray-400">Loading auth form...</div>}>
            <PasswordForm />
        </Suspense>
    );
}
'use client';

import React, { useState, Suspense } from 'react';
import Button from '@/Components/Button';

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSendLink = async () => {
        if (!email) {
            alert("Vänligen fyll i din e-postadress.");
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const response = await fetch('https://lms-auth-rasmus-cvcpfxgmd8hwhuas.spaincentral-01.azurewebsites.net/api/Users/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: 'Om adressen finns i vårt system har en återställningslänk skickats!',
                });
                setEmail('');
            } else {
                setStatus({ type: 'error', message: 'Något gick fel på servern. Försök igen.' });
            }
        } catch (error) {
            console.error('Anropet misslyckades:', error);
            setStatus({ type: 'error', message: 'Kunde inte ansluta till servern. Kontrollera nätverket.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-[#fcfcfc] p-4 lg:p-6 font-sans antialiased text-[#1e293b]">
            {/* VÄNSTER HALVA */}
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
                    <h2 className="text-4xl font-semibold mb-2 text-[#1e293b]">Forgot Password</h2>
                    <p className="text-gray-400 text-sm mb-10">Enter your email address and we will send you a link to reset your password.</p>

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
                                    disabled={loading}
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#f05a30] focus:border-transparent transition-all"
                                    placeholder="your-email@domain.com"
                                />
                            </div>
                        </div>

                        {status && (
                            <div className={`p-3.5 rounded-xl text-xs font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                {status.message}
                            </div>
                        )}

                        <div className="pt-2">
                            <Button onClick={handleSendLink} disabled={loading} variant="orange" size="md">
                                {loading ? 'Sending link...' : 'Send Reset Link'}
                            </Button>
                        </div>

                        <div className="text-center pt-2">
                            <a href="/auth/login" className="text-xs font-medium text-gray-400 hover:text-[#f05a30] transition-colors">
                                Back to Sign In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={<div className="p-6 text-center text-xs text-gray-400">Loading reset form...</div>}>
            <ForgotPasswordForm />
        </Suspense>
    );
}

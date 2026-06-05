'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/Components/Button';

function ResetPasswordForm() {
    const searchParams = useSearchParams();

    const [email] = useState(() => searchParams.get('email') || '');
    const [token] = useState(() => searchParams.get('token') || '');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            alert("Vänligen fyll i båda lösenordsfälten.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Lösenorden matchar inte.");
            return;
        }
        if (!token || !email) {
            alert("Säkerhetskod (token) eller e-post saknas i adressraden. Begär en ny länk.");
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const response = await fetch('https://lms-auth-rasmus-cvcpfxgmd8hwhuas.spaincentral-01.azurewebsites.net/api/Users/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    token: token,
                    newPassword: password,
                }),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Ditt lösenord har uppdaterats! Du kan nu logga in igen.' });
                setPassword('');
                setConfirmPassword('');
            } else {
                const errorData = await response.json().catch(() => ({}));
                setStatus({ type: 'error', message: errorData.title || 'Länken är ogiltig eller har löpt ut.' });
            }
        } catch (error) {
            console.error('Anropet misslyckades:', error);
            setStatus({ type: 'error', message: 'Kunde inte ansluta till servern.' });
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
                    <h2 className="text-4xl font-semibold mb-2 text-[#1e293b]">Reset Password</h2>
                    <p className="text-gray-400 text-sm mb-10">Choose a strong new password for your account.</p>

                    <div className="space-y-5">
                        {/* Nytt lösenord */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1e293b] mb-2">New Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading || !token}
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f05a30] focus:border-transparent outline-none transition-all text-xs"
                                    placeholder="Type your new password"
                                />
                            </div>
                        </div>

                        {/* Bekräfta lösenord */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1e293b] mb-2">Confirm New Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={loading || !token}
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f05a30] focus:border-transparent outline-none transition-all text-xs"
                                    placeholder="Confirm your new password"
                                />
                            </div>
                        </div>

                        {status && (
                            <div className={`p-3.5 rounded-xl text-xs font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                {status.message}
                            </div>
                        )}

                        {!token && (
                            <div className="p-3.5 rounded-xl text-xs font-medium bg-amber-50 text-amber-800 border border-amber-100">
                                Säkerhetskod saknas i adressraden. Du måste klicka på länken från återställningsmailet.
                            </div>
                        )}

                        <div className="pt-2">
                            <Button onClick={handleResetPassword} disabled={loading || !token} variant="orange" size="md">
                                {loading ? 'Saving password...' : 'Save Password'}
                            </Button>
                        </div>

                        <div className="text-center pt-2">
                            <a href="/" className="text-xs font-medium text-gray-400 hover:text-[#f05a30] transition-colors">
                                Back to Sign In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="p-6 text-center text-xs text-gray-400">Loading reset form...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
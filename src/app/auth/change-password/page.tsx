'use client';

import Button from '@/components/ui/Button';
import { useChangePassword } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function ChangePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const { user, setAuth, token } = useAuthStore();
    const { mutate: changePassword, isPending } = useChangePassword();

    // If no user/token, redirect to login (basic protection)
    // useEffect(() => {
    //     if (!token) router.push('/auth/login');
    // }, [token, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        changePassword(password, {
            onSuccess: () => {
                // Update local user state to remove forcePasswordChange flag if present
                if (user && token) {
                    // Since backend updates it, we might need to refresh profile or manually update store
                    const updatedUser = { ...user, forcePasswordChange: false };
                    setAuth(updatedUser, token);
                }
                alert('Password changed successfully. Please login with your new password.');
                // Or just proceed to dashboard
                router.push('/account'); // or dashboard? Student portal home?
            },
            onError: (err: any) => {
                setError(err.message || 'Failed to change password');
            }
        });
    };

    return (
        <>
            <Head>
                <title>Tiger Muay Thai - Change Password</title>
            </Head>
            <div className="min-h-screen bg-bg flex items-center justify-center py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto"
                    >
                        <div className="card bg-white p-8 rounded-lg shadow-md">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-text mb-2">Change Password</h1>
                                <p className="text-text-muted">Please create a new password for your account.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                                        <input
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                                    disabled={isPending}
                                >
                                    {isPending ? 'Changing Password...' : 'Change Password'}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

'use client';

import EvaluationsSection from '@/components/account/EvaluationsSection';
import Button from '@/components/ui/Button';
import { useProfile, useUpdateProfile } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { LogOut, Mail, Phone, Save, Shield, X } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function AccountPage() {
    useEffect(() => {
        document.title = 'Tiger Muay Thai - Account';
    }, []);

    const router = useRouter();
    const { isAuthenticated, user: storeUser, logout, setAuth, token } = useAuthStore();
    const { data: profileData, refetch } = useProfile();
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

    const user = profileData?.data || storeUser;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });

    // Initialize form data when entering edit mode
    useEffect(() => {
        if (isEditing && user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
            });
        }
    }, [isEditing, user]);

    const initials = useMemo(() => {
        const n = (user?.name ?? '').trim();
        if (!n) return 'U';
        const parts = n.split(/\s+/);
        return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
    }, [user?.name]);

    const joined = useMemo(() => {
        if (!user?.createdAt) return null;
        const d = new Date(user.createdAt);
        return isNaN(d.getTime()) ? null : d.toLocaleDateString();
    }, [user?.createdAt]);

    const onLogout = useCallback(async () => {
        try {
            await Promise.resolve(logout?.());
            router.replace('/');
        } catch (e) {
            console.error('Logout failed:', e);
        }
    }, [logout, router]);

    const handleSaveProfile = () => {
        updateProfile(formData, {
            onSuccess: (response) => {
                setIsEditing(false);
                refetch();
                // Update store as well for consistency
                if (response?.data && token) {
                    setAuth(response.data, token);
                }
            },
            onError: (err) => {
                alert('Failed to update profile');
                console.error(err);
            }
        });
    };

    if (!isAuthenticated) {
        return (
            <>
                <Head>
                    <title>Tiger Muay Thai - My Account</title>
                    <meta name="description" content="Manage your Tiger Muay Thai account." />
                </Head>
                <div className="min-h-screen bg-bg py-24">
                    <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold mb-4"
                        >
                            Account
                        </motion.h1>
                        <p className="text-text-muted mb-8">
                            You need to be signed in to view your account.
                        </p>
                        <Link href="/auth/login">
                            <Button variant="primary">Sign In</Button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Tiger Muay Thai - My Account</title>
            </Head>
            <div className="min-h-screen bg-bg py-24">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between"
                    >
                        <h1 className="text-3xl lg:text-4xl font-bold">Your Account</h1>
                        <Button variant="secondary" onClick={onLogout} className="gap-2">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.section
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="bg-surface rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                    >
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={user?.name ?? 'User avatar'}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xl">
                                {initials.toUpperCase()}
                            </div>
                        )}

                        <div className="flex-1 min-w-0 w-full">
                            {isEditing ? (
                                <div className="grid gap-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1">Name</label>
                                        <input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1">Phone</label>
                                        <input
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="flex space-x-2 pt-2">
                                        <Button size="sm" onClick={handleSaveProfile} disabled={isUpdating}>
                                            <Save className="w-4 h-4 mr-2" />
                                            Save
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xl font-semibold truncate">{user?.name ?? 'User'}</span>
                                        {user?.roles?.includes('student') && (
                                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 font-medium">
                                                Student
                                            </span>
                                        )}
                                        {user?.role && (
                                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                                {user.role}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 text-sm text-text-muted">
                                        {user?.email && (
                                            <span className="inline-flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                {user.email}
                                            </span>
                                        )}
                                        {user?.phone && (
                                            <span className="inline-flex items-center gap-1">
                                                <Phone className="w-4 h-4" />
                                                {user.phone}
                                            </span>
                                        )}
                                        {joined && (
                                            <span className="inline-flex items-center gap-1">
                                                <Shield className="w-4 h-4" />
                                                Member since {joined}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {!isEditing && (
                            <div className="self-start sm:self-center">
                                <Button variant="ghost" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                            </div>
                        )}
                    </motion.section>

                    {/* Enrolled Classes */}
                    {user?.enrolledClassTemplates && user.enrolledClassTemplates.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-xl font-bold mb-4">Enrolled Classes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.enrolledClassTemplates.map((template: any) => (
                                    <div key={template.id || template._id} className="bg-surface rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg">{template.title}</h3>
                                            <p className="text-sm text-text-muted mt-1 mb-2 line-clamp-2">{template.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                                                    {template.level}
                                                </span>
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-50 text-gray-700 text-xs font-medium">
                                                    {template.durationMin} min
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* Evaluations */}
                    <EvaluationsSection />

                    {/* Quick Links */}
                    <motion.section
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        <div className="bg-surface rounded-xl p-5 shadow-sm col-span-1 sm:col-span-2">
                            <div className="text-sm text-text-muted">Security</div>
                            <div className="text-lg font-semibold">Update password & sessions</div>
                            <Link href="/auth/change-password" className="text-primary text-sm mt-2 block hover:underline">
                                Change Password →
                            </Link>
                        </div>
                    </motion.section>
                </div>
            </div>
        </>
    );
}

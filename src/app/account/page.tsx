'use client';

import Button from '@/components/ui/Button';
import Head from 'next/head';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { LogOut, Mail, Shield, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export default function AccountPage() {
  const router = useRouter();

  // Expecting these from your store:
  // - isAuthenticated: boolean
  // - user: { id?: string; name?: string; email?: string; avatarUrl?: string; createdAt?: string | number | Date; role?: string; }
  // - logout(): Promise<void> | void
  const { isAuthenticated, user, logout } = useAuthStore();

  // If your store exposes `signOut` instead of `logout`, rename here:
  // const { isAuthenticated, user, signOut: logout } = useAuthStore();

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
      router.replace('/'); // go home after logout
    } catch (e) {
      console.error('Logout failed:', e);
    }
  }, [logout, router]);

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Tiger Muay Thai - My Account</title>
          <meta name="description" content="Manage your Tiger Muay Thai account, view bookings, and update your profile." />
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
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-muted mb-8"
          >
            You need to be signed in to view your account.
          </motion.p>
          <Button asChild variant="primary">
            <Link href="/auth/login">Sign In</Link>
          </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Tiger Muay Thai - My Account</title>
        <meta name="description" content="Manage your Tiger Muay Thai account, view bookings, and update your profile." />
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
          className="bg-surface rounded-xl shadow-sm p-6 flex items-center gap-5"
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user?.name ?? 'User avatar'}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
              {initials.toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <UserIcon className="w-4 h-4 text-text-muted" />
              <span className="font-semibold truncate">{user?.name ?? 'User'}</span>
              {user?.role && (
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {user.role}
                </span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-text-muted">
              {user?.email && (
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </span>
              )}
              {joined && (
                <span className="inline-flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Member since {joined}
                </span>
              )}
              {user?.id && (
                <span className="inline-flex items-center gap-1">
                  ID: <code className="text-xs">{user.id}</code>
                </span>
              )}
            </div>
          </div>

          <div className="hidden sm:block">
            <Button asChild variant="ghost">
              <Link href="/account/edit">Edit Profile</Link>
            </Button>
          </div>
        </motion.section>

        {/* (Optional) Quick Links */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Link
            href="/orders"
            className="bg-surface rounded-xl p-5 shadow-sm hover:shadow transition-shadow"
          >
            <div className="text-sm text-text-muted">Orders</div>
            <div className="text-lg font-semibold">View your order history</div>
          </Link>

          <Link
            href="/settings/security"
            className="bg-surface rounded-xl p-5 shadow-sm hover:shadow transition-shadow"
          >
            <div className="text-sm text-text-muted">Security</div>
            <div className="text-lg font-semibold">Update password & sessions</div>
          </Link>
        </motion.section>
        </div>
      </div>
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useLogin } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Tiger Muay Thai - Sign In',
  description: 'Sign in to your Tiger Muay Thai account.',
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData, {
      onSuccess: (response) => {
        setAuth(response.data.user, response.data.token);
        router.push('/account');
      },
    });
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="card">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-text mb-2">Welcome Back</h1>
              <p className="text-text-muted">Sign in to your account to continue training.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error.message || 'Login failed. Please check your credentials.'}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                size="lg"
                disabled={isPending}
              >
                {isPending ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-text-muted">
                Don't have an account?{' '}
                <a href="/auth/register" className="text-primary font-medium hover:underline">
                  Sign up for free
                </a>
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-text mb-2">Demo Accounts:</p>
              <div className="text-xs text-text-muted space-y-1">
                <p>Admin: admin@apexmma.com / admin123</p>
                <p>Member: member@example.com / member123</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
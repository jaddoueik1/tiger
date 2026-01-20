'use client';

import CartDrawer from '@/components/cart/CartDrawer'; // ← add this
import { useContent } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, User, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);       // mobile nav
    const [cartOpen, setCartOpen] = useState(false);   // cart drawer
    const { data: navigation } = useContent('navigation.main');
    const { isAuthenticated, user } = useAuthStore();
    const { getCartCount } = useCartStore();           // badge count

    const navItems = navigation?.data?.items || [];
    const brand = navigation?.data?.brand;
    const cta = navigation?.data?.cta || { label: 'Book Trial', href: '/pricing' };

    const cartCount = getCartCount();

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
                <nav className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">T</span>
                            </div>
                            <span className="text-xl font-bold">{brand}</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navItems.map((item: any) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-700 hover:text-primary transition-colors font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right side actions */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {/* Cart button with badge → opens drawer */}
                            <button
                                aria-label="Open cart"
                                onClick={() => setCartOpen(true)}
                                className="relative p-2 text-gray-700 hover:text-primary transition-colors"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1 rounded-full bg-primary text-white text-[10px] leading-5 text-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <Link href="/account" className="p-2 text-gray-700 hover:text-primary transition-colors">
                                        <User className="w-5 h-5" />
                                    </Link>
                                    <span className="text-sm text-gray-600 hidden xl:block">Hi, {user?.name?.split(' ')[0]}</span>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="text-gray-700 hover:text-primary transition-colors font-medium"
                                    >
                                        Sign In
                                    </Link>
                                    <Link href={cta.href} className="btn-primary hidden sm:block">
                                        {cta.label}
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="lg:hidden border-t border-gray-200 py-4 overflow-hidden"
                            >
                                <div className="space-y-4">
                                    {navItems.map((item: any) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-gray-700 hover:text-primary transition-colors font-medium"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                    <div className="pt-4 border-t border-gray-200 space-y-4">
                                        {/* Mobile cart trigger */}
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                setCartOpen(true);
                                            }}
                                            className="block w-full text-left text-gray-700 hover:text-primary transition-colors font-medium"
                                        >
                                            Cart {cartCount > 0 ? `(${cartCount})` : ''}
                                        </button>

                                        {!isAuthenticated ? (
                                            <>
                                                <Link
                                                    href="/auth/login"
                                                    onClick={() => setIsOpen(false)}
                                                    className="block text-gray-700 hover:text-primary transition-colors font-medium"
                                                >
                                                    Sign In
                                                </Link>
                                                <Link
                                                    href={cta.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block btn-primary text-center"
                                                >
                                                    {cta.label}
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/account"
                                                    onClick={() => setIsOpen(false)}
                                                    className="block text-gray-700 hover:text-primary transition-colors font-medium"
                                                >
                                                    Account
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>

            {/* Cart Drawer Portal */}
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}

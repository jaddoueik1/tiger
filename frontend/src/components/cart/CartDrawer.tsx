'use client';

import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    products,
    pushToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCartStore();
  const router = useRouter();

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const increment = (item: { id: string; name: string; price: number }) => {
    pushToCart({ id: item.id, name: item.name, price: item.price }, 1);
  };

  const decrement = (item: { id: string; name: string; price: number; quantity: number }) => {
    if (item.quantity <= 1) {
      removeFromCart(item.id);
      return;
    }
    // remove then re-add with qty-1 (since no setQuantity)
    removeFromCart(item.id);
    pushToCart({ id: item.id, name: item.name, price: item.price }, item.quantity - 1);
  };

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-surface shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <p className="text-sm text-text-muted">
                  {cartCount} item{cartCount !== 1 ? 's' : ''} • ${cartTotal.toFixed(2)}
                </p>
              </div>
              <button
                aria-label="Close cart"
                className="h-9 w-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {products.length === 0 ? (
                <div className="text-center py-10 text-text-muted">Your cart is empty.</div>
              ) : (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border p-3 flex items-center gap-3"
                  >
                    {/* Placeholder thumb (replace with item image if you store it) */}
                    <div className="h-16 w-16 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 text-sm shrink-0">
                      {item.name?.slice(0, 1) ?? '?'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        <button
                          aria-label="Remove item"
                          className="h-8 w-8 rounded-md border border-red-200 text-red-600 flex items-center justify-center hover:bg-red-50 shrink-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm text-text-muted">
                          Unit: ${item.price.toFixed(2)}
                        </span>
                        <span className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          aria-label="Decrease"
                          className="h-8 w-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          onClick={() => decrement(item)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          aria-label="Increase"
                          className="h-8 w-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          onClick={() => increment(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-text">Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" className="flex-1" onClick={() => {
                  router.push('/checkout');
                  onClose();
                }}>
                  Checkout
                </Button>
                <Button variant="secondary" onClick={clearCart}>
                  Clear
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

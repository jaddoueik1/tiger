'use client';

import { useCartStore } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';

type CartButtonProps = {
  onClick: () => void;
};

export default function CartButton({ onClick }: CartButtonProps) {
  const { getCartCount } = useCartStore();
  const count = getCartCount();

  return (
    <button
      aria-label="Open cart"
      className="relative h-10 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 flex items-center gap-2"
      onClick={onClick}
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="hidden sm:inline text-sm font-medium">Cart</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-primary text-white text-xs flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

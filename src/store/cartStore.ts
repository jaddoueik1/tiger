import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Cart {
  userId: string;
  products: Product[];
  pushToCart: (product: Omit<Product, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<Cart>()(
  persist(
    (set, get) => ({
      userId: "",
      products: [],
      pushToCart: (product, quantity = 1) => {
        const products = get().products;
        const existing = products.find((p) => p.id === product.id);
        
        console.log('pushToCart called with:', { product, quantity, existing });

        if (existing) {
          // Update quantity if already in cart
          set({
            products: products.map((p) =>
              p.id === product.id
                ? { ...p, quantity: p.quantity + quantity }
                : p
            ),
          });
          console.log('Updated existing product quantity');
        } else {
          // Add new product
          const newProduct = { ...product, quantity };
          console.log('Adding new product:', newProduct);
          set({
            products: [...products, newProduct],
          });
        }
        
        // Log final state
        console.log('Cart state after update:', get().products);
      },
      removeFromCart: (id) => {
        set({
          products: get().products.filter((p) => p.id !== id),
        });
      },
      clearCart: () => {
        set({ products: [] });
      },
      getCartTotal: () => {
        return get().products.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);
      },
      getCartCount: () => {
        return get().products.reduce((count, product) => {
          return count + product.quantity;
        }, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

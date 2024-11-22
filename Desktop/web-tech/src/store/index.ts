import { create } from 'zustand';
import { User, CartItem, Shoe } from '../types';

interface Store {
  user: User | null;
  cart: CartItem[];
  wishlist: string[];
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (shoeId: string) => void;
  toggleWishlist: (shoeId: string) => void;
  clearCart: () => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  cart: [],
  wishlist: [],
  setUser: (user) => set({ user }),
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (shoeId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.shoeId !== shoeId),
    })),
  toggleWishlist: (shoeId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(shoeId)
        ? state.wishlist.filter((id) => id !== shoeId)
        : [...state.wishlist, shoeId],
    })),
  clearCart: () => set({ cart: [] }),
}));
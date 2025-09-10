"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserRole = "Super Admin" | "Seller" | "Worker" | "Warehouse Manager" | "Customer";

interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

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
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => {
        console.log("Login called with user:", user); // Debug log
        set({ user, isAuthenticated: true });
        console.log("State after login:", get()); // Debug log
      },
      logout: () => {
        console.log("Logout called"); // Debug log
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user) => {
        console.log("SetUser called with:", user); // Debug log
        set({ user });
      },
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage), 
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Error during hydration:", error);
          } else {
            console.log("Auth store hydrated:", state);
          }
        };
      },
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
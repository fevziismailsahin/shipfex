"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestLoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("test@example.com");
  const [role, setRole] = useState("Seller");

  const handleLogin = () => {
    login({
      name: email.split('@')[0],
      email,
      role: role as any,
    });
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Test Login</h1>
      <div className="bg-muted p-4 rounded-lg space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Seller">Seller</option>
            <option value="Warehouse Manager">Warehouse Manager</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Worker">Worker</option>
            <option value="Customer">Customer</option>
          </select>
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Login as {role}
        </button>
        
        <div className="mt-4">
          <button
            onClick={() => router.push("/login")}
            className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
          >
            Go to Real Login Page
          </button>
        </div>
      </div>
    </div>
  );
}
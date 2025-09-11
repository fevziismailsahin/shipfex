"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleTestPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Determine which dashboard component should be rendered
  let expectedDashboard = "";
  switch (user.role) {
    case "Seller":
      expectedDashboard = "Seller Dashboard";
      break;
    case "Warehouse Manager":
      expectedDashboard = "Warehouse Manager Dashboard";
      break;
    case "Super Admin":
      expectedDashboard = "Super Admin Dashboard";
      break;
    case "Worker":
      expectedDashboard = "Worker Dashboard";
      break;
    case "Customer":
      expectedDashboard = "Customer Dashboard";
      break;
    default:
      expectedDashboard = "Default Seller Dashboard";
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Role Test</h1>
      <div className="bg-muted p-4 rounded-lg space-y-4">
        <div>
          <h2 className="text-lg font-semibold">User Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Expected Dashboard</h2>
          <p>{expectedDashboard}</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Navigation</h2>
          <button 
            onClick={() => router.push("/dashboard")}
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
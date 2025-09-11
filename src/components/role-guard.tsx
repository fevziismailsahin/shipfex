"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasAccess, UserRole } from "@/lib/roles";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  currentPage: string;
}

export default function RoleGuard({ children, allowedRoles, currentPage }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (!isAuthenticated) {
      router.push("/login");
      setIsChecking(false);
      return;
    }

    // Check if user has access to this page
    if (user && !hasAccess(user.role, currentPage)) {
      // Redirect to appropriate dashboard based on role
      router.push("/dashboard");
      setIsChecking(false);
      return;
    }
    
    setIsChecking(false);
  }, [user, isAuthenticated, router, currentPage]);

  // Show loading state while checking authentication
  if (isChecking || !isAuthenticated || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Check if user has access to this page
  if (!hasAccess(user.role, currentPage)) {
    // This should be handled by the useEffect, but just in case
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="mt-2 text-muted-foreground">
          You don't have permission to access this page.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
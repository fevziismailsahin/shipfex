"use client";

import { useAuthStore } from "@/store/auth";

export default function DebugPage() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      <div className="bg-muted p-4 rounded-lg">
        <p className="mb-2"><strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}</p>
        {user && (
          <>
            <p className="mb-2"><strong>User Name:</strong> {user.name}</p>
            <p className="mb-2"><strong>User Email:</strong> {user.email}</p>
            <p className="mb-2"><strong>User Role:</strong> {user.role}</p>
          </>
        )}
        {!user && <p>No user data available</p>}
      </div>
    </div>
  );
}
"use client";

import React from "react";
import RoleGuard from "@/components/role-guard";
import { useAuthStore } from "@/store/auth";
import SellerDashboard from "@/app/dashboard/seller-dashboard";
import WarehouseManagerDashboard from "@/app/dashboard/warehouse-manager-dashboard";
import SuperAdminDashboard from "@/app/dashboard/super-admin-dashboard";
import WorkerDashboard from "@/app/dashboard/worker-dashboard";
import CustomerDashboard from "@/app/dashboard/customer-dashboard";

export default function Dashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Render dashboard based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case "Seller":
        return <SellerDashboard />;
      case "Warehouse Manager":
        return <WarehouseManagerDashboard />;
      case "Super Admin":
        return <SuperAdminDashboard />;
      case "Worker":
        return <WorkerDashboard />;
      case "Customer":
        return <CustomerDashboard />;
      default:
        return <SellerDashboard />; // Default fallback
    }
  };

  return (
    <RoleGuard 
      allowedRoles={["Super Admin", "Seller", "Worker", "Warehouse Manager", "Customer"]} 
      currentPage="/dashboard"
    >
      {renderDashboard()}
    </RoleGuard>
  );
}

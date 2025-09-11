// Define user roles
export type UserRole = "Super Admin" | "Seller" | "Worker" | "Warehouse Manager" | "Customer";

// Define permissions for each role
export const rolePermissions: Record<UserRole, string[]> = {
  "Super Admin": [
    "dashboard",
    "inventory",
    "orders",
    "shipments",
    "inbound",
    "returns",
    "integrations",
    "analytics",
    "settings",
    "users",
    "system"
  ],
  "Seller": [
    "dashboard",
    "inventory",
    "orders",
    "shipments",
    "integrations",
    "analytics",
    "settings"
  ],
  "Worker": [
    "dashboard",
    "inventory",
    "orders",
    "shipments",
    "inbound",
    "returns",
    "settings"
  ],
  "Warehouse Manager": [
    "dashboard",
    "inventory",
    "orders",
    "shipments",
    "inbound",
    "returns",
    "analytics",
    "settings"
  ],
  "Customer": [
    "dashboard",
    "orders",
    "shipments",
    "returns",
    "settings"
  ]
};

// Define which roles can access which pages
export const pageAccess: Record<string, UserRole[]> = {
  "/dashboard": ["Super Admin", "Seller", "Worker", "Warehouse Manager", "Customer"],
  "/dashboard/inventory": ["Super Admin", "Seller", "Worker", "Warehouse Manager"],
  "/dashboard/orders": ["Super Admin", "Seller", "Worker", "Warehouse Manager", "Customer"],
  "/dashboard/shipments": ["Super Admin", "Seller", "Worker", "Warehouse Manager", "Customer"],
  "/dashboard/inbound": ["Super Admin", "Worker", "Warehouse Manager"],
  "/dashboard/returns": ["Super Admin", "Worker", "Warehouse Manager", "Customer"],
  "/dashboard/integrations": ["Super Admin", "Seller"],
  "/dashboard/analytics": ["Super Admin", "Seller", "Warehouse Manager"],
  "/dashboard/settings": ["Super Admin", "Seller", "Worker", "Warehouse Manager", "Customer"]
};

// Check if a user role has access to a specific page
export function hasAccess(role: UserRole, page: string): boolean {
  const allowedRoles = pageAccess[page] || [];
  return allowedRoles.includes(role);
}
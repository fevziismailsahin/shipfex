"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  ShoppingCart,
  Truck,
  ArrowLeftRight,
  Warehouse,
  Users,
  GitBranch,
  Settings,
  BarChart,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "./ui/scroll-area";
import { useAuthStore } from "@/store/auth";
import { hasAccess, UserRole } from "@/lib/roles";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
  { href: "/dashboard/inventory", label: "Inventory", icon: Warehouse },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/shipments", label: "Shipments", icon: Truck },
  { href: "/dashboard/inbound", label: "Inbound", icon: Package },
  { href: "/dashboard/returns", label: "Returns", icon: ArrowLeftRight },
  { href: "/dashboard/integrations", label: "Integrations", icon: GitBranch },
  // { href: "/dashboard/users", label: "Users", icon: Users },
];

const settingsLink = { href: "/dashboard/settings", label: "Settings", icon: Settings };

export function DashboardNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  // Filter navigation links based on user role
  const filteredNavLinks = navLinks.filter(link => {
    if (!user) return false;
    return hasAccess(user.role as UserRole, link.href);
  });

  // Check if user has access to settings
  const showSettings = user ? hasAccess(user.role as UserRole, settingsLink.href) : false;

  const renderLink = (link: typeof navLinks[0]) => {
    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard');
    const LinkContent = (
      <Link
        href={link.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-all hover:text-primary",
          isActive && "bg-muted text-primary"
        )}
      >
        <link.icon className="h-5 w-5" />
        {link.label}
      </Link>
    );

    return <div key={link.href}>{LinkContent}</div>;
  };

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-16 items-center border-b px-4 lg:h-[64px] lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Truck className="h-6 w-6" />
          <span className="text-lg">ShipFex</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid items-start p-2 text-base font-medium lg:p-4">
          {filteredNavLinks.map((link) => renderLink(link))}
        </nav>
      </ScrollArea>
      {showSettings && (
        <div className="mt-auto p-4 border-t">
          {renderLink(settingsLink)}
        </div>
      )}
    </div>
  );
}
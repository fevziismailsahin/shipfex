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
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "./ui/scroll-area";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
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

  const renderLink = (link: typeof navLinks[0]) => {
    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard');
    const LinkContent = (
      <Link
        href={link.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          isActive && "bg-muted text-primary"
        )}
      >
        <link.icon className="h-4 w-4" />
        {link.label}
      </Link>
    );

    return <div key={link.href}>{LinkContent}</div>;
  };

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Truck className="h-6 w-6" />
          <span>ShipFex</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid items-start p-2 text-sm font-medium lg:p-4">
          {navLinks.map((link) => renderLink(link))}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4 border-t">
          {renderLink(settingsLink)}
      </div>
    </div>
  );
}

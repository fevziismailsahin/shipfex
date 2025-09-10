import { Box, Package, Truck, Zap, AppWindow, GitBranch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featureList = [
    {
        icon: <Box className="h-8 w-8 text-primary" />,
        title: "Inventory Management",
        description: "Gain a single source of truth for your inventory. Track stock levels in real-time across multiple warehouses, set reorder points, and manage bundles and kits effortlessly.",
    },
    {
        icon: <Package className="h-8 w-8 text-primary" />,
        title: "Order Management",
        description: "A centralized hub for all your orders. Automatically import orders from all your sales channels, manage them from a single dashboard, and provide customers with real-time tracking.",
    },
    {
        icon: <Truck className="h-8 w-8 text-primary" />,
        title: "Shipping & Fulfillment",
        description: "Optimize your shipping strategy with our smart algorithm that selects the most cost-effective carrier for each order. Print labels in bulk and automate your entire fulfillment process.",
    },
    {
        icon: <GitBranch className="h-8 w-8 text-primary" />,
        title: "Powerful Integrations",
        description: "Connect ShipFex to your entire e-commerce ecosystem. We offer one-click integrations with Shopify, Amazon, WooCommerce, and more, plus a robust API for custom solutions.",
    },
    {
        icon: <AppWindow className="h-8 w-8 text-primary" />,
        title: "Mobile Warehouse App",
        description: "Empower your warehouse team with our native mobile app. Manage picking, packing, and receiving on the go with barcode scanning and real-time task updates.",
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Returns Management (RMA)",
        description: "Simplify your returns process. Generate return labels, inspect returned items, and process refunds or exchanges all within the ShipFex platform.",
    },
];

export default function FeaturesPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">A full-stack solution for e-commerce logistics</h1>
        <p className="mx-auto max-w-xl mt-4 text-lg text-muted-foreground">
          From the warehouse floor to your customer's front door, ShipFex has you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
        {featureList.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              {feature.icon}
              <CardTitle className="pt-4">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { PlusCircle, Search, FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { useToast } from "@/hooks/use-toast";
import { exportToCSV } from "@/lib/export-utils";
import { AddProductModal } from "./add-product-modal";
import RoleGuard from "@/components/role-guard";
import { useAuthStore } from "@/store/auth";

// Mock data - in a real app this would come from an API
const inventoryData = [
  { id: 1, sku: "SF-TS-BLK-M", name: "ShipFex T-Shirt Black M", category: "Apparel", stock: 124, reserved: 24, available: 100, price: 19.99 },
  { id: 2, sku: "SF-HOOD-NAV-M", name: "ShipFex Hoodie Navy M", category: "Apparel", stock: 86, reserved: 12, available: 74, price: 49.99 },
  { id: 3, sku: "SF-MUG-11", name: "ShipFex Mug 11oz", category: "Merchandise", stock: 72, reserved: 8, available: 64, price: 9.99 },
  { id: 4, sku: "SF-TS-WHT-L", name: "ShipFex T-Shirt White L", category: "Apparel", stock: 58, reserved: 10, available: 48, price: 19.99 },
  { id: 5, sku: "SF-HAT-BLK", name: "ShipFex Hat Black", category: "Accessories", stock: 42, reserved: 5, available: 37, price: 24.99 },
];

export default function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { user } = useAuthStore();

  const handleExport = (format: "csv" | "excel") => {
    const filename = `inventory-${new Date().toISOString().split("T")[0]}`;
    exportToCSV(inventoryData, filename);
    
    toast({
      title: "Export Started",
      description: `Your ${format.toUpperCase()} export is being prepared.`,
    });
  };

  return (
    <RoleGuard allowedRoles={["Super Admin", "Seller", "Worker", "Warehouse Manager"]} currentPage="/dashboard/inventory">
      <div className="space-y-6">
        <PageHeader 
          title="Inventory" 
          description="Manage your product inventory and stock levels."
        >
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <Button onClick={() => setIsModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                className="pl-8 sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => handleExport("csv")}>
              <FileDown className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport("excel")}>
              <FileDown className="mr-2 h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </PageHeader>

        <Card>
          <CardHeader>
            <CardTitle>Current Stock Levels</CardTitle>
            <CardDescription>
              Overview of your inventory items and availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Reserved</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData
                  .filter(item => 
                    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">{item.stock}</TableCell>
                      <TableCell className="text-right">{item.reserved}</TableCell>
                      <TableCell className="text-right">{item.available}</TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AddProductModal open={isModalOpen} onOpenChange={setIsModalOpen} onProductAdded={() => {}} />
      </div>
    </RoleGuard>
  );
}
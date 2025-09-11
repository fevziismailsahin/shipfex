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
import { AddOrderModal } from "./add-order-modal";
import RoleGuard from "@/components/role-guard";

// Mock data - in a real app this would come from an API
const ordersData = [
  { id: 1, orderNumber: "#ORD-1248", customer: "John Smith", date: "2023-06-15", status: "Shipped", total: 248.00 },
  { id: 2, orderNumber: "#ORD-987", customer: "Sarah Johnson", date: "2023-06-10", status: "Processing", total: 89.50 },
  { id: 3, orderNumber: "#ORD-754", customer: "Mike Williams", date: "2023-06-05", status: "Delivered", total: 156.75 },
  { id: 4, orderNumber: "#ORD-632", customer: "Emily Davis", date: "2023-05-28", status: "Delivered", total: 320.00 },
  { id: 5, orderNumber: "#ORD-512", customer: "Robert Brown", date: "2023-05-22", status: "Cancelled", total: 75.25 },
];

export default function OrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleExport = (format: "csv" | "excel") => {
    const filename = `orders-${new Date().toISOString().split("T")[0]}`;
    exportToCSV(ordersData, filename);
    
    toast({
      title: "Export Started",
      description: `Your ${format.toUpperCase()} export is being prepared.`,
    });
  };

  return (
    <RoleGuard allowedRoles={["Super Admin", "Seller", "Worker", "Warehouse Manager", "Customer"]} currentPage="/dashboard/orders">
      <div className="space-y-6">
        <PageHeader 
          title="Orders" 
          description="Manage customer orders and fulfillment status."
        >
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <Button onClick={() => setIsModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Order
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
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
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Overview of customer orders and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersData
                  .filter(order => 
                    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          {order.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AddOrderModal open={isModalOpen} onOpenChange={setIsModalOpen} onOrderAdded={() => {}} />
      </div>
    </RoleGuard>
  );
}
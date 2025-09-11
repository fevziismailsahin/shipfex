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
import { AddShipmentModal } from "./add-shipment-modal";
import RoleGuard from "@/components/role-guard";

// Mock data - in a real app this would come from an API
const shipmentsData = [
  { id: 1, trackingNumber: "SF123456789", orderNumber: "#ORD-1248", carrier: "FedEx", status: "In Transit", shippedDate: "2023-06-15", estimatedDelivery: "2023-06-17" },
  { id: 2, trackingNumber: "SF987654321", orderNumber: "#ORD-987", carrier: "UPS", status: "Processing", shippedDate: "2023-06-10", estimatedDelivery: "2023-06-12" },
  { id: 3, trackingNumber: "SF456789123", orderNumber: "#ORD-754", carrier: "DHL", status: "Delivered", shippedDate: "2023-06-05", estimatedDelivery: "2023-06-07" },
  { id: 4, trackingNumber: "SF321654987", orderNumber: "#ORD-632", carrier: "USPS", status: "Delivered", shippedDate: "2023-05-28", estimatedDelivery: "2023-05-30" },
  { id: 5, trackingNumber: "SF789123456", orderNumber: "#ORD-512", carrier: "FedEx", status: "Returned", shippedDate: "2023-05-22", estimatedDelivery: "2023-05-24" },
];

export default function ShipmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleExport = (format: "csv" | "excel") => {
    const filename = `shipments-${new Date().toISOString().split("T")[0]}`;
    exportToCSV(shipmentsData, filename);
    
    toast({
      title: "Export Started",
      description: `Your ${format.toUpperCase()} export is being prepared.`,
    });
  };

  return (
    <RoleGuard allowedRoles={["Super Admin", "Seller", "Worker", "Warehouse Manager", "Customer"]} currentPage="/dashboard/shipments">
      <div className="space-y-6">
        <PageHeader 
          title="Shipments" 
          description="Track and manage outgoing shipments."
        >
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <Button onClick={() => setIsModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Shipment
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shipments..."
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
            <CardTitle>Shipment Tracking</CardTitle>
            <CardDescription>
              Overview of outgoing shipments and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking #</TableHead>
                  <TableHead>Order #</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Shipped Date</TableHead>
                  <TableHead>Est. Delivery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipmentsData
                  .filter(shipment => 
                    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.trackingNumber}</TableCell>
                      <TableCell>{shipment.orderNumber}</TableCell>
                      <TableCell>{shipment.carrier}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          {shipment.status}
                        </div>
                      </TableCell>
                      <TableCell>{shipment.shippedDate}</TableCell>
                      <TableCell>{shipment.estimatedDelivery}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AddShipmentModal open={isModalOpen} onOpenChange={setIsModalOpen} onShipmentAdded={() => {}} />
      </div>
    </RoleGuard>
  );
}
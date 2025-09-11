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
import { AddAsnModal } from "./add-asn-modal";
import RoleGuard from "@/components/role-guard";

// Mock data - in a real app this would come from an API
const inboundData = [
  { id: 1, asnNumber: "ASN-2023-001", supplier: "ABC Supplier", expectedDate: "2023-06-20", status: "Pending", items: 120, received: 0 },
  { id: 2, asnNumber: "ASN-2023-002", supplier: "XYZ Manufacturer", expectedDate: "2023-06-18", status: "In Transit", items: 85, received: 0 },
  { id: 3, asnNumber: "ASN-2023-003", supplier: "DEF Distributor", expectedDate: "2023-06-15", status: "Received", items: 200, received: 200 },
  { id: 4, asnNumber: "ASN-2023-004", supplier: "GHI Wholesaler", expectedDate: "2023-06-12", status: "Partially Received", items: 150, received: 120 },
  { id: 5, asnNumber: "ASN-2023-005", supplier: "JKL Importer", expectedDate: "2023-06-10", status: "Received", items: 95, received: 95 },
];

export default function InboundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleExport = (format: "csv" | "excel") => {
    const filename = `inbound-${new Date().toISOString().split("T")[0]}`;
    exportToCSV(inboundData, filename);
    
    toast({
      title: "Export Started",
      description: `Your ${format.toUpperCase()} export is being prepared.`,
    });
  };

  return (
    <RoleGuard allowedRoles={["Super Admin", "Worker", "Warehouse Manager"]} currentPage="/dashboard/inbound">
      <div className="space-y-6">
        <PageHeader 
          title="Inbound" 
          description="Manage incoming shipments and receiving."
        >
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <Button onClick={() => setIsModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create ASN
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inbound..."
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
            <CardTitle>Incoming Shipments</CardTitle>
            <CardDescription>
              Overview of incoming shipments and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ASN #</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Expected Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inboundData
                  .filter(inbound => 
                    inbound.asnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    inbound.supplier.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((inbound) => (
                    <TableRow key={inbound.id}>
                      <TableCell className="font-medium">{inbound.asnNumber}</TableCell>
                      <TableCell>{inbound.supplier}</TableCell>
                      <TableCell>{inbound.expectedDate}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          {inbound.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{inbound.items}</TableCell>
                      <TableCell className="text-right">{inbound.received}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AddAsnModal open={isModalOpen} onOpenChange={setIsModalOpen} onAsnAdded={() => {}} />
      </div>
    </RoleGuard>
  );
}
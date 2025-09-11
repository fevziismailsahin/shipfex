"use client";

import { useState } from "react";
import { CheckCircle, Search, FileDown } from "lucide-react";

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
import { AuthorizeReturnModal } from "./authorize-return-modal";
import RoleGuard from "@/components/role-guard";

// Mock data - in a real app this would come from an API
const returnsData = [
  { id: 1, returnNumber: "RET-2023-001", orderNumber: "#ORD-1248", customer: "John Smith", date: "2023-06-15", status: "Pending", reason: "Damaged Item" },
  { id: 2, returnNumber: "RET-2023-002", orderNumber: "#ORD-987", customer: "Sarah Johnson", date: "2023-06-10", status: "Authorized", reason: "Wrong Item" },
  { id: 3, returnNumber: "RET-2023-003", orderNumber: "#ORD-754", customer: "Mike Williams", date: "2023-06-05", status: "Received", reason: "Changed Mind" },
  { id: 4, returnNumber: "RET-2023-004", orderNumber: "#ORD-632", customer: "Emily Davis", date: "2023-05-28", status: "Processed", reason: "Defective" },
  { id: 5, returnNumber: "RET-2023-005", orderNumber: "#ORD-512", customer: "Robert Brown", date: "2023-05-22", status: "Rejected", reason: "No Reason" },
];

export default function ReturnsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleExport = (format: "csv" | "excel") => {
    const filename = `returns-${new Date().toISOString().split("T")[0]}`;
    exportToCSV(returnsData, filename);
    
    toast({
      title: "Export Started",
      description: `Your ${format.toUpperCase()} export is being prepared.`,
    });
  };

  return (
    <RoleGuard allowedRoles={["Super Admin", "Worker", "Warehouse Manager", "Customer"]} currentPage="/dashboard/returns">
      <div className="space-y-6">
        <PageHeader 
          title="Returns" 
          description="Manage customer returns and refunds."
        >
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <Button onClick={() => setIsModalOpen(true)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Authorize Return
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search returns..."
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
            <CardTitle>Return Requests</CardTitle>
            <CardDescription>
              Overview of customer return requests and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return #</TableHead>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returnsData
                  .filter(returnItem => 
                    returnItem.returnNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    returnItem.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    returnItem.customer.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((returnItem) => (
                    <TableRow key={returnItem.id}>
                      <TableCell className="font-medium">{returnItem.returnNumber}</TableCell>
                      <TableCell>{returnItem.orderNumber}</TableCell>
                      <TableCell>{returnItem.customer}</TableCell>
                      <TableCell>{returnItem.date}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          {returnItem.status}
                        </div>
                      </TableCell>
                      <TableCell>{returnItem.reason}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AuthorizeReturnModal open={isModalOpen} onOpenChange={setIsModalOpen} onReturnAuthorized={() => {}} />
      </div>
    </RoleGuard>
  );
}
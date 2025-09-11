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
import { exportToCSV, exportToExcel } from "@/lib/export-utils";
import { ConnectIntegrationModal } from "./connect-integration-modal";
import { ManageIntegrationModal } from "./manage-integration-modal";
import RoleGuard from "@/components/role-guard";

// Mock data - in a real app this would come from an API
const integrationsData = [
  { id: 1, name: "Shopify", status: "Connected", lastSync: "2023-06-15 14:30" },
  { id: 2, name: "Amazon", status: "Connected", lastSync: "2023-06-15 12:15" },
  { id: 3, name: "WooCommerce", status: "Disconnected", lastSync: "2023-06-10 09:45" },
  { id: 4, name: "eBay", status: "Connected", lastSync: "2023-06-14 16:20" },
  { id: 5, name: "Magento", status: "Error", lastSync: "2023-06-12 11:30" },
];

export default function IntegrationsPage() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleExport = (format: "csv" | "excel") => {
    const filename = `integrations-${new Date().toISOString().split("T")[0]}`;
    if (format === "csv") {
      exportToCSV(integrationsData, filename);
    } else {
      exportToExcel(integrationsData, filename);
    }
    
    toast({
      title: "Export Started",
      description: `Your ${format.toUpperCase()} export is being prepared.`,
    });
  };

  return (
    <RoleGuard allowedRoles={["Super Admin", "Seller"]} currentPage="/dashboard/integrations">
      <div className="space-y-6">
        <PageHeader 
          title="Integrations" 
          description="Connect and manage your e-commerce platforms."
        >
          <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
            <Button onClick={() => setIsConnectModalOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Connect Platform
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search integrations..."
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
            <CardTitle>Connected Platforms</CardTitle>
            <CardDescription>
              Overview of your connected e-commerce platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {integrationsData
                  .filter(integration => 
                    integration.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell className="font-medium">{integration.name}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          {integration.status}
                        </div>
                      </TableCell>
                      <TableCell>{integration.lastSync}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => setIsManageModalOpen(true)}>
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <ConnectIntegrationModal 
          open={isConnectModalOpen} 
          onOpenChange={setIsConnectModalOpen} 
          integrationName="Shopify" 
          onConnect={() => {}} 
        />
        <ManageIntegrationModal 
          open={isManageModalOpen} 
          onOpenChange={setIsManageModalOpen} 
          integrationName="Shopify" 
          onDisconnect={() => {}} 
        />
      </div>
    </RoleGuard>
  );
}
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { shipmentData } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { File, PlusCircle } from "lucide-react";

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "Pending Pickup": "outline",
  "In Transit": "secondary",
  "Delivered": "default",
};

export default function ShipmentsPage() {
  return (
    <>
      <PageHeader title="Shipments" description="Track all your outgoing shipments.">
        <Button size="sm" variant="outline" className="gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Generate Labels
          </span>
        </Button>
      </PageHeader>
       <Card>
        <CardHeader>
          <CardTitle>All Shipments</CardTitle>
          <CardDescription>
            A list of all shipments processed through your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Tracking #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipmentData.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.orderId}</TableCell>
                  <TableCell>{shipment.carrier}</TableCell>
                  <TableCell>
                    <a href="#" className="underline hover:text-primary">
                        {shipment.tracking}
                    </a>
                  </TableCell>
                  <TableCell>{shipment.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[shipment.status] || 'default'}>
                      {shipment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

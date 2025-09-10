import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import { inboundData } from "@/lib/data";

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "In Transit": "outline",
  "Receiving": "secondary",
  "Received": "default",
};


export default function InboundPage() {
  return (
    <>
      <PageHeader title="Inbound Shipments" description="Manage incoming inventory from your suppliers.">
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create ASN
          </span>
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Advance Shipping Notices (ASNs)</CardTitle>
          <CardDescription>
            A list of all inbound shipments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ASN ID</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Expected Date</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inboundData.map((asn) => (
                <TableRow key={asn.id}>
                  <TableCell className="font-medium">{asn.id}</TableCell>
                  <TableCell>{asn.from}</TableCell>
                  <TableCell>{asn.expected}</TableCell>
                  <TableCell>{asn.received || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[asn.status] || 'default'}>
                      {asn.status}
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

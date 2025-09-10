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
import { returnsData } from "@/lib/data";

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "Pending Authorization": "outline",
  "Authorized": "secondary",
  "Received": "secondary",
  "Restocked": "default",
};

export default function ReturnsPage() {
  return (
    <>
      <PageHeader title="Returns (RMA)" description="Manage customer returns and dispositions.">
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Authorize Return
          </span>
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Return Merchandise Authorizations</CardTitle>
          <CardDescription>
            A list of all customer returns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RMA ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returnsData.map((rma) => (
                <TableRow key={rma.id}>
                  <TableCell className="font-medium">{rma.id}</TableCell>
                  <TableCell>{rma.orderId}</TableCell>
                  <TableCell>{rma.customer}</TableCell>
                  <TableCell>{rma.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[rma.status] || 'default'}>
                      {rma.status}
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

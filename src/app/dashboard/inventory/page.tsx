import { PlusCircle, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { inventoryData } from "@/lib/data";

export default function InventoryPage() {
  return (
    <>
      <PageHeader title="Inventory" description="Manage your products and stock levels.">
        <Button size="sm" variant="outline" className="gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            A list of all products in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Stock</TableHead>
                <TableHead className="text-right">Allocated</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead>Warehouse</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge variant={item.stock > 0 ? "default" : "destructive"}>
                      {item.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{item.stock}</TableCell>
                  <TableCell className="text-right">{item.allocated}</TableCell>
                  <TableCell className="text-right font-semibold">{item.available}</TableCell>
                  <TableCell>{item.warehouse}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

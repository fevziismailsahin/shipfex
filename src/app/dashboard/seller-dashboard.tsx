"use client";

import Link from "next/link";
import { ArrowUpRight, Package, ShoppingCart, DollarSign, Percent, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { kpiData, recentActivity } from "@/lib/data";
import { PageHeader } from "@/components/page-header";

const iconMap = {
  'Orders Today': <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
  'Revenue Today': <DollarSign className="h-4 w-4 text-muted-foreground" />,
  'Pending Shipments': <Package className="h-4 w-4 text-muted-foreground" />,
  'On-time Shipping': <Percent className="h-4 w-4 text-muted-foreground" />,
};

export default function SellerDashboard() {
  return (
    <>
      {/* Visual indicator for debugging */}
      <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded text-sm">
        Role: Seller
      </div>
      
      <PageHeader title="Seller Dashboard" description="Manage your products, orders, and sales performance." />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {iconMap[kpi.title as keyof typeof iconMap]}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to manage your business
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/orders">
                  <ShoppingCart className="h-5 w-5" />
                  <span>New Order</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/inventory">
                  <Package className="h-5 w-5" />
                  <span>Add Product</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/shipments">
                  <TrendingUp className="h-5 w-5" />
                  <span>View Sales</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/integrations">
                  <ArrowUpRight className="h-5 w-5" />
                  <span>Connect Store</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              A log of the latest events in your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="font-medium">{activity.type}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {activity.details}
                      </div>
                    </TableCell>
                    <TableCell>{activity.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>
              Best selling products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Units Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">ShipFex T-Shirt Black M</div>
                    <div className="text-sm text-muted-foreground">SF-TS-BLK-M</div>
                  </TableCell>
                  <TableCell>SF-TS-BLK-M</TableCell>
                  <TableCell className="text-right">124</TableCell>
                  <TableCell className="text-right">$2,480.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">ShipFex Hoodie Navy M</div>
                    <div className="text-sm text-muted-foreground">SF-HOOD-NAV-M</div>
                  </TableCell>
                  <TableCell>SF-HOOD-NAV-M</TableCell>
                  <TableCell className="text-right">86</TableCell>
                  <TableCell className="text-right">$4,300.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">ShipFex Mug 11oz</div>
                    <div className="text-sm text-muted-foreground">SF-MUG-11</div>
                  </TableCell>
                  <TableCell>SF-MUG-11</TableCell>
                  <TableCell className="text-right">72</TableCell>
                  <TableCell className="text-right">$720.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">ShipFex T-Shirt White L</div>
                    <div className="text-sm text-muted-foreground">SF-TS-WHT-L</div>
                  </TableCell>
                  <TableCell>SF-TS-WHT-L</TableCell>
                  <TableCell className="text-right">58</TableCell>
                  <TableCell className="text-right">$1,160.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Key metrics for your business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Order Fulfillment Rate</p>
                <p className="text-xs text-muted-foreground">Percentage of orders fulfilled on time</p>
              </div>
              <Badge variant="default">98.5%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Inventory Turnover</p>
                <p className="text-xs text-muted-foreground">Times inventory sold and replaced</p>
              </div>
              <Badge variant="secondary">4.2x</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Customer Retention</p>
                <p className="text-xs text-muted-foreground">Percentage of repeat customers</p>
              </div>
              <Badge variant="default">72.3%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Average Order Value</p>
                <p className="text-xs text-muted-foreground">Average amount per order</p>
              </div>
              <Badge variant="secondary">$89.42</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
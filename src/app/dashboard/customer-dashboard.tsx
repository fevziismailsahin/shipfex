"use client";

import Link from "next/link";
import { ArrowUpRight, Package, ShoppingCart, Truck, MapPin, Clock, CheckCircle } from "lucide-react";

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

const customerKpiData = [
  { title: 'Active Orders', value: '3', change: '+1', changeType: 'increase' },
  { title: 'Total Spent', value: '$1,240', change: '+$80', changeType: 'increase' },
  { title: 'Pending Shipments', value: '2', change: '0', changeType: 'neutral' },
  { title: 'On-time Delivery', value: '95%', change: '+2%', changeType: 'increase' },
];

const iconMap = {
  'Active Orders': <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
  'Total Spent': <Package className="h-4 w-4 text-muted-foreground" />,
  'Pending Shipments': <Truck className="h-4 w-4 text-muted-foreground" />,
  'On-time Delivery': <CheckCircle className="h-4 w-4 text-muted-foreground" />,
};

export default function CustomerDashboard() {
  return (
    <>
      {/* Visual indicator for debugging */}
      <div className="mb-4 p-2 bg-orange-100 text-orange-800 rounded text-sm">
        Role: Customer
      </div>
      
      <PageHeader title="Customer Dashboard" description="Track your orders, shipments, and account information." />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {customerKpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {iconMap[kpi.title as keyof typeof iconMap]}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.changeType === 'increase' ? 'text-green-500' : kpi.changeType === 'decrease' ? 'text-red-500' : 'text-muted-foreground'}`}>
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
                Common tasks for managing your orders
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
                <Link href="/dashboard/shipments">
                  <Truck className="h-5 w-5" />
                  <span>Track Shipments</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/returns">
                  <ArrowUpRight className="h-5 w-5" />
                  <span>Request Return</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/settings">
                  <MapPin className="h-5 w-5" />
                  <span>Shipping Address</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Shipment Status</CardTitle>
            <CardDescription>
              Track your active shipments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Est. Delivery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">#ORD-1248</div>
                    <div className="text-sm text-muted-foreground">3 items</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">In Transit</Badge>
                  </TableCell>
                  <TableCell>Tomorrow</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">#ORD-987</div>
                    <div className="text-sm text-muted-foreground">1 item</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Processing</Badge>
                  </TableCell>
                  <TableCell>2 days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">#ORD-754</div>
                    <div className="text-sm text-muted-foreground">2 items</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">Delivered</Badge>
                  </TableCell>
                  <TableCell>Completed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              Your recent orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">#ORD-1248</div>
                  </TableCell>
                  <TableCell>2023-06-15</TableCell>
                  <TableCell className="text-right">$248.00</TableCell>
                  <TableCell>
                    <Badge variant="default">Shipped</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">#ORD-987</div>
                  </TableCell>
                  <TableCell>2023-06-10</TableCell>
                  <TableCell className="text-right">$89.50</TableCell>
                  <TableCell>
                    <Badge variant="default">Delivered</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">#ORD-754</div>
                  </TableCell>
                  <TableCell>2023-06-05</TableCell>
                  <TableCell className="text-right">$156.75</TableCell>
                  <TableCell>
                    <Badge variant="default">Delivered</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">#ORD-632</div>
                  </TableCell>
                  <TableCell>2023-05-28</TableCell>
                  <TableCell className="text-right">$320.00</TableCell>
                  <TableCell>
                    <Badge variant="default">Delivered</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Membership Tier</p>
                <p className="text-xs text-muted-foreground">Premium benefits active</p>
              </div>
              <Badge variant="default">Premium</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Preferred Shipping</p>
                <p className="text-xs text-muted-foreground">Standard (2-3 days)</p>
              </div>
              <Badge variant="secondary">Standard</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
              </div>
              <Badge variant="default">Visa</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-xs text-muted-foreground">Email and SMS enabled</p>
              </div>
              <Badge variant="secondary">Enabled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
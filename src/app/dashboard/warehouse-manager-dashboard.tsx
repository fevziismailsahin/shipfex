"use client";

import Link from "next/link";
import { ArrowUpRight, Package, ShoppingCart, Truck, Warehouse, Users, TrendingUp } from "lucide-react";

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

const warehouseKpiData = [
  { title: 'Total Inventory', value: '12,450', change: '+2.1%', changeType: 'increase' },
  { title: 'Pending Shipments', value: '82', change: '-2.1%', changeType: 'decrease' },
  { title: 'Workers Active', value: '24', change: '+1', changeType: 'increase' },
  { title: 'On-time Shipping', value: '98.5%', change: '+0.5%', changeType: 'increase' },
];

const iconMap = {
  'Total Inventory': <Package className="h-4 w-4 text-muted-foreground" />,
  'Pending Shipments': <Truck className="h-4 w-4 text-muted-foreground" />,
  'Workers Active': <Users className="h-4 w-4 text-muted-foreground" />,
  'On-time Shipping': <TrendingUp className="h-4 w-4 text-muted-foreground" />,
};

export default function WarehouseManagerDashboard() {
  return (
    <>
      {/* Visual indicator for debugging */}
      <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-sm">
        Role: Warehouse Manager
      </div>
      
      <PageHeader title="Warehouse Manager Dashboard" description="Oversee warehouse operations, inventory, and team performance." />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {warehouseKpiData.map((kpi) => (
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
                Common tasks to manage warehouse operations
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/inbound">
                  <ArrowUpRight className="h-5 w-5" />
                  <span>Create ASN</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/inventory">
                  <Warehouse className="h-5 w-5" />
                  <span>Manage Inventory</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/shipments">
                  <Truck className="h-5 w-5" />
                  <span>Process Shipments</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/returns">
                  <Package className="h-5 w-5" />
                  <span>Handle Returns</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              A log of the latest warehouse events.
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
            <CardTitle>Warehouse Inventory Status</CardTitle>
            <CardDescription>
              Current stock levels by warehouse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Total Items</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">WH-EAST-1</div>
                  </TableCell>
                  <TableCell>New York, NY</TableCell>
                  <TableCell className="text-right">5,240</TableCell>
                  <TableCell className="text-right">4,890</TableCell>
                  <TableCell>
                    <Badge variant="default">Operational</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">WH-WEST-1</div>
                  </TableCell>
                  <TableCell>Los Angeles, CA</TableCell>
                  <TableCell className="text-right">3,870</TableCell>
                  <TableCell className="text-right">3,620</TableCell>
                  <TableCell>
                    <Badge variant="default">Operational</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">WH-CENTRAL-1</div>
                  </TableCell>
                  <TableCell>Chicago, IL</TableCell>
                  <TableCell className="text-right">3,340</TableCell>
                  <TableCell className="text-right">3,120</TableCell>
                  <TableCell>
                    <Badge variant="default">Operational</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>
              Worker productivity metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Picking Accuracy</p>
                <p className="text-xs text-muted-foreground">Percentage of correctly picked items</p>
              </div>
              <Badge variant="default">99.2%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Packing Speed</p>
                <p className="text-xs text-muted-foreground">Average items packed per hour</p>
              </div>
              <Badge variant="secondary">124/hr</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Shipping Time</p>
                <p className="text-xs text-muted-foreground">Average time to process shipments</p>
              </div>
              <Badge variant="default">2.3 hrs</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">On-time Departure</p>
                <p className="text-xs text-muted-foreground">Percentage of on-time truck departures</p>
              </div>
              <Badge variant="secondary">97.8%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
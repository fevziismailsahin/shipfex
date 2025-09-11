"use client";

import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart } from "recharts";
import { ArrowUpRight, Package, ShoppingCart, DollarSign, Percent, Users, TrendingUp, Building, Truck } from "lucide-react";

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
import { kpiData, recentActivity, chartData } from "@/lib/data";
import { PageHeader } from "@/components/page-header";

const adminKpiData = [
  { title: 'Total Revenue', value: '$1.2M', change: '+12.4%', changeType: 'increase' },
  { title: 'Active Sellers', value: '142', change: '+8', changeType: 'increase' },
  { title: 'Total Shipments', value: '12,482', change: '+15.2%', changeType: 'increase' },
  { title: 'System Uptime', value: '99.9%', change: '+0.1%', changeType: 'increase' },
];

const iconMap = {
  'Total Revenue': <DollarSign className="h-4 w-4 text-muted-foreground" />,
  'Active Sellers': <Users className="h-4 w-4 text-muted-foreground" />,
  'Total Shipments': <Truck className="h-4 w-4 text-muted-foreground" />,
  'System Uptime': <Building className="h-4 w-4 text-muted-foreground" />,
};

export default function SuperAdminDashboard() {
  // Generate additional chart data for different metrics
  const revenueData = chartData.map((item, index) => ({
    ...item,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  }));

  const shippingData = chartData.map((item, index) => ({
    ...item,
    shipments: Math.floor(Math.random() * 100) + 20,
  }));

  return (
    <>
      {/* Visual indicator for debugging */}
      <div className="mb-4 p-2 bg-purple-100 text-purple-800 rounded text-sm">
        Role: Super Admin
      </div>
      
      <PageHeader title="Super Admin Dashboard" description="System-wide overview and management controls." />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {adminKpiData.map((kpi) => (
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
              <CardTitle>System Management</CardTitle>
              <CardDescription>
                Administrative controls and system settings
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/users">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/analytics">
                  <TrendingUp className="h-5 w-5" />
                  <span>System Analytics</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/settings">
                  <Building className="h-5 w-5" />
                  <span>System Settings</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center">
                <Link href="/dashboard/integrations">
                  <ArrowUpRight className="h-5 w-5" />
                  <span>API Integrations</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>
              A log of the latest system events.
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
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>
              System performance and usage metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Response Time</TableHead>
                  <TableHead className="text-right">Uptime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Order Processing</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">Operational</Badge>
                  </TableCell>
                  <TableCell className="text-right">124ms</TableCell>
                  <TableCell className="text-right">99.98%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Inventory Sync</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">Operational</Badge>
                  </TableCell>
                  <TableCell className="text-right">86ms</TableCell>
                  <TableCell className="text-right">99.95%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Shipping API</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">Operational</Badge>
                  </TableCell>
                  <TableCell className="text-right">210ms</TableCell>
                  <TableCell className="text-right">99.92%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Database</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">Operational</Badge>
                  </TableCell>
                  <TableCell className="text-right">42ms</TableCell>
                  <TableCell className="text-right">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>
              Platform user statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Users</p>
                <p className="text-xs text-muted-foreground">All registered users</p>
              </div>
              <Badge variant="default">1,248</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active Sellers</p>
                <p className="text-xs text-muted-foreground">Users with active stores</p>
              </div>
              <Badge variant="secondary">142</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Warehouse Managers</p>
                <p className="text-xs text-muted-foreground">Warehouse personnel</p>
              </div>
              <Badge variant="default">12</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Workers</p>
                <p className="text-xs text-muted-foreground">Warehouse workers</p>
              </div>
              <Badge variant="secondary">86</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Monthly revenue over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Shipping Volume</CardTitle>
            <CardDescription>
              Monthly shipments over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shippingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="shipments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
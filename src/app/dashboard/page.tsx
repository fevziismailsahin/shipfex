"use client";

import Link from "next/link";
import { ArrowUpRight, Package, ShoppingCart, DollarSign, Percent } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

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
import { kpiData, chartData, recentActivity } from "@/lib/data";
import { PageHeader } from "@/components/page-header";

const iconMap = {
  'Orders Today': <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
  'Revenue Today': <DollarSign className="h-4 w-4 text-muted-foreground" />,
  'Pending Shipments': <Package className="h-4 w-4 text-muted-foreground" />,
  'On-time Shipping': <Percent className="h-4 w-4 text-muted-foreground" />,
};

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back! Here's a snapshot of your business today." />
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
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Order Volume</CardTitle>
            <CardDescription>
              Total orders placed over the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
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
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
    </>
  );
}

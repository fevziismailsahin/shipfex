"use client";

import Link from "next/link";
import { ArrowUpRight, Package, ShoppingCart, Truck, Users, TrendingUp, CheckCircle } from "lucide-react";

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

const workerKpiData = [
  { title: 'Tasks Completed', value: '24', change: '+4', changeType: 'increase' },
  { title: 'Accuracy Rate', value: '99.2%', change: '+0.3%', changeType: 'increase' },
  { title: 'Hours Worked', value: '8.5', change: '-0.5', changeType: 'decrease' },
  { title: 'Performance Score', value: '4.8/5', change: '+0.2', changeType: 'increase' },
];

const iconMap = {
  'Tasks Completed': <CheckCircle className="h-4 w-4 text-muted-foreground" />,
  'Accuracy Rate': <TrendingUp className="h-4 w-4 text-muted-foreground" />,
  'Hours Worked': <Truck className="h-4 w-4 text-muted-foreground" />,
  'Performance Score': <Users className="h-4 w-4 text-muted-foreground" />,
};

export default function WorkerDashboard() {
  return (
    <>
      {/* Visual indicator for debugging */}
      <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
        Role: Worker
      </div>
      
      <PageHeader title="Worker Dashboard" description="Your personal workspace and task management." />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {workerKpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {iconMap[kpi.title as keyof typeof iconMap]}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs ${kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Task Queue</CardTitle>
              <CardDescription>
                Your assigned tasks for today
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Pick Order #1248</p>
                  <p className="text-sm text-muted-foreground">Zone A - 12 items</p>
                </div>
                <Button size="sm">Start</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Pack Shipment #987</p>
                  <p className="text-sm text-muted-foreground">3 items - Express</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Process Return #45</p>
                  <p className="text-sm text-muted-foreground">Electronics - Inspection</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Work Assignments</CardTitle>
            <CardDescription>
              Today's work distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Inventory Audit</div>
                    <div className="text-sm text-muted-foreground">Zone B</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell>Medium</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Loading Dock</div>
                    <div className="text-sm text-muted-foreground">Truck #14</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">In Progress</Badge>
                  </TableCell>
                  <TableCell>High</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Quality Check</div>
                    <div className="text-sm text-muted-foreground">Returns</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                  <TableCell>Low</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Your productivity and quality metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">Today</TableHead>
                  <TableHead className="text-right">This Week</TableHead>
                  <TableHead className="text-right">Target</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Pick Accuracy</div>
                  </TableCell>
                  <TableCell className="text-right">99.5%</TableCell>
                  <TableCell className="text-right">99.2%</TableCell>
                  <TableCell className="text-right">99.0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Tasks Completed</div>
                  </TableCell>
                  <TableCell className="text-right">24</TableCell>
                  <TableCell className="text-right">118</TableCell>
                  <TableCell className="text-right">120</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">On-time Start</div>
                  </TableCell>
                  <TableCell className="text-right">100%</TableCell>
                  <TableCell className="text-right">98%</TableCell>
                  <TableCell className="text-right">95%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Safety Incidents</div>
                  </TableCell>
                  <TableCell className="text-right">0</TableCell>
                  <TableCell className="text-right">0</TableCell>
                  <TableCell className="text-right">0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Status</CardTitle>
            <CardDescription>
              Your team's current status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Team Performance</p>
                <p className="text-xs text-muted-foreground">Overall team metrics</p>
              </div>
              <Badge variant="default">Excellent</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Team Leader</p>
                <p className="text-xs text-muted-foreground">Sarah Johnson</p>
              </div>
              <Badge variant="secondary">Available</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Shift Status</p>
                <p className="text-xs text-muted-foreground">Morning shift</p>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Break Time</p>
                <p className="text-xs text-muted-foreground">Next in 2 hours</p>
              </div>
              <Badge variant="secondary">Scheduled</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
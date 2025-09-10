"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import { Textarea } from "@/components/ui/textarea";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  companyName: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function ProfileForm() {
  const { toast } = useToast();
  const { user } = useAuthStore();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      companyName: "ShipFex Inc.",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}

const warehouseFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    address: z.string().min(5, "Address is required")
})
type WarehouseFormValues = z.infer<typeof warehouseFormSchema>;

function WarehousesTab() {
    const { toast } = useToast();
    const form = useForm<WarehouseFormValues>();

    function onSubmit(data: WarehouseFormValues) {
        console.log(data);
        toast({ title: "Warehouse Added", description: `Warehouse "${data.name}" has been added.` });
        form.reset({name: "", address: ""});
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Existing Warehouses</CardTitle>
                    <CardDescription>Your current warehouse locations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">WH-EAST-1</h4>
                        <p className="text-sm text-muted-foreground">123 Fulfillment Dr, Edison, NJ 08817</p>
                    </div>
                     <div>
                        <h4 className="font-semibold">WH-WEST-1</h4>
                        <p className="text-sm text-muted-foreground">456 Logistics Ave, Las Vegas, NV 89115</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Add Warehouse</CardTitle>
                    <CardDescription>Add a new warehouse location to your network.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control} name="name" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Warehouse Name</FormLabel>
                                    <FormControl><Input placeholder="e.g., WH-CENTRAL-1" {...field}/></FormControl>
                                </FormItem>
                            )}/>
                             <FormField control={form.control} name="address" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl><Textarea placeholder="123 Main St..." {...field}/></FormControl>
                                </FormItem>
                            )}/>
                            <Button type="submit">Add Warehouse</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your account, warehouses, and notification preferences." />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                This is how others will see you on the site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="warehouses">
          <WarehousesTab />
        </TabsContent>
        <TabsContent value="notifications">
            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Notification settings coming soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

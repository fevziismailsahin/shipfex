"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  rmaId: z.string().min(1, "RMA ID is required"),
  orderId: z.string().min(1, "Order ID is required"),
  customer: z.string().min(1, "Customer name is required"),
  date: z.string().min(1, "Date is required"),
  status: z.string().min(1, "Please select a status"),
});

interface AuthorizeReturnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReturnAuthorized: () => void;
}

export function AuthorizeReturnModal({ open, onOpenChange, onReturnAuthorized }: AuthorizeReturnModalProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rmaId: "",
      orderId: "",
      customer: "",
      date: new Date().toISOString().split('T')[0], // Today's date as default
      status: "Authorized",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would be an API call
    console.log("Authorizing return:", values);
    
    // Show success toast
    toast({
      title: "Return Authorized",
      description: `Successfully authorized return ${values.rmaId}.`,
    });
    
    // Close the modal
    onOpenChange(false);
    
    // Reset the form
    form.reset({
      rmaId: "",
      orderId: "",
      customer: "",
      date: new Date().toISOString().split('T')[0],
      status: "Authorized",
    });
    
    // Notify parent component
    onReturnAuthorized();
  }

  const statuses = ["Pending Authorization", "Authorized", "Received", "Restocked"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authorize Return</DialogTitle>
          <DialogDescription>
            Create a Return Merchandise Authorization for a customer return.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rmaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RMA ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter RMA ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter order ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter customer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Authorize Return</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
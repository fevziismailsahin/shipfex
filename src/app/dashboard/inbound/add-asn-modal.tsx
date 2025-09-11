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
  asnId: z.string().min(1, "ASN ID is required"),
  from: z.string().min(1, "Supplier name is required"),
  expectedDate: z.string().min(1, "Expected date is required"),
  status: z.string().min(1, "Please select a status"),
});

interface AddAsnModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAsnAdded: () => void;
}

export function AddAsnModal({ open, onOpenChange, onAsnAdded }: AddAsnModalProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asnId: "",
      from: "",
      expectedDate: new Date().toISOString().split('T')[0], // Today's date as default
      status: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would be an API call
    console.log("Adding ASN:", values);
    
    // Show success toast
    toast({
      title: "ASN Created",
      description: `Successfully created ASN ${values.asnId}.`,
    });
    
    // Close the modal
    onOpenChange(false);
    
    // Reset the form
    form.reset({
      asnId: "",
      from: "",
      expectedDate: new Date().toISOString().split('T')[0],
      status: "",
    });
    
    // Notify parent component
    onAsnAdded();
  }

  const statuses = ["In Transit", "Receiving", "Received"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New ASN</DialogTitle>
          <DialogDescription>
            Create an Advance Shipping Notice for incoming inventory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="asnId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ASN ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ASN ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter supplier name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Date</FormLabel>
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
              <Button type="submit">Create ASN</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
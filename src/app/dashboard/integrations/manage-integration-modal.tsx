"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ManageIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integrationName: string;
  onDisconnect: () => void;
}

export function ManageIntegrationModal({ 
  open, 
  onOpenChange, 
  integrationName,
  onDisconnect 
}: ManageIntegrationModalProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    syncOrders: true,
    syncInventory: true,
    syncCustomers: false,
    autoFulfill: true,
  });

  const handleSave = () => {
    // In a real app, this would be an API call to save settings
    console.log(`Saving settings for ${integrationName}:`, settings);
    
    // Show success toast
    toast({
      title: "Settings Saved",
      description: `Successfully saved settings for ${integrationName}.`,
    });
    
    // Close the modal
    onOpenChange(false);
  };

  const handleDisconnect = () => {
    // In a real app, this would be an API call to disconnect the integration
    console.log(`Disconnecting ${integrationName}`);
    
    // Show success toast
    toast({
      title: "Integration Disconnected",
      description: `Successfully disconnected ${integrationName} from your account.`,
    });
    
    // Notify parent component
    onDisconnect();
    
    // Close the modal
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage {integrationName}</DialogTitle>
          <DialogDescription>
            Configure settings and manage your connection to {integrationName}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>
                Control what data is synchronized between {integrationName} and ShipFex.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sync-orders">Sync Orders</Label>
                <Switch
                  id="sync-orders"
                  checked={settings.syncOrders}
                  onCheckedChange={(checked) => setSettings({...settings, syncOrders: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sync-inventory">Sync Inventory</Label>
                <Switch
                  id="sync-inventory"
                  checked={settings.syncInventory}
                  onCheckedChange={(checked) => setSettings({...settings, syncInventory: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sync-customers">Sync Customers</Label>
                <Switch
                  id="sync-customers"
                  checked={settings.syncCustomers}
                  onCheckedChange={(checked) => setSettings({...settings, syncCustomers: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-fulfill">Auto Fulfill Orders</Label>
                <Switch
                  id="auto-fulfill"
                  checked={settings.autoFulfill}
                  onCheckedChange={(checked) => setSettings({...settings, autoFulfill: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="destructive" onClick={handleDisconnect}>
            Disconnect
          </Button>
          <div className="flex gap-2 ml-auto">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ConnectIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integrationName: string;
  onConnect: (credentials: any) => void;
}

export function ConnectIntegrationModal({ 
  open, 
  onOpenChange, 
  integrationName,
  onConnect 
}: ConnectIntegrationModalProps) {
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    apiKey: "",
    apiSecret: "",
  });

  const handleConnect = () => {
    // In a real app, this would be an API call to connect the integration
    console.log(`Connecting ${integrationName} with credentials:`, credentials);
    
    // Show success toast
    toast({
      title: "Integration Connected",
      description: `Successfully connected ${integrationName} to your account.`,
    });
    
    // Notify parent component
    onConnect(credentials);
    
    // Close the modal
    onOpenChange(false);
    
    // Reset the form
    setCredentials({
      apiKey: "",
      apiSecret: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect {integrationName}</DialogTitle>
          <DialogDescription>
            Enter your API credentials to connect {integrationName} to ShipFex.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              placeholder="Enter your API key"
              value={credentials.apiKey}
              onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiSecret">API Secret</Label>
            <Input
              id="apiSecret"
              type="password"
              placeholder="Enter your API secret"
              value={credentials.apiSecret}
              onChange={(e) => setCredentials({...credentials, apiSecret: e.target.value})}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Don't have API credentials? Visit the {integrationName} developer portal to generate them.
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleConnect}>
            Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { integrationCategories } from "@/lib/data";
import { GitBranch, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = integrationCategories
    .map(category => ({
      ...category,
      integrations: category.integrations.filter(integration =>
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(category => category.integrations.length > 0);

  return (
    <>
      <PageHeader title="Integrations" description="Connect your sales channels and other services.">
         <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search integrations..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      </PageHeader>
      
      <div className="space-y-12">
        {filteredCategories.map((category) => (
          <div key={category.title}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.integrations.map((integration) => (
                <Card key={integration.name} className="flex flex-col">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="bg-muted p-3 rounded-md">
                      {integration.logo ? (
                        <Image src={integration.logo} alt={integration.name} width={24} height={24} className="dark:invert" />
                      ) : (
                        <GitBranch className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <CardTitle>{integration.name}</CardTitle>
                    </div>
                  </CardHeader>
                   <CardContent className="flex-1">
                     <CardDescription className="line-clamp-3">{integration.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    {integration.connected ? (
                      <Button variant="outline" className="w-full">
                        Manage
                      </Button>
                    ) : (
                      <Button className="w-full">
                        Connect
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
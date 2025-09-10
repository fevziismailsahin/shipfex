"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Package, Truck, GitBranch, AppWindow, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const features = [
  { icon: <Box className="h-8 w-8 text-primary" />, title: "Inventory", description: "Real-time, multi-location inventory tracking." },
  { icon: <Package className="h-8 w-8 text-primary" />, title: "Orders", description: "Centralized order management from all channels." },
  { icon: <Truck className="h-8 w-8 text-primary" />, title: "Shipments", description: "Automated label generation and smart carrier selection." },
  { icon: <GitBranch className="h-8 w-8 text-primary" />, title: "Integrations", description: "Connect with Shopify, Amazon, and more." },
  { icon: <AppWindow className="h-8 w-8 text-primary" />, title: "Mobile App", description: "Manage warehouse operations on the go." },
  { icon: <Users className="h-8 w-8 text-primary" />, title: "FBA & FBM Prep", description: "Expert prep services for Amazon sellers." },
];

const testimonials = [
  { quote: "ShipFex has been a total game-changer. Our fulfillment is 3x faster and we have a clear, real-time view of our entire inventory. The simplicity and power is unmatched.", author: "Sarah J.", title: "CEO, Modern Home Goods" },
  { quote: "The platform is incredibly intuitive and the integration with our Shopify store was seamless. We were up and running in less than a day.", author: "Michael C.", title: "Founder, Tech Gadgets Co." },
  { quote: "As a high-volume seller on Amazon, managing FBM was a nightmare. ShipFex automated everything from order import to label printing.", author: "David L.", title: "Amazon Power Seller" },
];

const integrationLogos = [
  { name: "Amazon", src: "/icons/images/amazon-2-logo-svgrepo-com.svg" },
  { name: "Shopify", src: "/icons/images/shopify-color-svgrepo-com.svg" },
  { name: "eBay", src: "/icons/images/ebay-svgrepo-com.svg" },
  { name: "Walmart", src: "/icons/images/walmart-logo-svgrepo-com.svg" },
  { name: "Etsy", src: "/icons/images/etsy-logo-svgrepo-com.svg" },
];

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-40 lg:py-56 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80 pb-4">
          Simplify Your Fulfillment
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mt-4">
          Manage Inventory, Orders, Shipments, and Integrations effortlessly.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="rounded-full text-base font-semibold">
            <Link href="/signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full text-base font-semibold">
            <Link href="/pricing">Explore Pricing</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center gap-4 group">
              <div className="p-5 rounded-2xl bg-muted/50 dark:bg-muted/30 border transition-all duration-300 group-hover:-translate-y-1">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Logos Section */}
      <section className="w-full py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-muted-foreground">Seamless Integrations</h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll gap-10 hover:pause-scroll">
            {integrationLogos.concat(integrationLogos).map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="h-10 object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/30 dark:bg-muted/20">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trusted by Growing Brands</h2>
            <p className="max-w-2xl text-muted-foreground md:text-lg">
              Hear what our customers have to say about scaling with ShipFex.
            </p>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full p-6 border bg-background/50 dark:bg-background/30 transition-shadow duration-300">
                    <CardContent className="flex flex-col h-full justify-between p-0">
                      <p className="text-base mb-6">"{testimonial.quote}"</p>
                      <div className="text-left">
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "$299",
    period: "/month",
    description: "For new businesses getting their first orders out the door.",
    features: [
      "Up to 100 orders/month",
      "2 warehouse locations",
      "Basic inventory management",
      "Email support",
    ],
    cta: "Choose Starter",
  },
  {
    name: "Growth",
    price: "$799",
    period: "/month",
    description: "For growing brands that need to scale their fulfillment.",
    features: [
      "Up to 1000 orders/month",
      "5 warehouse locations",
      "Advanced inventory & order management",
      "FBA & FBM Prep",
      "Priority support",
    ],
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale operations with complex needs.",
    features: [
      "Unlimited orders",
      "Global warehouse network",
      "Dedicated account manager",
      "Custom integrations",
      "24/7 support",
    ],
    cta: "Contact Sales",
  },
];

export default function PricingPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, transparent pricing</h1>
        <p className="mx-auto max-w-xl mt-4 text-lg text-muted-foreground">
          Choose the plan that's right for your business. No hidden fees, no surprises.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
            {plan.popular && <div className="bg-primary text-primary-foreground text-center text-sm font-semibold py-1 rounded-t-lg">Most Popular</div>}
            <CardHeader className="items-center text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={plan.name === 'Enterprise' ? '/contact' : '/signup'}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

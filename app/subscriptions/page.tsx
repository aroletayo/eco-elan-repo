"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePricing } from "@/hooks/use-pricing";
import PageLoader from "@/components/PageLoader";
import {
  CheckCircle2,
  ArrowRight,
  Star,
  Leaf,
  Calendar,
  CreditCard,
  Sparkles,
  Home,
  Plane,
  Clock,
} from "lucide-react";

const howItWorks = [
  {
    step: 1,
    icon: Calendar,
    title: "Choose Your Plan",
    description: "Select Weekly, Bi-Weekly, Monthly, or Airbnb subscription.",
  },
  {
    step: 2,
    icon: Clock,
    title: "Set Your Schedule",
    description: "Pick your preferred days and times that work for you.",
  },
  {
    step: 3,
    icon: CreditCard,
    title: "Confirm & Pay",
    description: "Fully online, secure booking and payment process.",
  },
  {
    step: 4,
    icon: Sparkles,
    title: "Relax & Enjoy",
    description:
      "Our professional team handles everything. Adjust or cancel anytime.",
  },
];

export default function SubscriptionsPage() {
  const { pricing, loading } = usePricing();

  if (loading) {
    return <PageLoader />;
  }

  const plans = [
    {
      icon: Sparkles,
      name: "Fresh Weekly Plan",
      tagline: "🌱 Ideal for families, pet owners, busy homes",
      frequency: "Once per week",
      popular: false,
      prices: [
        {
          type: "1 Bedroom",
          price: `$${Math.round(pricing.subscriptions.weekly * 1.18)}`,
        },
        {
          type: "2 Bedroom",
          price: `$${Math.round(pricing.subscriptions.weekly * 1.45)}`,
        },
        {
          type: "3 Bedroom House",
          price: `$${Math.round(pricing.subscriptions.weekly * 1.82)}`,
        },
        {
          type: "4 Bedroom House",
          price: `$${Math.round(pricing.subscriptions.weekly * 2.59)}`,
        },
      ],
      cta: "Join Weekly Plan",
    },
    {
      icon: Leaf,
      name: "Eco Essential Bi-Weekly",
      tagline: "🌿 Regular households, condos, professionals",
      frequency: "Every two weeks",
      discount: "10% off standard rates",
      popular: true,
      prices: [
        {
          type: "1 Bedroom",
          price: `$${Math.round(pricing.subscriptions.biweekly * 1.18)}`,
        },
        {
          type: "2 Bedroom",
          price: `$${Math.round(pricing.subscriptions.biweekly * 1.45)}`,
        },
        {
          type: "3 Bedroom House",
          price: `$${Math.round(pricing.subscriptions.biweekly * 1.82)}`,
        },
        {
          type: "4 Bedroom House",
          price: `$${Math.round(pricing.subscriptions.biweekly * 2.59)}`,
        },
      ],
      cta: "Join Bi-Weekly Plan",
    },
    {
      icon: Home,
      name: "Pure Monthly Plan",
      tagline: "🍃 Light-traffic homes, minimalists, seniors",
      frequency: "Once per month",
      popular: false,
      prices: [
        {
          type: "1 Bedroom",
          price: `$${Math.round(pricing.subscriptions.monthly * 1.18)}`,
        },
        {
          type: "2 Bedroom",
          price: `$${Math.round(pricing.subscriptions.monthly * 1.45)}`,
        },
        {
          type: "3 Bedroom House",
          price: `$${Math.round(pricing.subscriptions.monthly * 1.82)}`,
        },
        {
          type: "4 Bedroom House",
          price: `$${Math.round(pricing.subscriptions.monthly * 2.59)}`,
        },
      ],
      cta: "Join Monthly Plan",
    },
    {
      icon: Plane,
      name: "Airbnb Host Subscription",
      tagline: "🌟 Perfect for vacation rental hosts",
      frequency: "Per booking / Weekly / Custom",
      popular: false,
      prices: [
        {
          type: "Studio",
          price: `$${Math.round(pricing.services.airbnb * 0.67)}`,
        },
        {
          type: "1 Bedroom",
          price: `$${Math.round(pricing.services.airbnb * 0.83)}`,
        },
        {
          type: "2 Bedroom",
          price: `$${Math.round(pricing.services.airbnb * 1.17)}`,
        },
        {
          type: "3 Bedroom",
          price: `$${Math.round(pricing.services.airbnb * 1.42)}`,
        },
      ],
      features: [
        "Linen changes & laundry (optional)",
        "Priority scheduling for check-ins",
        "Eco-friendly, plant-based products",
      ],
      cta: "Get Airbnb Quote",
    },
  ];

  const addOns = [
    { name: "Inside Fridge", price: `$${pricing.addons.fridge}` },
    { name: "Inside Oven", price: `$${pricing.addons.oven}` },
    { name: "Windows (Interior)", price: `$${pricing.addons.windows} each` },
    { name: "Inside Cabinets", price: `$${pricing.addons.cabinets}` },
    { name: "Laundry", price: `$${pricing.addons.laundry}` },
    { name: "Balcony Cleaning", price: `$${pricing.addons.balcony}` },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-eco-green-light to-background">
        <div className="container-custom text-center">
          <h1 className=" p-4 font-display text-5xl md:text-6xl font-bold text-primary mb-6">
            Our Membership Plans
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Choose the perfect eco-friendly cleaning plan for your home.
            Flexible scheduling, transparent pricing, cancel anytime.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="section-padding -mt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative hover:ring-2 hover:ring-accent hover:transition-all hover:duration-100 hover:ease-in-out hover:cursor-pointer bg-card rounded-3xl p-8 shadow-eco-md card-hover opacity-0 animate-slide-up stagger-${
                  index + 1
                } ${plan.popular ? "ring-2 ring-accent" : ""} `}
                style={{ animationFillMode: "forwards" }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-eco-green-light flex items-center justify-center shrink-0">
                    <plan.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-primary">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {plan.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-secondary rounded-full text-sm font-medium text-foreground">
                    {plan.frequency}
                  </span>
                  {plan.discount && (
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      {plan.discount}
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {plan.prices.map((price) => (
                    <div
                      key={price.type}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">
                        {price.type}
                      </span>
                      <span className="font-display text-xl font-bold text-primary">
                        {price.price}
                      </span>
                    </div>
                  ))}
                </div>

                {plan.features && (
                  <div className="space-y-2 mb-6 md:absolute md:top-[90px] md:right-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  variant={plan.popular ? "accent" : "default"}
                  className="w-full"
                  size="lg"
                  asChild
                >
                  <Link href="/contact">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Commitment Discount */}
          <div className="mt-12 bg-secondary rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-primary mb-3">
              Optional Commitment Discount
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Clients who commit to 3+ months of recurring service may receive
              an extra discount (e.g., Weekly Plan 25% off). Commitment is
              optional — most clients prefer flexible, cancel-anytime plans.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
              Simple Process
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-card shadow-eco-md flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold text-sm flex items-center justify-center">
                    {step.step}
                  </span>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute left-full top-1/2 w-full h-0.5 bg-border -translate-y-1/2 ml-4" />
                  )}
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-On Services */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                Customize Your Clean
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                Add-On Services
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Enhance your subscription with additional services. These
                add-ons can be added to any recurring clean.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {addOns.map((addon) => (
                  <div
                    key={addon.name}
                    className="flex justify-between items-center p-4 bg-secondary rounded-xl"
                  >
                    <span className="text-foreground font-medium">
                      {addon.name}
                    </span>
                    <span className="text-accent font-bold">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-eco-navy-light rounded-3xl p-10 text-center">
              <h3 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                Not Sure Which Plan is Right?
              </h3>
              <p className="text-primary-foreground/80 mb-8">
                Contact us for a personalized recommendation based on your home
                and lifestyle.
              </p>
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">
                  Get Personalized Help
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-accent">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-accent-foreground mb-6">
            Start Your Eco-Friendly Clean Today
          </h2>
          <p className="text-accent-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Join hundreds of happy customers enjoying cleaner, healthier homes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link href="/contact">
                Book Your First Clean
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

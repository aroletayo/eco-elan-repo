"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePricing } from "@/hooks/use-pricing";
import { useContent } from "@/hooks/use-content";
import PageLoader from "@/components/PageLoader";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Leaf,
  Home,
  Plane,
  Building2,
} from "lucide-react";

const cleaningKitchen = "/assets/cleaning-kitchen.webp";
const cleaningBathroom = "/assets/cleaning-bathroom.webp";
const cleaningOffice = "/assets/Ecoelan-services.webp";

export default function ServicesPage() {
  const { pricing, loading: pricingLoading } = usePricing();
  const { content, loading: contentLoading } = useContent();

  if (pricingLoading || contentLoading) {
    return <PageLoader />;
  }

  const services = [
    {
      icon: Sparkles,
      title: content.services.standardTitle,
      description: content.services.standardDescription,
      includes: [
        "Dusting & wiping surfaces",
        "Eco-friendly kitchen clean",
        "Non-toxic bathroom sanitize",
        "Floors vacuumed & mopped",
        "Beds tidied",
        "Trash removal",
        "Pet-safe products only",
      ],
      prices: [
        { type: "Studio", price: `$${pricing.services.standard}` },
        {
          type: "1 Bedroom",
          price: `$${Math.round(pricing.services.standard * 1.18)}`,
        },
        {
          type: "2 Bedroom",
          price: `$${Math.round(pricing.services.standard * 1.45)}`,
        },
        {
          type: "3 Bedroom",
          price: `$${Math.round(pricing.services.standard * 1.82)}`,
        },
        {
          type: "4 Bedroom House",
          price: `$${Math.round(pricing.services.standard * 2.59)}`,
        },
      ],
    },
    {
      icon: Leaf,
      title: content.services.deepTitle,
      description: content.services.deepDescription,
      includes: [
        "Everything in Standard Clean plus:",
        "Baseboards & trims",
        "Light fixtures & switches",
        "Behind small appliances",
        "Eco scrubbing for tough areas",
        "Deep bathroom sanitization",
        "Window sills & frames",
      ],
      prices: [
        { type: "1 Bedroom", price: `$${pricing.services.deep}` },
        {
          type: "2 Bedroom",
          price: `$${Math.round(pricing.services.deep * 1.3)}`,
        },
        {
          type: "3 Bedroom House",
          price: `$${Math.round(pricing.services.deep * 1.55)}`,
        },
        {
          type: "4 Bedroom House",
          price: `$${Math.round(pricing.services.deep * 1.8)}`,
        },
      ],
    },
    {
      icon: Home,
      title: "Eco Move-In/Move-Out Cleaning",
      description: "Complete top-to-bottom luxury clean for empty homes.",
      includes: [
        "Inside fridge",
        "Inside oven",
        "Inside cabinets",
        "Baseboards",
        "Door frames",
        "Full room sanitization",
        "Chemical-free products throughout",
      ],
      prices: [
        { type: "1 Bedroom", price: `$${pricing.services.moveinout}` },
        {
          type: "2 Bedroom",
          price: `$${Math.round(pricing.services.moveinout * 1.17)}`,
        },
        {
          type: "3 Bedroom",
          price: `$${Math.round(pricing.services.moveinout * 1.5)}`,
        },
        {
          type: "4 Bedroom House",
          price: `$${Math.round(pricing.services.moveinout * 1.75)}`,
        },
      ],
    },
    {
      icon: Plane,
      title: content.services.airbnbTitle,
      description: content.services.airbnbDescription,
      includes: [
        "Bed linen change",
        "Laundry (optional)",
        "Restocking essentials",
        "Kitchen reset",
        "Bathroom refresh",
        "Sanitizing high-touch areas",
      ],
      prices: [
        { type: "Studio/1 Bedroom", price: `$${pricing.services.airbnb}` },
        {
          type: "2 Bedroom",
          price: `$${Math.round(pricing.services.airbnb * 1.25)}`,
        },
        {
          type: "3 Bedroom",
          price: `$${Math.round(pricing.services.airbnb * 1.46)}`,
        },
      ],
    },
    {
      icon: Building2,
      title: "Eco Office Cleaning",
      description: "A healthier workspace with non-toxic products.",
      includes: [
        "Desks & surfaces",
        "Washrooms",
        "Floors",
        "Kitchenettes",
        "Garbage removal",
        "Eco sanitizing",
      ],
      prices: [
        { type: "Hourly Rate", price: `$${pricing.services.office}/hr` },
      ],
    },
  ];

  const addOns = [
    { name: "Inside Fridge", price: `$${pricing.addons.fridge}` },
    { name: "Inside Oven", price: `$${pricing.addons.oven}` },
    { name: "Windows Interior", price: `$${pricing.addons.windows} each` },
    { name: "Inside Cabinets", price: `$${pricing.addons.cabinets}` },
    { name: "Laundry", price: `$${pricing.addons.laundry}` },
    { name: "Balcony Cleaning", price: `$${pricing.addons.balcony}` },
  ];

  const serviceImages = [
    cleaningKitchen,
    cleaningBathroom,
    cleaningOffice,
    cleaningKitchen,
    cleaningOffice,
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-b from-eco-green-light to-background">
        <div className="container-custom text-center relative z-10">
          <h1 className=" p-4 font-display text-5xl md:text-6xl font-bold text-primary mb-6">
            Premium <span className="text-accent">Eco Cleaning </span> Services
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8">
            From regular maintenance to deep cleaning, we have got your space
            covered with eco-conscious care and premium quality.
          </p>

          <Button variant="accent" size="lg" asChild>
            <Link href="/book">
              Book a Service
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Gallery */}
      <section className="py-8 px-5 bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-4">
            <div className="group rounded-2xl overflow-hidden aspect-video cursor-pointer">
              <img
                src={cleaningKitchen}
                alt="Kitchen cleaning"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>

            <div className="group rounded-2xl overflow-hidden aspect-video cursor-pointer">
              <img
                src={cleaningBathroom}
                alt="Bathroom cleaning"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>

            <div className="group rounded-2xl overflow-hidden aspect-video cursor-pointer">
              <img
                src={cleaningOffice}
                alt="Office cleaning"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom space-y-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`grid lg:grid-cols-2 gap-12 items-start ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-display text-3xl font-bold text-primary">
                    {service.title}
                  </h2>
                </div>

                <p className="text-muted-foreground text-lg mb-8">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  <p className="font-semibold text-foreground">Includes:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                        <span className="text-muted-foreground text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="accent" asChild>
                  <Link href="/book">
                    Book This Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div
                className={`bg-card rounded-3xl p-8 shadow-eco-md ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <h3 className="font-display text-xl font-semibold text-primary mb-6">
                  Pricing
                </h3>
                <div className="space-y-4">
                  {service.prices.map((price) => (
                    <div
                      key={price.type}
                      className="flex justify-between items-center py-3 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">
                        {price.type}
                      </span>
                      <span className="font-display text-2xl font-bold text-accent">
                        {price.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
              Customize Your Clean
            </span>
            <h2 className="font-display text-4xl font-bold text-primary mb-4">
              Add-On Services
            </h2>
            <p className="text-muted-foreground">
              Enhance any cleaning with these additional services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="bg-card rounded-2xl p-6 text-center shadow-eco-sm card-hover"
              >
                <p className="font-medium text-foreground mb-2">{addon.name}</p>
                <p className="text-accent font-display text-xl font-bold">
                  {addon.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Book Your Eco Clean?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Experience the difference of premium eco-friendly cleaning.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="lg" asChild>
              <Link href="/book">
                Book Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/subscriptions">View Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

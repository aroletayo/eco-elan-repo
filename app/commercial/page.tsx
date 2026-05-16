import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  Building2,
  Users,
  Calendar,
  Shield,
  Sparkles,
  FileCheck,
  Phone,
  Leaf,
} from "lucide-react";

const heroCommercial = "/assets/hero-commercial.webp";

const services = [
  "Daily / Weekly / Biweekly Cleaning",
  "Eco-safe disinfection",
  "Washrooms sanitization",
  "Office kitchens & lunchrooms",
  "Floor care (vacuum + mop)",
  "Trash removal",
  "High-touch points sanitation",
  "Reception + waiting area cleaning",
  "Dusting + wiping surfaces",
];

const benefits = [
  {
    icon: Leaf,
    title: "Healthier Environment",
    description:
      "Chemical-free cleaning products that are safe for your employees and clients.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedules",
    description:
      "Daily, weekly, or custom cleaning plans that fit your business needs.",
  },
  {
    icon: Users,
    title: "Trained Professionals",
    description:
      "Professionally trained, insured, and background-checked cleaning staff.",
  },
  {
    icon: FileCheck,
    title: "Custom Cleaning Plans",
    description:
      "Tailored cleaning checklists created specifically for your workspace.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description:
      "Complete peace of mind with comprehensive insurance coverage.",
  },
  {
    icon: Sparkles,
    title: "Satisfaction Guarantee",
    description:
      "Transparent pricing, detailed invoices, and 100% satisfaction guaranteed.",
  },
];

export default function CommercialPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] md:min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroCommercial}
            alt="Professional commercial office cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
        </div>

        <div className="p-5 container-custom relative z-10 ">
          <div className="max-w-5xl animate-fade-in">
            <h1 className=" font-display text-[3rem] md:text-[70px] font-bold text-primary leading-tight mb-6">
              Commercial <span className="text-accent">Eco Cleaning</span>{" "}
              Services
            </h1>

            <p className="text-lg  max-w-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Cleaner workspaces. Healthier employees. A greener way to maintain
              your business. We use plant-based, non-toxic products that create
              a fresh, healthy environment.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                className="min-w-[250px] group"
                variant="hero"
                size="lg"
                asChild
              >
                <Link href="/contact">
                  Request a Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                className="min-w-[250px] group"
                variant="hero-outline"
                size="lg"
                asChild
              >
                <a href="tel:+1234567890">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Include */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                What We Offer
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                Commercial Cleaning Services Include
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                All services performed with 100% eco-friendly, plant-based
                cleaning products.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-eco-lg">
              <h3 className="font-display text-2xl font-bold text-primary mb-6">
                Office Cleaning Pricing
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-border">
                  <span className="text-foreground">Hourly Rate</span>
                  <span className="font-display text-2xl font-bold text-accent">
                    $50–$65/hr
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Pricing varies based on facility size, frequency, and specific
                  requirements.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="font-medium text-foreground">We provide:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Free on-site walkthrough
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Custom checklist for your business
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Long-term & short-term contracts
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Monthly, weekly, or daily options
                  </li>
                </ul>
              </div>

              <Button variant="accent" className="w-full" size="lg" asChild>
                <Link href="/contact">
                  Request a Commercial Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
              Why Choose eco-elan
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Why Businesses Choose Us
            </h2>
            <p className="text-muted-foreground text-lg">
              Partner with a cleaning service that cares about your workplace
              and the environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`bg-card rounded-2xl p-8 shadow-eco-sm card-hover opacity-0 animate-slide-up stagger-${
                  index + 1
                }`}
                style={{ animationFillMode: "forwards" }}
              >
                <div className="w-14 h-14 rounded-xl bg-eco-green-light flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">
              Industries We Serve
            </h2>
            <p className="text-muted-foreground text-lg">
              From offices to retail spaces, we provide eco-friendly cleaning
              for all business types.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Offices",
              "Medical Clinics",
              "Retail Stores",
              "Showrooms",
              "Co-working Spaces",
              "Restaurants",
              "Gyms & Studios",
              "Educational Facilities",
            ].map((industry) => (
              <span
                key={industry}
                className="px-6 py-3 bg-card rounded-full text-foreground font-medium shadow-eco-sm"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Make Your Workplace Greener?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Get a free on-site walkthrough and custom cleaning plan for your
            business.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link href="/contact">
              Request a Commercial Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

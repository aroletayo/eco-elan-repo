"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Sparkles,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Building2,
  Home,
  Plane,
  ThumbsUp,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  HoverScale,
  AnimatedCounter,
  PageTransition,
} from "@/components/animations";
import { motion } from "framer-motion";
import { staggerItem } from "@/components/animations";
import HeroCarousel from "@/components/HeroCarousel";
import ServiceSection from "@/components/layout/ServiceSection";
import { useContent } from "@/hooks/use-content";
import PageLoader from "@/components/PageLoader";

const cleaningLivingroom = "/assets/Ecoelan-herosection.webp";
const teamPortrait = "/assets/Ecoelan-teams.webp";
const happyFamily = "/assets/happy-family.webp";
const ecoProducts = "/assets/Ecoelan-ourproduct.webp";

const services = [
  {
    icon: Sparkles,
    title: "Standard Eco Cleaning",
    description:
      "A refreshing maintenance clean using eco-safe, plant-based products.",
    price: "From $110",
  },
  {
    icon: Leaf,
    title: "Deep Eco Cleaning",
    description:
      "A full-detail, premium clean for seasonal resets or first-time clients.",
    price: "From $200",
  },
  {
    icon: Home,
    title: "Move-In/Move-Out",
    description: "Complete top-to-bottom luxury clean for empty homes.",
    price: "From $240",
  },
  {
    icon: Plane,
    title: "Airbnb Turnover",
    description: "Fast, consistent, toxin-free turnover service for hosts.",
    price: "From $120",
  },
  {
    icon: Building2,
    title: "Office Cleaning",
    description: "A healthier workspace with non-toxic, eco-friendly products.",
    price: "From $50/hr",
  },
];

const features = [
  {
    icon: Leaf,
    title: "100% Eco-Friendly",
    description:
      "Plant-based, biodegradable, non-toxic products safe for your family.",
  },
  {
    icon: Shield,
    title: "Insured & Vetted",
    description: "Background-checked, professionally trained cleaning staff.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Weekly, bi-weekly, monthly plans. Cancel anytime.",
  },
  {
    icon: Star,
    title: "Satisfaction Guarantee",
    description: "We're not happy until you are. 100% satisfaction guaranteed.",
  },
];

const testimonials = [
  {
    name: "Amanda L.",
    text: "The clean was amazing and I love that everything they use is eco-safe for my kids. Highly recommend Eco Elan!",
    rating: 5,
  },
  {
    name: "Ryan P.",
    text: "Professional, friendly, and the place smelled fresh without chemicals. Perfect service.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    text: "Finally found a cleaning service that cares about the environment as much as I do. Top quality!",
    rating: 5,
  },
];

export default function Index() {
  const { content, loading } = useContent();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Hero Carousel Section */}
        <HeroCarousel content={content.hero} />

        {/* Services Section */}
        <ServiceSection content={content.services} />

        {/* Why Choose Us Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="left">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                  Why Choose Us
                </h2>
                <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                  Eco-Friendly Cleaning You Can Trust
                </span>

                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  At Eco Elan, we believe a clean environment should be healthy
                  for your family and gentle on the planet. Our team is fully
                  trained, background-checked, and committed to delivering
                  exceptional results.
                </p>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {features.map((feature) => (
                    <motion.div
                      key={feature.title}
                      variants={staggerItem}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 rounded-lg bg-eco-green-light flex items-center justify-center shrink-0">
                        <feature.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-semibold text-primary mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </FadeIn>

              <FadeIn direction="right" delay={0.2} className="relative">
                <HoverScale scale={1.02}>
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-eco-lg">
                    <img
                      src={cleaningLivingroom}
                      alt="Clean eco-friendly home"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </HoverScale>
                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-8 -left-8 bg-card rounded-2xl p-6 shadow-eco-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-display text-3xl font-bold text-primary">
                        <AnimatedCounter from={0} to={100} suffix="%" />
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Eco Products
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-eco-green">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Testimonials
              </h2>

              <span className="inline-block text-gray-300 font-medium text-sm uppercase tracking-wider mb-4">
                What Our Clients Say
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className={`bg-card rounded-2xl p-8 shadow-eco-sm opacity-0 animate-slide-up stagger-${
                    index + 1
                  }`}
                  style={{ animationFillMode: "forwards" }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-display text-lg font-semibold text-primary">
                    — {testimonial.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="/contact">See More Reviews</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="section-padding">
          <div className="container-custom text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Service Areas
            </h2>
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
              Proudly Serving the GTA
            </span>

            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              Toronto • Mississauga • Brampton • Etobicoke • North York •
              Scarborough • Vaughan • Ajax • Oakville • Whitby • Pickering •
              Oshawa • Burlington • Hamilton • Markham • New Market • Richmond
              hill
            </p>
            <Button variant="accent" asChild>
              <Link href="/area-check">
                Check Your Area
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-eco-lg">
                  <img
                    src={teamPortrait}
                    alt="Our professional cleaning team"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-6 shadow-eco-lg">
                  <p className="font-display text-4xl font-bold">4+</p>
                  <p className="text-sm opacity-90">Years Experience</p>
                </div>
              </div>
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                  Meet Our Team
                </h2>
                <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                  Professional, Trusted Cleaners
                </span>

                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Our team is carefully selected, background-checked, and
                  professionally trained to deliver exceptional cleaning
                  results. We treat every home with the care and respect it
                  deserves.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-eco-green-light flex items-center justify-center">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">
                      Background Checked
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-eco-green-light flex items-center justify-center">
                      <Star className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">
                      Highly Rated
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-eco-green-light flex items-center justify-center">
                      <ThumbsUp className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">
                      Fully Insured
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-eco-green-light flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">
                      Always On Time
                    </span>
                  </div>
                </div>
                <Button variant="accent" asChild>
                  <Link href="/about">
                    Learn More About Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Happy Customers Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                  Safe for Your Family & Pets
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Our 100% plant-based, non-toxic products mean you never have
                  to worry about harmful chemicals around your loved ones. Enjoy
                  a spotless home that's truly safe for everyone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link href="/book">
                      Book Your First Clean
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="rounded-3xl overflow-hidden shadow-eco-lg">
                  <img
                    src={happyFamily}
                    alt="Happy family in a clean home"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-eco-lg border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Leaf className="w-8 h-8 text-accent" />
                    <span className="font-display text-xl font-bold text-primary">
                      100% Safe
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    For kids, pets & allergies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="section-padding bg-eco-green-light">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-3xl overflow-hidden group">
                <img
                  src={ecoProducts}
                  alt="Eco-friendly cleaning products"
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h2 className="font-display text-4xl font-bold text-primary mb-4">
                  Our Products
                </h2>
                <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                  Premium Eco-Friendly Products
                </span>

                <p className="text-muted-foreground text-lg mb-6">
                  We exclusively use plant-based, biodegradable, and
                  eco-certified cleaning products. No harsh chemicals, no
                  toxins, no compromises.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-foreground">
                    <Leaf className="w-5 h-5 text-accent" />
                    Plant-based & biodegradable
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <Leaf className="w-5 h-5 text-accent" />
                    Non-toxic & chemical-free
                  </li>
                  <li className="flex items-center gap-3 text-foreground">
                    <Leaf className="w-5 h-5 text-accent" />
                    Safe for sensitive skin
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
          <div className="container-custom text-center relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready for a Cleaner, Greener Home?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Book your first eco-friendly clean today and experience the Eco
              Elan difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                asChild
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
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
    </PageTransition>
  );
}

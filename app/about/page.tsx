"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Heart,
  Eye,
  Shield,
  Sparkles,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  PageTransition,
} from "@/components/animations";
import { motion } from "framer-motion";
import { staggerItem } from "@/components/animations";

const aboutContent = {
  title: "About eco-elan",
  description:
    "We are a team of professional cleaners dedicated to providing eco-friendly cleaning services.",
  mission:
    "Our mission is to provide exceptional cleaning while protecting the environment.",
};

const values = [
  {
    icon: Leaf,
    title: "Eco Responsibility",
    description: "We use safe, plant-based, biodegradable products.",
  },
  {
    icon: Sparkles,
    title: "Quality",
    description:
      "Every clean is carried out with care, precision, and consistency.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Clear communication, upfront pricing, and no surprises.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Carefully vetted staff who respect your home and privacy.",
  },
  {
    icon: Heart,
    title: "Care",
    description: "We treat your space as if it were our own.",
  },
];

const faqs = [
  {
    question: "Are your products non-toxic?",
    answer:
      "Yes. We use plant-based, biodegradable, eco-certified cleaning products that are completely safe for your family and pets.",
  },
  {
    question: "Is eco cleaning as effective?",
    answer:
      "Absolutely! Our eco-friendly products clean deeply and effectively without the harmful chemicals found in traditional cleaners.",
  },
  {
    question: "Is it safe for kids, pets, and allergies?",
    answer:
      "100% yes. Our products are specifically chosen to be safe for children, pets, and those with sensitivities or allergies.",
  },
  {
    question: "Can I customize my cleaning plan?",
    answer:
      "Yes! We offer flexible scheduling and can create a custom cleaning checklist based on your specific needs and preferences.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="section-padding bg-[#081c15]">
          <div className="container-custom">
            <FadeIn className="max-w-3xl mx-auto text-center">
              <span className="mb-5 inline-block rounded-full border border-[#74c69d]/35 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#e9c46a]">
                Our Story
              </span>
              <h1 className="p-5 font-display text-5xl md:text-6xl font-bold text-white mb-6">
                {aboutContent.title}
              </h1>

              <p className="text-white/75 text-lg md:text-xl leading-relaxed">
                {aboutContent.description}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                  Our Story
                </span>
                <h2 className="font-display text-4xl font-bold text-primary mb-6">
                  Premium Eco Cleaning for a Better Tomorrow
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We combine premium-quality cleaning with eco-conscious
                    practices to deliver a fresh, natural, and elevated cleaning
                    experience for homes and businesses across the Greater
                    Toronto Area.
                  </p>
                  <p>
                    Our team is fully trained, background-checked, insured, and
                    committed to delivering exceptional results — with zero
                    harsh chemicals, zero toxins, and zero compromises.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-secondary rounded-2xl">
                  <h3 className="font-display text-xl font-semibold text-primary mb-3">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground italic">
                    "{aboutContent.mission}"
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-2xl p-6 shadow-eco-sm text-center">
                  <p className="font-display text-4xl font-bold text-accent mb-2">
                    100%
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Eco-Friendly Products
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-eco-sm text-center">
                  <p className="font-display text-4xl font-bold text-accent mb-2">
                    5.0
                  </p>
                  <p className="text-muted-foreground text-sm">Star Rating</p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-eco-sm text-center">
                  <p className="font-display text-4xl font-bold text-accent mb-2">
                    500+
                  </p>
                  <p className="text-muted-foreground text-sm">Happy Clients</p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-eco-sm text-center">
                  <p className="font-display text-4xl font-bold text-accent mb-2">
                    GTA
                  </p>
                  <p className="text-muted-foreground text-sm">Service Area</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-secondary">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                What We Stand For
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
                Our Values
              </h2>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  className="bg-card rounded-2xl p-6 text-center shadow-eco-sm card-hover"
                >
                  <div className="w-14 h-14 rounded-xl bg-eco-green-light flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                  FAQ
                </span>
                <h2 className="font-display text-4xl font-bold text-primary mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have questions? we have got answers. If you don't find what
                  you're looking for, feel free to reach out to us directly.
                </p>
                <Button variant="accent" asChild>
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="bg-card rounded-2xl p-6 shadow-eco-sm"
                  >
                    <h4 className="font-display text-lg font-semibold text-primary mb-3 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                      {faq.question}
                    </h4>
                    <p className="text-muted-foreground pl-8">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="section-padding bg-secondary">
          <div className="container-custom text-center">
            <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
              Where We Serve
            </span>
            <h2 className="font-display text-4xl font-bold text-primary mb-6">
              Service Areas
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Proudly serving homes and businesses across the Greater Toronto
              Area.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "Toronto",
                "Mississauga",
                "Brampton",
                "Etobicoke",
                "North York",
                "Scarborough",
                "Vaughan",
              ].map((area) => (
                <span
                  key={area}
                  className="px-6 py-3 bg-card rounded-full text-foreground font-medium shadow-eco-sm"
                >
                  {area}
                </span>
              ))}
            </div>

            <Button variant="accent" asChild>
              <Link href="/area-check">
                Check Your Area 
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-[#081c15]">
          <div className="container-custom text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Experience eco-elan?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Book your first eco-friendly clean and see the difference for
              yourself.
            </p>
            <Button variant="accent" size="lg" asChild>
              <Link href="/contact">
                Book Your Clean
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

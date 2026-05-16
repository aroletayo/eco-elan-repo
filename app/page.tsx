"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  Check,
  Home,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
  Trees,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BookingLeadForm } from "@/components/BookingLeadForm";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    name: "Regular House Cleaning",
    description: "Consistent weekly, bi-weekly, or monthly eco home care.",
    popular: true,
  },
  {
    icon: Sparkles,
    name: "Deep Cleaning",
    description: "Detailed reset cleans for kitchens, bathrooms, and buildup.",
  },
  {
    icon: ShieldCheck,
    name: "Move In / Move Out Cleaning",
    description: "Top-to-bottom turnover cleaning before the next chapter.",
  },
  {
    icon: Trees,
    name: "Eco Lawn Care",
    description: "Sustainable outdoor care that keeps your curb appeal clean.",
  },
  {
    icon: Building2,
    name: "Commercial Cleaning",
    description: "Healthier offices, clinics, retail, and shared workspaces.",
  },
  {
    icon: SprayCan,
    name: "Window Cleaning",
    description: "Crystal-clear glass without harsh chemical residue.",
  },
];

const features = [
  {
    icon: Leaf,
    title: "100% Non-Toxic Products",
    text: "Safe for children, pets, and the planet. Every product we use is certified eco-friendly.",
  },
  {
    icon: ShieldCheck,
    title: "Trained & Trusted Team",
    text: "Background-checked, insured professionals who treat your home like their own.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Scheduling",
    text: "Book online in minutes. Same-day and weekend appointments available.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction Guaranteed",
    text: "Not happy? We come back and make it right. No questions asked.",
  },
];

const steps = [
  {
    title: "Book Online",
    text: "Choose your service and preferred time. Takes under 2 minutes.",
  },
  {
    title: "We Show Up",
    text: "Our eco-certified team arrives on time with all supplies included.",
  },
  {
    title: "Enjoy the Clean",
    text: "Come home to a spotless, fresh-smelling space - guilt-free.",
  },
];

const plans = [
  {
    name: "Basic",
    cadence: "Bi-Weekly",
    items: ["Standard cleaning", "Eco products included", "Same team every visit"],
    cta: "Get Started",
  },
  {
    name: "Popular",
    cadence: "Weekly",
    popular: true,
    items: [
      "Everything in Basic",
      "Priority scheduling",
      "Free window cleaning monthly",
      "15% discount",
    ],
    cta: "Get Started",
  },
  {
    name: "Premium",
    cadence: "Custom Plan",
    items: [
      "Everything in Popular",
      "Commercial available",
      "Dedicated account manager",
      "Custom schedule",
    ],
    cta: "Contact Us",
  },
];

const testimonials = [
  {
    text: "eco-elan transformed our home. Everything smells fresh and clean without the harsh chemical smell. Our kids and dog love it.",
    name: "Sarah M., Toronto ON",
  },
  {
    text: "I've tried many cleaning services. eco-elan is the only one that uses products I actually trust around my family.",
    name: "James K., Mississauga ON",
  },
  {
    text: "Reliable, professional, and genuinely eco-friendly. Worth every penny. We've been subscribers for 8 months.",
    name: "Linda T., Etobicoke ON",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="bg-[#f8f9f4]">
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#081c15] px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <Image
          src="/assets/hero-home.webp"
          alt="eco-elan premium eco cleaning"
          fill
          priority
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,21,0.98),rgba(8,28,21,0.82),rgba(8,28,21,0.28))]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12 }}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex rounded-full border border-[#74c69d]/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#74c69d] backdrop-blur"
            >
              Ontario's #1 Eco Cleaning Service
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-6xl font-black italic leading-[0.94] tracking-normal sm:text-7xl lg:text-8xl"
            >
              A Cleaner Home.
              <br />
              A Healthier Planet.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-lg leading-8 text-white/78"
            >
              Professional eco-friendly cleaning and lawn care services across
              Ontario. Safe for your family, gentle on the earth.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                asChild
                className="h-14 rounded-full bg-[#2d6a4f] px-7 text-base font-bold text-white shadow-[0_0_34px_rgba(116,198,157,0.35)] hover:bg-[#245840]"
              >
                <Link href="/book">
                  Book Your First Clean <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-full border-white/35 bg-white/5 px-7 text-base font-bold text-white hover:bg-white hover:text-[#081c15]"
              >
                <Link href="/services">View Our Services</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-white/75"
            >
              <span>4.9 Rating</span>
              <span>500+ Happy Clients</span>
              <span>100% Eco Products</span>
              <span>Ontario CA</span>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="mt-5 inline-flex rounded-full bg-[#e9c46a] px-5 py-2 text-sm font-black text-[#081c15]"
            >
              Spring Special: 20% OFF First Service
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-lg border border-white/15 bg-white p-4 text-[#081c15] shadow-[0_30px_100px_rgba(0,0,0,0.32)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <Image
                  src="/assets/cleaning-livingroom.webp"
                  alt="eco-elan service preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d6a4f]">
                    Premium Home Reset
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold">
                    Non-toxic, hotel-level clean
                  </p>
                </div>
                <Leaf className="h-10 w-10 text-[#2d6a4f]" />
              </div>
            </motion.div>
            <StatCard className="-left-6 top-16" value="500+" label="clients served" />
            <StatCard className="-right-4 top-1/2" value="100%" label="eco products" />
            <StatCard className="bottom-10 left-8" value="4.9" label="rating" />
          </motion.div>
        </div>
      </section>

      <SectionIntro
        label="Services"
        title="Everything Your Home Needs, Naturally Clean"
      />
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
          className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.article
              variants={fadeUp}
              key={service.name}
              className="group rounded-lg border border-[#74c69d]/20 bg-[#081c15] p-7 text-white shadow-eco-md transition hover:-translate-y-1 hover:border-[#74c69d]/70 hover:shadow-[0_0_42px_rgba(116,198,157,0.22)]"
            >
              <div className="mb-7 flex items-center justify-between">
                <service.icon className="h-10 w-10 text-[#74c69d]" />
                {service.popular ? (
                  <span className="rounded-full bg-[#e9c46a] px-3 py-1 text-xs font-black text-[#081c15]">
                    Most Popular
                  </span>
                ) : null}
              </div>
              <h3 className="font-display text-2xl font-bold">{service.name}</h3>
              <p className="mt-3 leading-7 text-white/66">{service.description}</p>
              <Link
                href="/services"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#74c69d]"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="eyebrow">Why eco-elan</p>
            <h2 className="mt-4 font-display text-5xl font-black italic text-[#081c15] md:text-6xl">
              Why Families Choose eco-elan
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-lg border border-[#2d6a4f]/12 bg-[#f8f9f4] p-7"
              >
                <feature.icon className="mb-5 h-9 w-9 text-[#2d6a4f]" />
                <h3 className="font-display text-2xl font-bold text-[#081c15]">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-[#1a1a1a]/70">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          label="How It Works"
          title="A Better Clean in Three Simple Steps"
        />
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="relative rounded-lg bg-white p-8">
              <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#2d6a4f] font-bold text-white">
                {index + 1}
              </span>
              <h3 className="font-display text-3xl font-bold italic text-[#081c15]">
                {step.title}
              </h3>
              <p className="mt-4 leading-7 text-[#1a1a1a]/68">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#081c15] px-4 py-24 text-white sm:px-6 lg:px-8">
        <SectionIntro
          dark
          label="Subscriptions"
          title="Save More With a Subscription"
        />
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-lg border p-8 ${
                plan.popular
                  ? "border-[#e9c46a] bg-white text-[#081c15]"
                  : "border-white/12 bg-white/6"
              }`}
            >
              {plan.popular ? (
                <span className="absolute right-6 top-6 rounded-full bg-[#e9c46a] px-3 py-1 text-xs font-black uppercase tracking-widest">
                  Most Popular
                </span>
              ) : null}
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#74c69d]">
                {plan.name}
              </p>
              <h3 className="mt-4 font-display text-4xl font-black italic">
                {plan.cadence}
              </h3>
              <p className="mt-2 text-sm opacity-65">Contact us for pricing</p>
              <ul className="mt-8 space-y-4">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Check className="h-5 w-5 shrink-0 text-[#74c69d]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-8 w-full rounded-full ${
                  plan.popular
                    ? "bg-[#2d6a4f] text-white hover:bg-[#245840]"
                    : "bg-[#e9c46a] text-[#081c15] hover:bg-[#f3d77f]"
                }`}
              >
                <Link href={plan.name === "Premium" ? "/contact" : "/book"}>
                  {plan.cta}
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro label="Testimonials" title="What Our Clients Say" />
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-lg bg-white p-8 shadow-eco-sm"
            >
              <div className="mb-5 flex gap-1 text-[#e9c46a]">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-lg leading-8 text-[#1a1a1a]/76">
                "{testimonial.text}"
              </p>
              <p className="mt-6 font-bold text-[#2d6a4f]">
                - {testimonial.name}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#081c15] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e9c46a]">
              Book Online
            </p>
            <h2 className="mt-4 font-display text-5xl font-black italic md:text-6xl">
              Ready for a Cleaner Home?
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-white/70">
              Book in under 2 minutes. First-time clients get 20% off.
            </p>
            <div className="mt-8 flex items-center gap-3 text-white/72">
              <MessageCircle className="h-5 w-5 text-[#74c69d]" />
              info@eco-elan.com
            </div>
          </div>
          <div className="rounded-lg border border-white/12 bg-white/8 p-6 shadow-eco-lg backdrop-blur">
            <BookingLeadForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className: string;
}) {
  return (
    <div
      className={`absolute hidden rounded-lg border border-white/15 bg-[#081c15]/90 px-5 py-4 text-white shadow-eco-md backdrop-blur md:block ${className}`}
    >
      <p className="font-display text-3xl font-black italic text-[#e9c46a]">
        {value}
      </p>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
        {label}
      </p>
    </div>
  );
}

function SectionIntro({
  label,
  title,
  dark = false,
}: {
  label: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p
        className={`text-xs font-bold uppercase tracking-[0.28em] ${
          dark ? "text-[#e9c46a]" : "text-[#2d6a4f]"
        }`}
      >
        {label}
      </p>
      <h2
        className={`mt-4 font-display text-5xl font-black italic md:text-6xl ${
          dark ? "text-white" : "text-[#081c15]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

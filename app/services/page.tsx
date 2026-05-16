import {
  ArrowRight,
  Building2,
  Check,
  Home,
  Leaf,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Trees,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    icon: Home,
    title: "Regular House Cleaning",
    description: "A polished maintenance clean using eco-safe, plant-based products.",
    tiers: ["Condos and apartments", "Townhomes", "Detached homes"],
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "A full-detail clean for first-time clients, seasonal resets, and buildup.",
    tiers: ["Kitchen detail", "Bathroom reset", "Whole-home refresh"],
  },
  {
    icon: ShieldCheck,
    title: "Move In / Move Out Cleaning",
    description: "Complete top-to-bottom cleaning for empty homes and handoffs.",
    tiers: ["Inside appliances", "Inside cabinets", "Baseboards and trims"],
  },
  {
    icon: Trees,
    title: "Eco Lawn Care",
    description: "Sustainable outdoor care that supports healthy curb appeal.",
    tiers: ["Seasonal care", "Recurring maintenance", "Custom outdoor plans"],
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Healthier workspaces for offices, clinics, retail, and shared spaces.",
    tiers: ["Daily", "Weekly", "Custom contracts"],
  },
  {
    icon: SprayCan,
    title: "Window Cleaning",
    description: "Clear, streak-free interior glass without harsh chemical residue.",
    tiers: ["Interior windows", "Monthly add-on", "Subscription inclusion"],
  },
];

const inclusions = [
  "100% non-toxic products",
  "Trained & trusted team",
  "Flexible scheduling",
  "Satisfaction guaranteed",
  "Safe for children and pets",
  "20% OFF first service",
];

export default function ServicesPage() {
  return (
    <div className="bg-[#f8f9f4] pt-20">
      <section className="relative overflow-hidden bg-[#081c15] px-4 py-24 text-white sm:px-6 lg:px-8">
        <Image
          src="/assets/Ecoelan-services.webp"
          alt="eco-elan services"
          fill
          priority
          className="object-cover opacity-22"
        />
        <div className="absolute inset-0 bg-[#081c15]/82" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e9c46a]">
              Services
            </p>
            <h1 className="mt-5 font-display text-6xl font-black italic leading-none md:text-7xl">
              Premium Eco Cleaning Services
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/74">
            From regular maintenance to deep cleaning, lawn care, commercial
            spaces, and windows, eco-elan brings modern eco luxury to every
            service across Ontario.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-lg border border-[#74c69d]/20 bg-[#081c15] p-7 text-white shadow-eco-md transition hover:-translate-y-1 hover:border-[#74c69d]/70"
            >
              <service.icon className="mb-8 h-10 w-10 text-[#74c69d]" />
              <h2 className="font-display text-3xl font-bold italic">
                {service.title}
              </h2>
              <p className="mt-4 leading-7 text-white/66">{service.description}</p>
              <div className="mt-7 rounded-lg border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e9c46a]">
                  Pricing tiers
                </p>
                <ul className="mt-4 space-y-3">
                  {service.tiers.map((tier) => (
                    <li key={tier} className="flex gap-3 text-sm text-white/74">
                      <Check className="h-5 w-5 shrink-0 text-[#74c69d]" />
                      {tier}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/book"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#74c69d]"
              >
                Book This Service <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="eyebrow">Included</p>
            <h2 className="mt-4 font-display text-5xl font-black italic text-[#081c15]">
              Every clean is built around safety and finish
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {inclusions.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-lg bg-[#f8f9f4] p-5"
              >
                <Leaf className="h-5 w-5 shrink-0 text-[#2d6a4f]" />
                <span className="font-semibold text-[#081c15]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#081c15] px-4 py-20 text-center text-white sm:px-6 lg:px-8">
        <h2 className="font-display text-5xl font-black italic">
          Ready to book your first eco clean?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          First-time clients get 20% off. We will confirm exact pricing after
          matching your service, home size, and schedule.
        </p>
        <Link
          href="/book"
          className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-[#e9c46a] px-8 font-bold text-[#081c15]"
        >
          Book Now <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}

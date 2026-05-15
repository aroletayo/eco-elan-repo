import { ArrowRight, Check, Crown, Leaf, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Basic",
    cadence: "Bi-Weekly",
    description: "Monthly / One-Time cleaning",
    items: ["Standard cleaning", "Eco products included", "Same team every visit"],
    href: "/book",
  },
  {
    name: "Popular",
    cadence: "Weekly",
    description: "Most consistent home care",
    popular: true,
    items: [
      "Everything in Basic",
      "Priority scheduling",
      "Free window cleaning monthly",
      "15% discount",
    ],
    href: "/book",
  },
  {
    name: "Premium",
    cadence: "Custom Plan",
    description: "Home or commercial recurring care",
    items: [
      "Everything in Popular",
      "Commercial available",
      "Dedicated account manager",
      "Custom schedule",
    ],
    href: "/contact",
  },
];

const comparisons = [
  "Contact us for pricing",
  "Flexible weekly, bi-weekly, monthly, or one-time service",
  "Plant-based products included with every clean",
  "Same-day and weekend appointments available when scheduling allows",
  "No harsh chemical smell after service",
];

export default function SubscriptionsPage() {
  return (
    <div className="bg-[#f8f9f4] pt-20">
      <section className="bg-[#081c15] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e9c46a]">
            Recurring Care
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <h1 className="font-display text-6xl font-black italic leading-none md:text-7xl">
              Save More With a Subscription
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/70">
              Keep your home consistently fresh with premium eco-friendly
              recurring cleaning. No prices shown - contact us for pricing and
              the right schedule for your home.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-lg border p-8 shadow-eco-md ${
                plan.popular
                  ? "border-[#e9c46a] bg-[#081c15] text-white"
                  : "border-[#2d6a4f]/12 bg-white text-[#081c15]"
              }`}
            >
              {plan.popular ? (
                <span className="absolute right-6 top-6 rounded-full bg-[#e9c46a] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#081c15]">
                  Most Popular
                </span>
              ) : null}
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#74c69d]/15">
                {plan.popular ? (
                  <Crown className="h-7 w-7 text-[#e9c46a]" />
                ) : plan.name === "Premium" ? (
                  <Sparkles className="h-7 w-7 text-[#2d6a4f]" />
                ) : (
                  <Leaf className="h-7 w-7 text-[#2d6a4f]" />
                )}
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#74c69d]">
                {plan.name}
              </p>
              <h2 className="mt-4 font-display text-4xl font-black italic">
                {plan.cadence}
              </h2>
              <p className="mt-2 text-sm opacity-65">{plan.description}</p>
              <p className="mt-6 text-sm font-bold">Contact us for pricing</p>
              <ul className="mt-8 space-y-4">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Check className="h-5 w-5 shrink-0 text-[#74c69d]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-bold ${
                  plan.popular
                    ? "bg-[#e9c46a] text-[#081c15]"
                    : "bg-[#2d6a4f] text-white"
                }`}
              >
                {plan.name === "Premium" ? "Contact Us" : "Get Started"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="eyebrow">Comparison</p>
            <h2 className="mt-4 font-display text-5xl font-black italic text-[#081c15]">
              A cleaner rhythm for busy homes
            </h2>
          </div>
          <div className="grid gap-4">
            {comparisons.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-lg border border-[#2d6a4f]/12 bg-[#f8f9f4] p-5"
              >
                <Check className="h-5 w-5 shrink-0 text-[#2d6a4f]" />
                <span className="text-[#1a1a1a]/75">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

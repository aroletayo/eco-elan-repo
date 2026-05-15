import { CalendarCheck, CheckCircle2, Leaf, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { BookingLeadForm } from "@/components/BookingLeadForm";

const benefits = [
  "First-time clients get 20% off",
  "Same-day and weekend appointments available",
  "100% eco-friendly products",
  "Confirmation by phone or email",
];

export default function BookPage() {
  return (
    <div className="bg-[#f8f9f4] pt-20">
      <section className="relative overflow-hidden bg-[#081c15] px-4 py-20 text-white sm:px-6 lg:px-8">
        <Image
          src="/assets/cleaning-kitchen.webp"
          alt="Book Eco Elan cleaning"
          fill
          priority
          className="object-cover opacity-24"
        />
        <div className="absolute inset-0 bg-[#081c15]/84" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e9c46a]">
              Book Online
            </p>
            <h1 className="mt-5 font-display text-6xl font-black italic leading-none md:text-7xl">
              Book Your Eco Clean
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
              Request your premium eco-friendly cleaning in under 60 seconds.
              We will confirm your appointment and pricing before service.
            </p>

            <div className="mt-8 grid gap-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-white/78">
                  <CheckCircle2 className="h-5 w-5 text-[#74c69d]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/8 p-5 shadow-eco-lg backdrop-blur md:p-8">
            <BookingLeadForm />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            {
              icon: Leaf,
              title: "Non-toxic clean",
              text: "Safe for children, pets, and sensitive homes.",
            },
            {
              icon: ShieldCheck,
              title: "Trusted team",
              text: "Insured professionals who treat your home carefully.",
            },
            {
              icon: CalendarCheck,
              title: "Flexible timing",
              text: "Choose a preferred date and we will confirm availability.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-lg bg-white p-7 shadow-eco-sm">
              <item.icon className="mb-5 h-9 w-9 text-[#2d6a4f]" />
              <h2 className="font-display text-2xl font-bold text-[#081c15]">
                {item.title}
              </h2>
              <p className="mt-3 leading-7 text-[#1a1a1a]/68">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

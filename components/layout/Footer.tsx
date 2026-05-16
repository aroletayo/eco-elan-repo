"use client";

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  "Regular House Cleaning",
  "Deep Cleaning",
  "Move In / Move Out",
  "Eco Lawn Care",
  "Commercial Cleaning",
  "Window Cleaning",
];

const quickLinks = ["About", "Contact", "Book", "Privacy", "Terms"];

export function Footer() {
  return (
    <footer className="bg-[#081c15] text-white">
      <div className="h-px w-full bg-[#e9c46a]" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/Ecoelan-logo-removebg.webp"
                alt="Eco Elan"
                width={96}
                height={96}
                className="h-20 w-20 object-contain"
              />
              <span className="brand-wordmark text-4xl font-bold italic">
                Eco-Elan
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-white/68">
              Premium eco-friendly cleaning and lawn care services. Safe for
              your family, gentle on the earth.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href={index === 0 ? "https://instagram.com/ecoelancleaning" : "#"}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#74c69d] hover:text-[#74c69d]"
                  aria-label="Eco-Elan social link"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#e9c46a]">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#e9c46a]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#e9c46a]">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-[#74c69d]" />
                <a href="tel:+14372654977">+1(437) 2654977</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-[#74c69d]" />
                <a href="mailto:info@ecoelan.com">info@ecoelan.com</a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-[#74c69d]" />
                <span>Ontario CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Eco-Elan. All rights reserved.</p>
          <p>eco-elan.ca</p>
        </div>
      </div>
    </footer>
  );
}

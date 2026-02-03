"use client";

import Link from "next/link";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white text-eco-green-dark">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/Ecoelan-logo-removebg.webp"
                alt="Eco Elan Logo"
                className="w-16 h-16 md:w-24 md:h-24"
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm !text-black leading-relaxed">
              Premium eco-friendly cleaning services for homes and businesses.
              Safe for kids, pets, and the planet.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/ecoelancleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/50 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/50 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/50 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 !text-black">
              {[
                "Services",
                "Subscriptions",
                "Commercial",
                "About",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="text-primary-foreground/80 !text-black hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Standard Cleaning",
                "Deep Cleaning",
                "Move-In/Move-Out",
                "Airbnb Turnover",
                "Office Cleaning",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-primary-foreground/80 !text-black hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 !text-black">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm !text-black">
                  Toronto & GTA, Ontario, Canada
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm !text-black"
                >
+1(437) 2654977                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a
                  href="mailto: info@eco-elan.com"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm !text-black"
                >
                   info@eco-elan.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Eco Elan. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

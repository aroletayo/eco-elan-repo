"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Subscriptions", href: "/subscriptions" },
  { name: "Commercial", href: "/commercial" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white"
        }`}
      >
        {/* TOP BAR - Desktop only */}
        <div
          className={`hidden md:block border-b border-gray-200 transition-all duration-300 ${
            isScrolled
              ? "max-h-0 opacity-0 overflow-hidden"
              : "max-h-20 opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 text-sm">
              <div className="hidden md:flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1(437) 2654977</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@ecoelan.com</span>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-1.5 rounded-full border border-green-200">
                  <span className="text-green-700 font-medium text-xs">
                    🌿 Spring Special: 20% OFF First Service
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAV */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24 ">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="/Ecoelan-logo-removebg.webp"
                alt="Eco Elan Logo"
                className="w-20 h-20 md:w-28 md:h-28  group-hover:shadow-eco-glow transition-shadow duration-300"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-t-lg font-medium transition-all duration-200 ${
                      active
                        ? "text-eco-green bg-green-50"
                        : "text-gray-700 hover:text-eco-green hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-eco-green rounded-t-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/book">
                <button className="bg-eco-green text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Book Now
                </button>
              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white h-full border-t border-gray-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {/* Navigation Links */}
              <div className="px-1 py-2">
                {navLinks.map((link) => {
                  const active = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center px-3 py-3 rounded-lg font-medium transition-colors ${
                        active
                          ? "text-green-600 bg-green-50"
                          : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                      }`}
                    >
                      {link.name}
                      {active && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-green-500" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Contact Information Section in Mobile Menu */}
              <div className="px-4 py-4 border-t border-gray-200">
                <div className="space-y-3 text-[14px]">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#82a731]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+1(437) 2654977</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#82a731]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">info@ecoelan.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Offer and CTA at bottom */}
              <div className="absolute left-4 right-4 my-4 bottom-24 z-50">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-lg border border-green-200 text-center">
                  <span className="text-green-700 font-medium text-sm">
                    🌿 Spring Special: 20% OFF First Service
                  </span>
                </div>

                <Link href="/book">
                  <button className="w-full mt-4 bg-[#82a731] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SPACER */}
      <div
        className={`transition-all hidden md:flex duration-300 ${
          isScrolled ? "h-20" : "h-32"
        }`}
      />
    </>
  );
}

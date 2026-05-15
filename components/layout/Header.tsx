"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const isHeroTransparent = pathname === "/" && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          !isHeroTransparent
            ? "border-[#2d6a4f]/15 bg-white/88 shadow-[0_18px_45px_rgba(8,28,21,0.08)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Ecoelan-logo-removebg.webp"
              alt="Eco Elan"
              width={84}
              height={84}
              priority
              className="h-16 w-16 object-contain"
            />
            <span
              className={`hidden font-display text-2xl font-bold italic sm:block ${
                isHeroTransparent ? "text-white" : "text-[#081c15]"
              }`}
            >
              Eco Elan
            </span>
          </Link>

          <nav className="hidden items-center rounded-full border border-white/20 bg-white/12 px-2 py-1 backdrop-blur-md lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#2d6a4f] text-white"
                    : isHeroTransparent
                    ? "text-white/88 hover:bg-white/15"
                    : "text-[#081c15] hover:bg-[#2d6a4f]/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+14372654977"
              className={`flex items-center gap-2 text-sm font-semibold ${
                isHeroTransparent ? "text-white" : "text-[#081c15]"
              }`}
            >
              <Phone className="h-4 w-4" />
              +1(437) 2654977
            </a>
            <Link
              href="/book"
              className="rounded-full bg-[#2d6a4f] px-6 py-3 text-sm font-bold text-white shadow-[0_0_34px_rgba(116,198,157,0.35)] transition hover:-translate-y-0.5 hover:bg-[#245840]"
            >
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
              isHeroTransparent
                ? "border-white/30 bg-white/10 text-white"
                : "border-[#2d6a4f]/20 bg-white text-[#081c15]"
            }`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#081c15] text-white lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-5">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <Image
                  src="/Ecoelan-logo-removebg.webp"
                  alt="Eco Elan"
                  width={76}
                  height={76}
                  className="h-14 w-14 object-contain"
                />
                <span className="font-display text-2xl font-bold italic">
                  Eco Elan
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
              className="px-6 pt-10"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block border-b border-white/10 py-5 font-display text-4xl font-bold italic"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="absolute inset-x-6 bottom-8 space-y-4">
              <div className="rounded-lg border border-[#e9c46a]/35 bg-[#e9c46a]/10 p-4 text-center text-sm font-semibold text-[#e9c46a]">
                Spring Special: 20% OFF First Service
              </div>
              <Link
                href="/book"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-full bg-[#e9c46a] px-6 py-4 text-center font-bold text-[#081c15]"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

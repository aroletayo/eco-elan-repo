"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  CheckCircle2,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const heroSlide= "/assets/Ecoelan-herosection.webp";
const heroSlide1 ="assets/hero-sectionSlides1.webp";
const heroSlide2 ="assets/hero-sectionSlides2.webp";
const heroSlide3 = "assets/hero-sectionSlides3.webp";

const slides = [
    {
    image: heroSlide,
    alt: "mordern living room being cleaned by professional cleaner",
  },
  {
    image: heroSlide1,
    alt: "Professional cleaner cleaning a modern kitchen",
  },
  {
    image: heroSlide2,
    alt: "Cleaning team working together in a living room",
  },
  {
    image: heroSlide3,
    alt: "Professional cleaner making a bed with fresh linens",
  },
];

interface HeroContent {
  title: string;
  accentText: string;
  subtitle: string;
  ctaText: string;
}

const HeroCarousel = ({ content }: { content: HeroContent }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Images with 5-second zoom-out effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-all duration-1000 ease-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className={`w-full h-full object-cover ${
              index === currentSlide ? "animate-zoom-out-5s" : "scale-130"
            }`}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/65 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20 px-5">
        <div className="max-w-5xl">
          {/* Animated Heading */}
          <h1
            className="font-display text-[3rem] md:text-[70px] font-bold text-primary leading-tight mb-6 animate-slide-up"
            style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
          >
            {content.title}{" "}
            <span className="text-accent relative">
              {content.accentText}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-accent/30"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 Q50,0 100,8 T200,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="animate-draw-line"
                />
              </svg>
            </span>
          </h1>

          {/* Animated Description */}
          <p
            className="text-lg text-black max-w-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
          >
            {content.subtitle}
          </p>

          {/* Animated Buttons */}
          <div
            className="flex flex-wrap gap-4 animate-slide-up"
            style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}
          >
            <Button
              className="min-w-[250px] group"
              variant="hero"
              size="lg"
              asChild
            >
              <Link href="/book">
                {content.ctaText}
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              className="min-w-[250px]"
              variant="hero-outline"
              size="lg"
              asChild
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>

          {/* Animated Trust Indicators */}
          <div
            className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t  border-accent animate-fade-in"
            style={{ animationDelay: "0.7s", animationFillMode: "backwards" }}
          >
            <div className="flex items-center gap-2 group">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-accent text-accent transition-transform"
                    style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">5.0 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground text-sm">
                Fully Insured
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground text-sm">
                Background Checked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute hidden md:flex  left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border  items-center justify-center text-primary hover:bg-background hover:scale-110 transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute hidden md:flex  right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border items-center justify-center text-primary hover:bg-background hover:scale-110 transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute hidden md:flex bottom-8 left-1/2 -translate-x-1/2 z-20  items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-2 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "w-8 bg-accent/50"
                : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <span className="absolute inset-0 rounded-full bg-accent animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;

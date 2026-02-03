import { FadeIn } from "../animations/FadeIn";
import { StaggerContainer, staggerItem } from "../animations/StaggerContainer";
import {
  Leaf,
  Sparkles,
  ArrowRight,
  Building2,
  Home,
  Plane,
} from "lucide-react";
import { motion } from "framer-motion";
import { HoverScale } from "../animations/HoverScale";
import { Button } from "../ui/button";
import Link from "next/link";
import imgOne from "../../public/assets/ecoClean4.jpg";
import imgTwo from "../../public/assets/ecoClean2.jpg";
import imgThree from "../../public/assets/ecoClean1.jpg";
import imgFour from "../../public/assets/ecoClean3.jpg";
import imgFive from "../../public/assets/ecoClean5.jpg";

interface ServicesContent {
  sectionTitle: string;
  sectionSubtitle: string;
  standardTitle: string;
  standardDescription: string;
  deepTitle: string;
  deepDescription: string;
  airbnbTitle: string;
  airbnbDescription: string;
}

const ServiceSection = ({ content }: { content: ServicesContent }) => {
  const services = [
    {
      icon: Sparkles,
      title: content.standardTitle,
      description: content.standardDescription,
      price: "From $110",
      image: imgOne.src,
    },
    {
      icon: Leaf,
      title: content.deepTitle,
      description: content.deepDescription,
      price: "From $200",
      image: imgTwo.src,
    },
    {
      icon: Home,
      title: "Move-In/Move-Out",
      description: "Complete top-to-bottom luxury clean for empty homes.",
      price: "From $240",
      image: imgThree.src,
    },
    {
      icon: Plane,
      title: content.airbnbTitle,
      description: content.airbnbDescription,
      price: "From $120",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: Building2,
      title: "Office Cleaning",
      description:
        "A healthier workspace with non-toxic, eco-friendly products.",
      price: "From $50/hr",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            {content.sectionTitle}
          </h2>
          <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
            Premium <span className="text-accent"> Eco</span> Cleaning Services
          </span>
          <p className="text-muted-foreground text-lg">
            {content.sectionSubtitle}
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              className="group/card"
            >
              <HoverScale className="bg-card rounded-2xl cursor-pointer p-8 shadow-eco-sm h-full relative overflow-hidden">
                {/* Background image that scales in on hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105 group-hover/card:scale-100 opacity-20 group-hover/card:opacity-30"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                </div>

                {/* Card content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-eco-green-light flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-accent font-semibold text-lg">
                    {service.price}
                  </p>
                </div>
              </HoverScale>
            </motion.div>
          ))}

          {/* View All Services Card */}
          <motion.div variants={staggerItem}>
            <HoverScale className="bg-gradient-to-br from-primary to-eco-navy-light rounded-2xl p-8 flex flex-col justify-center items-center text-center h-full relative overflow-hidden">
              {/* Background image for the CTA card */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105 group-hover:scale-100 opacity-30 group-hover:opacity-40"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80)`,
                  }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-primary/70 group-hover:bg-primary/60 transition-colors duration-500" />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-eco-navy-light/80 group-hover:from-primary/70 group-hover:via-primary/60 group-hover:to-eco-navy-light/70 transition-all duration-500" />

              {/* Card content */}
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-4">
                  Explore All Services
                </h3>
                <p className="text-primary-foreground/80 mb-6">
                  Discover our full range of eco-friendly cleaning solutions.
                </p>
                <Button variant="accent" asChild>
                  <Link href="/services">
                    View All Services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </HoverScale>
          </motion.div>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ServiceSection;

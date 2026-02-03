"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { FadeIn, PageTransition } from "@/components/animations";
import { useContent } from "@/hooks/use-content";
import PageLoader from "@/components/PageLoader";

const serviceOptions = [
  "Standard Eco Cleaning",
  "Deep Eco Cleaning",
  "Move-In/Move-Out Cleaning",
  "Airbnb Turnover",
  "Office Cleaning",
  "Subscription Plan",
  "Commercial Quote",
  "Other",
];

const ContactPage = () => {
  const { toast } = useToast();
  const { content, loading } = useContent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  if (loading) {
    return <PageLoader />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-eco-green-light to-background">
          <div className="container-custom text-center">
            <FadeIn>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-primary mb-6">
                {content.contact.title}
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                {content.contact.subtitle}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding -mt-8">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-primary mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-eco-green-light flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${content.contact.phone}`}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {content.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-eco-green-light flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${content.contact.email}`}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {content.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-eco-green-light flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Service Area
                        </p>
                        <p className="text-muted-foreground">
                          {content.contact.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-eco-green-light flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Hours
                        </p>
                        <p className="text-muted-foreground">
                          Mon - Sat: 8am - 6pm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Benefits */}
                <div className="bg-secondary rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-primary mb-4">
                    Why Contact Us
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      Free quotes within 24 hours
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      No obligation consultations
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      Custom cleaning plans
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      Flexible scheduling
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <FadeIn delay={0.2}>
                <div className="lg:col-span-2">
                  <div className="bg-card rounded-3xl p-8 md:p-10 shadow-eco-lg">
                    <h2 className="font-display text-2xl font-bold text-primary mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Fill out the form below and we'll get back to you shortly.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Full Name *
                          </label>
                          <Input
                            required
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Email Address *
                          </label>
                          <Input
                            required
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            placeholder="(123) 456-7890"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            Service Interested In
                          </label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) =>
                              setFormData({ ...formData, service: value })
                            }
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Message *
                        </label>
                        <Textarea
                          required
                          placeholder="Tell us about your cleaning needs, property size, preferred schedule, etc."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="min-h-[150px] resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="accent"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Map Section Placeholder */}
        <section className="section-padding bg-secondary">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">
              Serving the Greater Toronto Area
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Toronto • Mississauga • Brampton • Etobicoke • North York •
              Scarborough • Vaughan
            </p>
            <div className="bg-card rounded-2xl h-64 flex items-center justify-center shadow-eco-sm">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Proudly serving homes and businesses across the GTA
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ContactPage;

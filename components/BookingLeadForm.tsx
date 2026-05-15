"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Trees,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateOrderId } from "@/lib/order-id";

const serviceTypes = [
  {
    name: "Regular House Cleaning",
    price: "From $110",
    icon: Home,
  },
  {
    name: "Deep Cleaning",
    price: "From $200",
    icon: Sparkles,
  },
  {
    name: "Move In / Move Out Cleaning",
    price: "From $240",
    icon: ShieldCheck,
  },
  {
    name: "Eco Lawn Care",
    price: "Custom quote",
    icon: Trees,
  },
  {
    name: "Commercial Cleaning",
    price: "From $50/hr",
    icon: Building2,
  },
  {
    name: "Window Cleaning",
    price: "Custom quote",
    icon: SprayCan,
  },
];

export function BookingLeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    message: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const orderId = generateOrderId();

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          orderId,
          source: "website-booking-form",
        }),
      });

      if (!response.ok) {
        throw new Error("Booking request failed");
      }

      toast.success("Booking request sent", {
        description: "We will confirm your eco cleaning appointment shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        preferredDate: "",
        message: "",
      });
    } catch (error) {
      console.error("Booking lead error:", error);
      toast.error("Booking failed", {
        description: "Please try again or call +1(437) 2654977.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#e9c46a]">
          Choose your service
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceTypes.map((service) => {
            const selected = formData.service === service.name;
            return (
              <button
                key={service.name}
                type="button"
                onClick={() => updateField("service", service.name)}
                className={`rounded-lg border p-4 text-left transition ${
                  selected
                    ? "border-[#e9c46a] bg-[#e9c46a] text-[#081c15]"
                    : "border-white/12 bg-white/8 text-white hover:border-[#74c69d]/70"
                }`}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <service.icon
                    className={`h-6 w-6 ${
                      selected ? "text-[#081c15]" : "text-[#74c69d]"
                    }`}
                  />
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      selected
                        ? "bg-[#081c15] text-white"
                        : "bg-white/10 text-[#e9c46a]"
                    }`}
                  >
                    {service.price}
                  </span>
                </div>
                <span className="block text-sm font-bold">{service.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          required
          placeholder="Name"
          value={formData.name}
          onChange={(event) => updateField("name", event.target.value)}
        />
        <Input
          required
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          required
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
        <Input
          readOnly
          required
          value={formData.service}
          placeholder="Select a service above"
          className="cursor-default"
        />
      </div>
      <Input
        type="date"
        value={formData.preferredDate}
        onChange={(event) => updateField("preferredDate", event.target.value)}
      />
      <Textarea
        placeholder="Message"
        value={formData.message}
        onChange={(event) => updateField("message", event.target.value)}
      />
      <Button
        type="submit"
        className="h-14 w-full rounded-full bg-[#e9c46a] text-[#081c15] hover:bg-[#f3d77f]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Book My Cleaning"}
        {isSubmitting ? null : <ArrowRight className="h-5 w-5" />}
      </Button>
      <p className="flex items-center justify-center gap-2 text-xs font-medium text-[#f8f9f4]/70">
        <CheckCircle2 className="h-4 w-4 text-[#74c69d]" />
        First-time clients get 20% off.
      </p>
    </form>
  );
}

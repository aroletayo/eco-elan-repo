"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { generateOrderId } from "@/lib/order-id";

const serviceTypes = [
  "Regular House Cleaning",
  "Deep Cleaning",
  "Move In / Move Out Cleaning",
  "Eco Lawn Care",
  "Commercial Cleaning",
  "Window Cleaning",
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
      await addDoc(collection(db, "bookings"), {
        ...formData,
        orderId,
        source: "homepage-cta",
        status: "pending",
        createdAt: serverTimestamp(),
      });

      await Promise.allSettled([
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            orderId,
            fullName: formData.name,
            serviceType: formData.service,
            date: formData.preferredDate || "To be scheduled",
            time: "TBD",
            address: "To be confirmed",
            city: "Ontario",
            notes: formData.message,
          }),
        }),
        fetch("/api/notify-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: "To be confirmed",
            serviceType: formData.service,
            date: formData.preferredDate || "To be scheduled",
            time: "TBD",
            amount: "Contact us for pricing",
            orderId,
          }),
        }),
      ]);

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
        <Select
          required
          value={formData.service}
          onValueChange={(value) => updateField("service", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Service type" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypes.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

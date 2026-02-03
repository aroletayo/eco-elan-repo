"use client";

import { useState } from "react";
import { generateOrderId } from "@/lib/order-id";

import { useToast } from "@/hooks/use-toast";
import { usePricing } from "@/hooks/use-pricing";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PageLoader from "@/components/PageLoader";
import {
  ProgressSteps,
  ServiceSelection,
  ScheduleSelection,
  ContactDetails,
  ReviewConfirmation,
  BookingComplete,
  TrustBadges,
  EcoProductsBanner,
  Service,
  BedroomOption,
  AddOn,
  FormData,
} from "./components";

import { Home, Sparkles, Truck, BedDouble, Building2 } from "lucide-react";
import { format } from "date-fns";

const cleaningKitchen = "/assets/cleaning-kitchen.webp";

export default function Book() {
  const { toast } = useToast();
  const { pricing, loading: pricingLoading } = usePricing();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bedrooms, setBedrooms] = useState("");
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [hours, setHours] = useState(2);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Dynamic data based on pricing
  const services: Service[] = [
    {
      id: "standard",
      name: "Standard Eco Cleaning",
      icon: Home,
      description: "Regular maintenance clean with eco-safe products",
      basePrice: pricing.services.standard,
    },
    {
      id: "deep",
      name: "Deep Eco Cleaning",
      icon: Sparkles,
      description: "Full-detail premium clean for buildup or seasonal resets",
      basePrice: pricing.services.deep,
    },
    {
      id: "moveinout",
      name: "Move-In / Move-Out",
      icon: Truck,
      description: "Complete top-to-bottom clean for empty homes",
      basePrice: pricing.services.moveinout,
    },
    {
      id: "airbnb",
      name: "Airbnb Turnover",
      icon: BedDouble,
      description: "Fast, consistent turnover service for rentals",
      basePrice: pricing.services.airbnb,
    },
    {
      id: "office",
      name: "Office Cleaning",
      icon: Building2,
      description: "Commercial workspace cleaning with eco products",
      basePrice: pricing.services.office,
      isHourly: true,
    },
  ];

  const bedroomOptions: BedroomOption[] = [
    { value: "studio", label: "Studio", priceMultiplier: 1 },
    { value: "1", label: "1 Bedroom", priceMultiplier: 1.18 },
    { value: "2", label: "2 Bedroom", priceMultiplier: 1.45 },
    { value: "3", label: "3 Bedroom", priceMultiplier: 1.82 },
    { value: "4", label: "4+ Bedroom", priceMultiplier: 2.59 },
  ];

  const addOns: AddOn[] = [
    { id: "fridge", name: "Inside Fridge", price: pricing.addons.fridge },
    { id: "oven", name: "Inside Oven", price: pricing.addons.oven },
    {
      id: "windows",
      name: "Windows (Interior)",
      price: pricing.addons.windows,
    },
    { id: "cabinets", name: "Inside Cabinets", price: pricing.addons.cabinets },
    { id: "laundry", name: "Laundry", price: pricing.addons.laundry },
    { id: "balcony", name: "Balcony Cleaning", price: pricing.addons.balcony },
  ];

  const selectedServiceData = services.find((s) => s.id === selectedService);
  const selectedBedroomData = bedroomOptions.find((b) => b.value === bedrooms);

  const calculatePrice = () => {
    if (!selectedServiceData) return 0;

    let price = selectedServiceData.basePrice;

    if (selectedServiceData.isHourly) {
      price = selectedServiceData.basePrice * hours;
    } else if (selectedBedroomData) {
      price = Math.round(
        selectedServiceData.basePrice * selectedBedroomData.priceMultiplier
      );
    }

    // Add add-ons
    selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) price += addOn.price;
    });

    return price;
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate order ID
      const orderId = generateOrderId();

      // First save to Firebase
      const bookingRef = await addDoc(collection(db, "bookings"), {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        service: selectedServiceData?.name || "",
        date: date ? format(date, "PPP") : "",
        time: timeSlot,
        bedrooms:
          bedrooms || (selectedServiceData?.isHourly ? `${hours} hours` : ""),
        addOns: selectedAddOns
          .map((id) => addOns.find((a) => a.id === id)?.name)
          .filter(Boolean),
        notes: formData.notes,
        price: calculatePrice(),
        status: "pending",
        orderId, // Save order ID
        createdAt: serverTimestamp(),
      });

      // Then send confirmation email
      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            orderId,
            amount: calculatePrice(),
            fullName: `${formData.firstName} ${formData.lastName}`,
            serviceType: selectedServiceData?.name || "",
            date: date ? format(date, "PPP") : "To be scheduled",
            time: timeSlot || "TBD",
            address: formData.address,
            city: formData.city,
            bedrooms: bedrooms || undefined,
            hours: selectedServiceData?.isHourly ? hours : undefined,
            addOns: selectedAddOns
              .map((id) => addOns.find((a) => a.id === id)?.name)
              .filter(Boolean),
            notes: formData.notes,
          }),
        });

        // After sending customer email, send admin notification
        try {
          await fetch("/api/notify-admin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              address: `${formData.address}, ${formData.city}`,
              serviceType: selectedServiceData?.name,
              date: date ? format(date, "PPP") : "To be scheduled",
              time: timeSlot,
              amount: calculatePrice(),
              orderId,
            }),
          });
        } catch (adminError) {
          console.error("Admin notification error:", adminError);
          // Continue anyway
        }

        if (!emailResponse.ok) {
          console.warn("Email sending failed, but booking was saved");
          // Don't fail the booking if email fails
        }
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Continue even if email fails
      }

      setIsComplete(true);
      toast({
        title: "Booking Confirmed!",
        description:
          "we have sent a confirmation email with your booking details.",
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description:
          "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const canProceedStep1 = !!(
    selectedService &&
    (selectedServiceData?.isHourly || bedrooms)
  );
  const canProceedStep2 = !!(date && timeSlot);
  const canProceedStep3 = !!(
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.address &&
    formData.city
  );

  if (isComplete) {
    return (
      <BookingComplete
        email={formData.email}
        selectedServiceName={selectedServiceData?.name}
        date={date}
        timeSlot={timeSlot}
        address={formData.address}
        city={formData.city}
        calculatePrice={calculatePrice}
      />
    );
  }

  if (pricingLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={cleaningKitchen}
            alt="Professional cleaning"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="p-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Book Your <span className="text-accent">Eco Clean</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule your premium eco-friendly cleaning service in just a few
              simple steps.
            </p>
          </div>
        </div>
      </section>

      <ProgressSteps step={step} />

      {/* Booking Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <ServiceSelection
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                selectedAddOns={selectedAddOns}
                toggleAddOn={toggleAddOn}
                hours={hours}
                setHours={setHours}
                services={services}
                bedroomOptions={bedroomOptions}
                addOns={addOns}
                selectedServiceData={selectedServiceData}
                canProceedStep1={canProceedStep1}
                calculatePrice={calculatePrice}
                setStep={setStep}
              />
            )}

            {step === 2 && (
              <ScheduleSelection
                date={date}
                setDate={setDate}
                timeSlot={timeSlot}
                setTimeSlot={setTimeSlot}
                canProceedStep2={canProceedStep2}
                setStep={setStep}
              />
            )}

            {step === 3 && (
              <ContactDetails
                formData={formData}
                setFormData={setFormData}
                canProceedStep3={canProceedStep3}
                setStep={setStep}
              />
            )}

            {step === 4 && (
              <ReviewConfirmation
                selectedServiceData={selectedServiceData}
                selectedBedroomData={selectedBedroomData}
                hours={hours}
                selectedAddOns={selectedAddOns}
                addOns={addOns}
                date={date}
                timeSlot={timeSlot}
                formData={formData}
                calculatePrice={calculatePrice}
                setStep={setStep}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </section>

      <TrustBadges />
      <EcoProductsBanner />
    </div>
  );
}

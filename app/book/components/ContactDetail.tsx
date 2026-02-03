import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "./types";

interface ContactDetailsProps {
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  canProceedStep3: boolean;
  setStep: (step: number) => void;
}

export function ContactDetails({
  formData,
  setFormData,
  canProceedStep3,
  setStep,
}: ContactDetailsProps) {
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
        Your Details
      </h2>

      <form className="bg-card rounded-2xl p-8 border border-border">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="John"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Doe"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(416) 555-0123"
              className="mt-2"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="123 Main Street, Apt 4B"
              className="mt-2"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Toronto"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                placeholder="M5V 1J1"
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">
              Special Instructions (Optional)
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Any special requests or access instructions..."
              className="mt-2"
              rows={4}
            />
          </div>
        </div>
      </form>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button
          variant="accent"
          size="lg"
          onClick={() => setStep(4)}
          disabled={!canProceedStep3}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
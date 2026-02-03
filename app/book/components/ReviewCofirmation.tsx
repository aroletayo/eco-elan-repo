import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { format } from "date-fns";
import { Service, BedroomOption, AddOn, FormData } from "./types";

interface ReviewConfirmationProps {
  selectedServiceData: Service | undefined;
  selectedBedroomData: BedroomOption | undefined;
  hours: number;
  selectedAddOns: string[];
  addOns: AddOn[];
  date: Date | undefined;
  timeSlot: string;
  formData: FormData;
  calculatePrice: () => number;
  setStep: (step: number) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
}

export function ReviewConfirmation({
  selectedServiceData,
  selectedBedroomData,
  hours,
  selectedAddOns,
  addOns,
  date,
  timeSlot,
  formData,
  calculatePrice,
  setStep,
  handleSubmit,
  isSubmitting,
}: ReviewConfirmationProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
        Review & Confirm
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-display font-semibold text-primary mb-4">
              Service Details
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex justify-between">
                <span>Service:</span>
                <span className="font-medium text-primary">
                  {selectedServiceData?.name}
                </span>
              </div>
              {!selectedServiceData?.isHourly && (
                <div className="flex justify-between">
                  <span>Property Size:</span>
                  <span className="font-medium text-primary">
                    {selectedBedroomData?.label}
                  </span>
                </div>
              )}
              {selectedServiceData?.isHourly && (
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium text-primary">
                    {hours} hours
                  </span>
                </div>
              )}
              {selectedAddOns.length > 0 && (
                <div className="pt-3 border-t border-border">
                  <span className="block mb-2">Add-ons:</span>
                  {selectedAddOns.map((id) => {
                    const addOn = addOns.find((a) => a.id === id);
                    return (
                      <div
                        key={id}
                        className="flex justify-between text-sm"
                      >
                        <span>{addOn?.name}</span>
                        <span>+${addOn?.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-display font-semibold text-primary mb-4">
              Schedule
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium text-primary">
                  {date && format(date, "PPP")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-medium text-primary">
                  {timeSlot}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="font-display font-semibold text-primary mb-4">
              Contact Information
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong>Name:</strong> {formData.firstName}{" "}
                {formData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              <p>
                <strong>Address:</strong> {formData.address},{" "}
                {formData.city} {formData.postalCode}
              </p>
              {formData.notes && (
                <p>
                  <strong>Notes:</strong> {formData.notes}
                </p>
              )}
            </div>
          </div>

          <div className="bg-accent/10 rounded-2xl p-6 border-2 border-accent">
            <div className="flex justify-between items-center">
              <span className="font-display text-lg font-semibold text-primary">
                Total
              </span>
              <span className="font-display text-3xl font-bold text-accent">
                ${calculatePrice()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Payment will be collected after service completion
            </p>
          </div>

          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Leaf className="w-5 h-5 text-accent mt-0.5" />
            <p>
              All our cleaning services use 100% eco-friendly,
              plant-based products that are safe for your family,
              pets, and the environment.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => setStep(3)}>
          Back
        </Button>
        <Button
          variant="accent"
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Confirming..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}
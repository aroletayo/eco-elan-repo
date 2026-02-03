import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { Service, BedroomOption, AddOn, BookingStepProps } from "./types";

interface ServiceSelectionProps extends Pick<BookingStepProps,
  | 'selectedService'
  | 'setSelectedService'
  | 'bedrooms'
  | 'setBedrooms'
  | 'selectedAddOns'
  | 'toggleAddOn'
  | 'hours'
  | 'setHours'
  | 'services'
  | 'bedroomOptions'
  | 'addOns'
  | 'selectedServiceData'
  | 'canProceedStep1'
  | 'calculatePrice'
  | 'setStep'
> {}

export function ServiceSelection({
  selectedService,
  setSelectedService,
  bedrooms,
  setBedrooms,
  selectedAddOns,
  toggleAddOn,
  hours,
  setHours,
  services,
  bedroomOptions,
  addOns,
  selectedServiceData,
  canProceedStep1,
  calculatePrice,
  setStep,
}: ServiceSelectionProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
        Choose Your Service
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={cn(
              "p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg",
              selectedService === service.id
                ? "border-accent bg-accent/5"
                : "border-border bg-card hover:border-accent/50"
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  selectedService === service.id
                    ? "bg-accent"
                    : "bg-muted"
                )}
              >
                <service.icon
                  className={cn(
                    "w-6 h-6",
                    selectedService === service.id
                      ? "text-accent-foreground"
                      : "text-primary"
                  )}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-primary mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {service.description}
                </p>
                <p className="text-accent font-semibold">
                  From ${service.basePrice}
                  {service.isHourly ? "/hour" : ""}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedService && !selectedServiceData?.isHourly && (
        <div className="bg-muted rounded-2xl p-6 mb-8">
          <Label className="text-primary font-semibold mb-4 block">
            Property Size
          </Label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select number of bedrooms" />
            </SelectTrigger>
            <SelectContent>
              {bedroomOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedService && selectedServiceData?.isHourly && (
        <div className="bg-muted rounded-2xl p-6 mb-8">
          <Label className="text-primary font-semibold mb-4 block">
            Number of Hours
          </Label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setHours(Math.max(1, hours - 1))}
              disabled={hours <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-2xl font-bold text-primary w-12 text-center">
              {hours}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setHours(Math.min(8, hours + 1))}
              disabled={hours >= 8}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <span className="text-muted-foreground">hours</span>
          </div>
        </div>
      )}

      {selectedService && selectedService !== "office" && (
        <div className="bg-muted rounded-2xl p-6 mb-8">
          <Label className="text-primary font-semibold mb-4 block">
            Add-On Services (Optional)
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {addOns.map((addOn) => (
              <button
                key={addOn.id}
                onClick={() => toggleAddOn(addOn.id)}
                className={cn(
                  "p-4 rounded-xl border-2 text-left transition-all",
                  selectedAddOns.includes(addOn.id)
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50"
                )}
              >
                <p className="font-medium text-primary text-sm">
                  {addOn.name}
                </p>
                <p className="text-accent font-semibold">
                  +${addOn.price}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-left">
          {canProceedStep1 && (
            <p className="text-2xl font-bold text-accent">
              ${calculatePrice()}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                estimated
              </span>
            </p>
          )}
        </div>
        <Button
          variant="accent"
          size="lg"
          onClick={() => setStep(2)}
          disabled={!canProceedStep1}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
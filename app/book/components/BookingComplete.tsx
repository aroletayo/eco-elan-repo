import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

interface BookingCompleteProps {
  email: string;
  selectedServiceName?: string;
  date?: Date;
  timeSlot: string;
  address: string;
  city: string;
  calculatePrice: () => number;
}

export function BookingComplete({
  email,
  selectedServiceName,
  date,
  timeSlot,
  address,
  city,
  calculatePrice,
}: BookingCompleteProps) {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for choosing eco-elan. we have sent a confirmation email
              to <strong>{email}</strong>
            </p>

            <div className="bg-muted rounded-2xl p-8 text-left mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                Booking Details
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong>Service:</strong> {selectedServiceName}
                </p>
                <p>
                  <strong>Date:</strong> {date && format(date, "PPP")}
                </p>
                <p>
                  <strong>Time:</strong> {timeSlot}
                </p>
                <p>
                  <strong>Address:</strong> {address}, {city}
                </p>
                <p className="text-xl font-semibold text-primary pt-4 border-t border-border">
                  Total: ${calculatePrice()}
                </p>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              onClick={() => (window.location.href = "/")}
            >
              Return Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

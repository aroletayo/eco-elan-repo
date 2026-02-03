import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";

interface ScheduleSelectionProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  timeSlot: string;
  setTimeSlot: (timeSlot: string) => void;
  canProceedStep2: boolean;
  setStep: (step: number) => void;
}

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export function ScheduleSelection({
  date,
  setDate,
  timeSlot,
  setTimeSlot,
  canProceedStep2,
  setStep,
}: ScheduleSelectionProps) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
        Pick Your Date & Time
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <Label className="text-primary font-semibold mb-4 block">
            <CalendarIcon className="w-4 h-4 inline mr-2" />
            Select Date
          </Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            className="rounded-md pointer-events-auto"
          />
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <Label className="text-primary font-semibold mb-4 block">
            <Clock className="w-4 h-4 inline mr-2" />
            Select Time
          </Label>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setTimeSlot(slot)}
                className={cn(
                  "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                  timeSlot === slot
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border hover:border-accent/50"
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button
          variant="accent"
          size="lg"
          onClick={() => setStep(3)}
          disabled={!canProceedStep2}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

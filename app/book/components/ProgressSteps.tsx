import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface ProgressStepsProps {
  step: number;
}

const steps = [
  { num: 1, label: "Service" },
  { num: 2, label: "Schedule" },
  { num: 3, label: "Details" },
  { num: 4, label: "Confirm" },
];

export function ProgressSteps({ step }: ProgressStepsProps) {
  return (
    <section className="py-8 border-b border-border bg-muted/30">
      <div className="container-custom">
        <div className="flex justify-center items-center gap-4 md:gap-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 md:gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                  step >= s.num
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span
                className={cn(
                  "hidden md:block font-medium",
                  step >= s.num ? "text-primary" : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
              {i < 3 && (
                <div
                  className={cn(
                    "w-8 md:w-16 h-0.5 transition-all",
                    step > s.num ? "bg-accent" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

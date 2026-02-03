import { Leaf, CheckCircle2, Clock, Home } from "lucide-react";

export function TrustBadges() {
  const badges = [
    { icon: Leaf, text: "100% Eco-Friendly" },
    { icon: CheckCircle2, text: "Satisfaction Guaranteed" },
    { icon: Clock, text: "Flexible Scheduling" },
    { icon: Home, text: "Insured & Vetted Staff" },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <p className="font-medium text-primary">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
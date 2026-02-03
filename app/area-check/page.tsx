"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const serviceAreas = [
  "Toronto", "Mississauga", "Brampton", "Etobicoke", "North York",
  "Scarborough", "Vaughan", "Ajax", "Oakville", "Whitby", "Pickering",
  "Oshawa", "Burlington", "Hamilton", "Markham", "Newmarket", "Richmond Hill"
];

export default function AreaCheckPage() {
  const [location, setLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ inArea: boolean; city: string } | null>(null);

  const checkLocation = async () => {
    setIsLoading(true);
    setResult(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const city = data.city || data.locality || "Unknown";
            
            const inArea = serviceAreas.some(area => 
              city.toLowerCase().includes(area.toLowerCase()) || 
              area.toLowerCase().includes(city.toLowerCase())
            );
            
            setResult({ inArea, city });
            setLocation(city);
          } catch (error) {
            console.error("Error getting location:", error);
            setResult({ inArea: false, city: "Unable to determine location" });
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setResult({ inArea: false, city: "Location access denied" });
          setIsLoading(false);
        }
      );
    } else {
      setResult({ inArea: false, city: "Geolocation not supported" });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-light to-background">
      <div className="container-custom section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Check Your Service Area
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            We'll use your location to check if we service your area
          </p>

          <div className="bg-card rounded-3xl p-8 shadow-eco-lg mb-8">
            <MapPin className="w-16 h-16 text-accent mx-auto mb-6" />
            
            <Button 
              onClick={checkLocation} 
              disabled={isLoading}
              variant="accent" 
              size="lg"
              className="mb-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Checking Location...
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5 mr-2" />
                  Check My Location
                </>
              )}
            </Button>

            {result && (
              <div className="mt-6 p-6 rounded-2xl border-2 border-border">
                {result.inArea ? (
                  <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="font-display text-2xl font-bold text-primary mb-2">
                      Great News!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We service {result.city}! You can book our eco-friendly cleaning services.
                    </p>
                    <Button variant="accent" asChild>
                      <Link href="/book">Book Now</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <h3 className="font-display text-2xl font-bold text-primary mb-2">
                      Not Yet Available
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We don't currently service {result.city}, but we're expanding!
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-eco-sm">
            <h3 className="font-display text-xl font-semibold text-primary mb-4">
              Current Service Areas
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {serviceAreas.map((area) => (
                <span 
                  key={area}
                  className="px-3 py-1 bg-eco-green-light text-accent rounded-full text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
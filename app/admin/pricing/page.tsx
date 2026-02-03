'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';

interface PricingData {
  services: {
    standard: number;
    deep: number;
    moveinout: number;
    airbnb: number;
    office: number;
  };
  subscriptions: {
    weekly: number;
    biweekly: number;
    monthly: number;
  };
  addons: {
    fridge: number;
    oven: number;
    windows: number;
    cabinets: number;
    laundry: number;
    balcony: number;
  };
}

const defaultPricing: PricingData = {
  services: {
    standard: 110,
    deep: 200,
    moveinout: 240,
    airbnb: 120,
    office: 50,
  },
  subscriptions: {
    weekly: 95,
    biweekly: 105,
    monthly: 115,
  },
  addons: {
    fridge: 20,
    oven: 25,
    windows: 10,
    cabinets: 30,
    laundry: 25,
    balcony: 25,
  },
};

const AdminPricing = () => {
  const { toast } = useToast();
  const [pricing, setPricing] = useState<PricingData>(defaultPricing);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const docRef = doc(db, 'settings', 'pricing');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPricing(docSnap.data() as PricingData);
        }
      } catch (error) {
        console.error('Error fetching pricing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'pricing'), pricing);
      toast({
        title: "Pricing saved",
        description: "All pricing changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save pricing.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateServicePrice = (key: keyof PricingData['services'], value: number) => {
    setPricing(prev => ({
      ...prev,
      services: { ...prev.services, [key]: value }
    }));
  };

  const updateSubscriptionPrice = (key: keyof PricingData['subscriptions'], value: number) => {
    setPricing(prev => ({
      ...prev,
      subscriptions: { ...prev.subscriptions, [key]: value }
    }));
  };

  const updateAddonPrice = (key: keyof PricingData['addons'], value: number) => {
    setPricing(prev => ({
      ...prev,
      addons: { ...prev.addons, [key]: value }
    }));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pricing</h1>
          <p className="text-muted-foreground">Manage service and subscription prices</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Service Prices */}
        <Card>
          <CardHeader>
            <CardTitle>Service Prices</CardTitle>
            <CardDescription>Base prices for each cleaning service (in dollars)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="standard">Standard Eco Cleaning</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="standard"
                    type="number"
                    value={pricing.services.standard}
                    onChange={(e) => updateServicePrice('standard', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deep">Deep Eco Cleaning</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="deep"
                    type="number"
                    value={pricing.services.deep}
                    onChange={(e) => updateServicePrice('deep', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="moveinout">Move-In / Move-Out</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="moveinout"
                    type="number"
                    value={pricing.services.moveinout}
                    onChange={(e) => updateServicePrice('moveinout', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="airbnb">Airbnb Turnover</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="airbnb"
                    type="number"
                    value={pricing.services.airbnb}
                    onChange={(e) => updateServicePrice('airbnb', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="office">Office Cleaning (per hour)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="office"
                    type="number"
                    value={pricing.services.office}
                    onChange={(e) => updateServicePrice('office', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Prices */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan Prices</CardTitle>
            <CardDescription>Base prices for recurring cleaning plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weekly">Weekly Plan</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="weekly"
                    type="number"
                    value={pricing.subscriptions.weekly}
                    onChange={(e) => updateSubscriptionPrice('weekly', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="biweekly">Bi-Weekly Plan</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="biweekly"
                    type="number"
                    value={pricing.subscriptions.biweekly}
                    onChange={(e) => updateSubscriptionPrice('biweekly', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly">Monthly Plan</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="monthly"
                    type="number"
                    value={pricing.subscriptions.monthly}
                    onChange={(e) => updateSubscriptionPrice('monthly', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add-on Prices */}
        <Card>
          <CardHeader>
            <CardTitle>Add-On Service Prices</CardTitle>
            <CardDescription>Prices for optional add-on services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fridge">Inside Fridge</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="fridge"
                    type="number"
                    value={pricing.addons.fridge}
                    onChange={(e) => updateAddonPrice('fridge', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="oven">Inside Oven</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="oven"
                    type="number"
                    value={pricing.addons.oven}
                    onChange={(e) => updateAddonPrice('oven', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="windows">Windows (Interior)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="windows"
                    type="number"
                    value={pricing.addons.windows}
                    onChange={(e) => updateAddonPrice('windows', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cabinets">Inside Cabinets</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="cabinets"
                    type="number"
                    value={pricing.addons.cabinets}
                    onChange={(e) => updateAddonPrice('cabinets', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="laundry">Laundry</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="laundry"
                    type="number"
                    value={pricing.addons.laundry}
                    onChange={(e) => updateAddonPrice('laundry', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="balcony">Balcony Cleaning</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="balcony"
                    type="number"
                    value={pricing.addons.balcony}
                    onChange={(e) => updateAddonPrice('balcony', Number(e.target.value))}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPricing;
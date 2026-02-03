'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

export const usePricing = () => {
  const [pricing, setPricing] = useState<PricingData>(defaultPricing);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'pricing'), (doc) => {
      if (doc.exists()) {
        setPricing(doc.data() as PricingData);
      } else {
        // If no pricing data exists, use defaults and save them
        setPricing(defaultPricing);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching pricing:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { pricing, loading };
};
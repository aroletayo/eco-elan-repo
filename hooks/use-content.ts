import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ContentData {
  hero: {
    title: string;
    accentText: string;
    subtitle: string;
    ctaText: string;
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    standardTitle: string;
    standardDescription: string;
    deepTitle: string;
    deepDescription: string;
    airbnbTitle: string;
    airbnbDescription: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
  };
}

const defaultContent: ContentData = {
  hero: {
    title: 'Cleaning That Cares for Your Home',
    accentText: 'and the Planet',
    subtitle: 'Professional cleaning services using 100% eco-safe products. Good for your home, great for the planet.',
    ctaText: 'Book Now',
  },
  services: {
    sectionTitle: 'Our Services',
    sectionSubtitle: 'Choose from our range of eco-friendly cleaning options',
    standardTitle: 'Standard Eco Cleaning',
    standardDescription: 'Regular maintenance clean with eco-safe products',
    deepTitle: 'Deep Eco Cleaning',
    deepDescription: 'Full-detail premium clean for buildup or seasonal resets',
    airbnbTitle: 'Airbnb Turnover',
    airbnbDescription: 'Fast, consistent turnover service for rentals',
  },
  about: {
    title: 'About Eco Elan',
    description: 'We are a team of professional cleaners dedicated to providing eco-friendly cleaning services.',
    mission: 'Our mission is to provide exceptional cleaning while protecting the environment.',
  },
  contact: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    phone: '+1(437) 2654977',
    email: 'info@eco-elan.com',
    address: '123 Green Street, Eco City, EC 12345',
  },
};

export const useContent = () => {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent({ ...defaultContent, ...docSnap.data() as ContentData });
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return { content, loading };
};
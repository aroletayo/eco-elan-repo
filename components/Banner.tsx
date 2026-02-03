'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { X } from 'lucide-react';

interface BannerData {
  enabled: boolean;
  text: string;
  backgroundColor: string;
  textColor: string;
  bannerType: 'color' | 'backgroundImage' | 'sideImage';
  backgroundImageUrl: string;
  sideImageUrl: string;
  sideImagePosition: 'left' | 'right';
}

const Banner = () => {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'banner'), (doc) => {
      if (doc.exists()) {
        setBanner(doc.data() as BannerData);
      } else {
        setBanner(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!banner || !banner.enabled || !isVisible) {
    return null;
  }

  const getBannerStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      backgroundColor: banner.backgroundColor,
      color: banner.textColor,
    };

    if (banner.bannerType === 'backgroundImage' && banner.backgroundImageUrl) {
      style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${banner.backgroundImageUrl})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
    }

    return style;
  };

  return (
    <div
      className="relative py-3 px-4 text-center font-medium flex items-center justify-center gap-4"
      style={getBannerStyle()}
    >
      {banner.bannerType === 'sideImage' && banner.sideImageUrl && banner.sideImagePosition === 'left' && (
        <img src={banner.sideImageUrl} alt="Banner" className="h-8 w-auto object-contain" />
      )}
      <span className="flex-1">{banner.text}</span>
      {banner.bannerType === 'sideImage' && banner.sideImageUrl && banner.sideImagePosition === 'right' && (
        <img src={banner.sideImageUrl} alt="Banner" className="h-8 w-auto object-contain" />
      )}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Banner;
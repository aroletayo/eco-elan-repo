"use client";

import { useEffect, useState } from "react";
import { ArrowBigUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed animate-bounce bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-eco-green text-white p-3 shadow-lg hover:opacity-80 transition"
    >
      <ArrowBigUp size={18} />
    </button>
  );
};

export default BackToTop;

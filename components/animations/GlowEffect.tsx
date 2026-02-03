"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowEffectProps {
  children: ReactNode;
  color?: string;
  intensity?: number;
  className?: string;
}

export function GlowEffect({ 
  children, 
  color = "rgba(34, 197, 94, 0.3)",
  intensity = 20,
  className = ""
}: GlowEffectProps) {
  return (
    <motion.div
      whileHover={{
        boxShadow: `0 0 ${intensity}px ${color}, 0 0 ${intensity * 2}px ${color}`,
        scale: 1.02
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
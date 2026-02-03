"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  intensity?: number;
  className?: string;
}

export function FloatingCard({ 
  children, 
  delay = 0,
  duration = 3,
  intensity = 10,
  className = ""
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        y: [0, -intensity, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        opacity: { duration: 0.6, delay }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
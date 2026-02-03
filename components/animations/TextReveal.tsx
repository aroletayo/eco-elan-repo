"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function TextReveal({ 
  children, 
  delay = 0,
  duration = 0.8,
  className = ""
}: TextRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
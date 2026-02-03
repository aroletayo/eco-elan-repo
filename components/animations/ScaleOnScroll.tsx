"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScaleOnScrollProps {
  children: ReactNode;
  scaleRange?: [number, number];
  className?: string;
}

export function ScaleOnScroll({ 
  children, 
  scaleRange = [0.8, 1],
  className = ""
}: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
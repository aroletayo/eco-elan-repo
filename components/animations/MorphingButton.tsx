"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MorphingButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MorphingButton({ 
  children, 
  className = "",
  onClick
}: MorphingButtonProps) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      className={className}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}
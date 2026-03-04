"use client";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { colors } from "@/constants/colors";
import type { CardProps } from "@/types/resume";

const Card = ({
  children,
  className,
  animate = true,
  delay = 0,
  ...props
}: CardProps) => {
  return (
    <motion.div
      {...props}
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "backdrop-blur-xl border rounded-2xl p-6 shadow-2xl",
        className,
      )}
      style={{
        background: colors.background.card,
        borderColor: colors.border.glass,
      }}
    >
      {children}
    </motion.div>
  );
};

export { Card };

"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { colors } from "@/constants/colors";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary: `bg-gradient-to-r ${colors.primary.gradient} text-slate-950 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40`,
      secondary: `bg-gradient-to-r ${colors.secondary.gradient} text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40`,
      outline:
        "border border-slate-700/60 bg-transparent hover:bg-white/5 text-slate-200",
      ghost: "bg-transparent hover:bg-white/5 text-slate-300",
    };

    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/40",

          size === "lg" && "h-14 px-8 text-lg rounded-2xl",
          size === "md" && "h-11 px-5 rounded-xl",
          size === "sm" && "h-8 px-3 text-sm rounded-lg",
          !isDisabled && "cursor-pointer",
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",

          variants[variant],
          className,
        )}
        {...props}
      >
        <span className="flex items-center justify-center">
          {isLoading && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
          )}
          {children}
        </span>
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export { Button };

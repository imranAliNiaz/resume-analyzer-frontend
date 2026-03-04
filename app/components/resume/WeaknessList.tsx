"use client";

import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { colors } from "@/constants/colors";
import type { WeaknessListProps } from "@/types/resume";

const WeaknessList = ({ weaknesses }: WeaknessListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <AlertCircle className="text-red-500" size={20} />
        Areas for Improvement
      </h3>
      <ul className="space-y-3">
        {weaknesses.map((weakness, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-xl"
          >
            <div className="mt-1 flex-shrink-0">
              <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: colors.text.secondary }}
            >
              {weakness}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export { WeaknessList };

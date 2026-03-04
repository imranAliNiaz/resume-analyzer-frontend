"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { colors } from "@/constants/colors";
import type { StrengthListProps } from "@/types/resume";

const StrengthList = ({ strengths }: StrengthListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <CheckCircle2 className="text-emerald-500" size={20} />
        Key Strengths
      </h3>
      <ul className="space-y-3">
        {strengths.map((strength, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="flex items-start gap-3 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"
          >
            <div className="mt-1 flex-shrink-0">
              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: colors.text.secondary }}
            >
              {strength}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export { StrengthList };

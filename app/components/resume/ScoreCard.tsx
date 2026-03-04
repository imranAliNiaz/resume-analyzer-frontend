"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import type { ScoreCardProps } from "@/types/resume";
import type { RecommendationType } from "@/types/evaluation";

const ScoreCard = ({ score, recommendation }: ScoreCardProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  const getRecommendationColor = (rec: RecommendationType) => {
    switch (rec) {
      case "Hire":
        return "success";
      case "Consider":
        return "warning";
      case "Reject":
        return "danger";
      default:
        return "neutral";
    }
  };

  const scoreColor =
    score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <Card className="flex flex-col items-center justify-center py-10 space-y-6 relative overflow-hidden group">
      <div
        className="absolute inset-0 opacity-10 blur-[80px] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: scoreColor }}
      />

      <div className="relative">
        <svg className="w-40 h-40 transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-800"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={440}
            initial={{ strokeDashoffset: 440 }}
            animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ color: scoreColor }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-bold text-white drop-shadow-lg"
          >
            {displayScore}
          </motion.span>
          <span className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
            Match Score
          </span>
        </div>
      </div>

      <div className="text-center relative z-10">
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">
          Recommendation
        </p>
        <Badge
          variant={getRecommendationColor(recommendation)}
          className="text-sm px-6 py-1.5 shadow-lg border-white/10"
        >
          {recommendation}
        </Badge>
      </div>
    </Card>
  );
};

export { ScoreCard };

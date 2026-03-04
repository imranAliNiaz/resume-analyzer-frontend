"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative h-16 w-16">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-full bg-gradient-to-tr from-cyan-500 via-sky-500 to-emerald-500 blur-sm"
        />
        <div className="absolute inset-2 bg-slate-950 rounded-lg backdrop-blur-md flex items-center justify-center">
          <div className="h-4 w-4 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </div>
      <p className="text-slate-400 text-sm font-medium animate-pulse">
        Analyzing with AI...
      </p>
    </div>
  );
};

export { Loader };

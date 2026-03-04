"use client";

import { cn } from "@/lib/utils";
import { colors } from "@/constants/colors";
import type { JobDescriptionInputProps } from "@/types/resume";

const JobDescriptionInput = ({
  value,
  onChange,
  className,
}: JobDescriptionInputProps) => {
  return (
    <div className={cn("w-full space-y-3", className)}>
      <label className="text-sm font-medium text-slate-300 ml-1">
        Job Description (Optional)
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here to get a tailored analysis..."
        className="w-full h-40 border rounded-2xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none hover:border-white/20"
        style={{
          background: colors.background.surface,
          borderColor: colors.border.glass,
        }}
      />
    </div>
  );
};

export { JobDescriptionInput };

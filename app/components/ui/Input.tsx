import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";
import { colors } from "@/constants/colors";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label ? (
          <label className="text-sm font-medium text-slate-300 ml-1">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          className={cn(
            "w-full border rounded-xl px-4 py-2.5 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all",
            error
              ? "border-red-500/50 focus:ring-red-500/30"
              : "hover:border-white/20",
            className,
          )}
          style={{
            background: colors.background.surface,
            borderColor: error ? colors.status.danger : colors.border.glass,
          }}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

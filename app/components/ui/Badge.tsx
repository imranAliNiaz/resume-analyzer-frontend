import { cn } from "@/lib/utils";
import { colors } from "@/constants/colors";
import type { BadgeProps } from "@/types/resume";

const Badge = ({ children, variant = "neutral", className }: BadgeProps) => {
  const variants = {
    success: colors.status.success,
    warning: colors.status.warning,
    danger: colors.status.danger,
    info: colors.primary.solid,
    neutral: colors.text.muted,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider",
        className,
      )}
      style={{
        color: variants[variant],
        borderColor: `${variants[variant]}33`,
        backgroundColor: `${variants[variant]}1A`,
      }}
    >
      {children}
    </span>
  );
};

export { Badge };

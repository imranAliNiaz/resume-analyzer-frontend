"use client";

import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { colors } from "@/constants/colors";
import type { MatchBreakdownProps } from "@/types/resume";

const MatchBreakdown = ({ role, items }: MatchBreakdownProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Role Match
          </p>
          <h3 className="text-lg font-semibold text-white">{role}</h3>
        </div>
        <Badge variant="info">Skill Map</Badge>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="text-sm text-slate-200">{item.label}</span>
            <span
              className="flex items-center gap-2 text-xs"
              style={{
                color: item.matched
                  ? colors.status.success
                  : colors.status.danger,
              }}
            >
              {item.matched ? (
                <CheckCircle2 size={14} />
              ) : (
                <XCircle size={14} />
              )}
              {item.matched ? "Matched" : "Missing"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export { MatchBreakdown };

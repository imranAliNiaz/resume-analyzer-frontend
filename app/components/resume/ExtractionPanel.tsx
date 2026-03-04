"use client";

import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { colors } from "@/constants/colors";
import type { ExtractionPanelProps } from "@/types/resume";

const ExtractionPanel = ({
  name,
  title,
  skills,
  experience,
  education,
}: ExtractionPanelProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Extracted Profile
          </p>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-sm" style={{ color: colors.text.secondary }}>
            Target role: {title}
          </p>
        </div>
        <Badge variant="info">Structured</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h4 className="text-sm font-semibold text-white mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2 text-xs text-slate-200">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h4 className="text-sm font-semibold text-white mb-2">Experience</h4>
          <ul
            className="space-y-2 text-xs"
            style={{ color: colors.text.secondary }}
          >
            {experience.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h4 className="text-sm font-semibold text-white mb-2">Education</h4>
          <ul
            className="space-y-2 text-xs"
            style={{ color: colors.text.secondary }}
          >
            {education.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export { ExtractionPanel };

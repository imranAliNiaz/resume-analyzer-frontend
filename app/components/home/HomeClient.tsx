"use client";

import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import {
  ArrowRight,
  Brain,
  FileSearch,
  Layers,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { useHomeLogic } from "@/hooks/useHomeLogic";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomeClient() {
  const { latestAnalysis, handleExploreReport, handleAnalyzeClick } =
    useHomeLogic();

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full blur-[140px] bg-cyan-500/10" />
        <div className="absolute left-0 bottom-0 h-[380px] w-[380px] rounded-full blur-[140px] bg-sky-500/10" />
      </div>

      <section className="px-4 sm:px-6 lg:px-8 pb-24 pt-20 sm:pb-32 max-w-[1536px] mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-24 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={rise}>
              <Badge variant="info" className="mb-4">
                Transparent Hiring Intelligence
              </Badge>
            </motion.div>
            <motion.h1
              variants={rise}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white"
              style={{ fontFamily: fonts.headings }}
            >
              Explainable resume analysis for{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                smarter hiring decisions
              </span>
              .
            </motion.h1>
            <motion.p
              variants={rise}
              className="text-lg leading-8 max-w-2xl"
              style={{ color: colors.text.secondary }}
            >
              Parse PDF/DOCX/TXT resumes, extract structured insights, and score
              candidates against a target role with transparent reasoning.
            </motion.p>

            <motion.div variants={rise} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 w-full sm:w-auto"
                onClick={handleAnalyzeClick}
              >
                Analyze Resume <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Sample Report
              </Button>
            </motion.div>

            <motion.div
              variants={rise}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                { label: "Avg. time", value: "2.1s" },
                { label: "Explainability", value: "100%" },
                { label: "Formats", value: "PDF/DOCX/TXT" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={rise}
            className="relative mx-auto max-w-lg w-full lg:max-w-none"
          >
            <Card className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                    <FileSearch className="text-cyan-300" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">AI Report</p>
                    <p className="text-xs text-slate-400">
                      {latestAnalysis
                        ? latestAnalysis.extracted?.candidate_name ||
                          "Latest Position"
                        : "Senior UX Engineer"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    latestAnalysis
                      ? latestAnalysis.recommendation === "Hire"
                        ? "success"
                        : latestAnalysis.recommendation === "Consider"
                          ? "warning"
                          : "danger"
                      : "success"
                  }
                >
                  {latestAnalysis?.recommendation || "Hire"}
                </Badge>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Match Score</p>
                    <p className="text-3xl md:text-4xl font-semibold text-white">
                      {latestAnalysis?.score || 89}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Role Fit</p>
                    <p className="text-sm text-cyan-300">
                      {latestAnalysis
                        ? latestAnalysis.score >= 80
                          ? "Strong alignment"
                          : latestAnalysis.score >= 60
                            ? "Good fit"
                            : "Limited match"
                        : "Strong alignment"}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {(
                    latestAnalysis?.extracted?.skills?.slice(0, 3) || [
                      "Design systems",
                      "Figma workflows",
                      "Leadership",
                    ]
                  ).map((item: string) => (
                    <div
                      key={item}
                      className="flex items-center justify-between text-xs text-slate-300"
                    >
                      <span className="truncate max-w-[150px] md:max-w-[200px]">
                        {item}
                      </span>
                      <span className="text-emerald-300">Matched</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 truncate">
                  {latestAnalysis?.extracted?.experience?.[0]?.slice(0, 25) ||
                    "4 years experience"}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  {latestAnalysis?.extracted?.skills?.length || 12} skills
                  extracted
                </div>
              </div>
            </Card>

            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl hidden sm:block" />
            <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl hidden sm:block" />
          </motion.div>
        </motion.div>
      </section>

      <section id="workflow" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <Badge variant="info">Workflow</Badge>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Built for real-world recruiting
            </h2>
            <p className="text-slate-400">
              Each resume is parsed, structured, matched to the role, and scored
              with transparent reasoning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              {
                icon: <Layers size={20} />,
                title: "Parse",
                body: "PDF, DOCX, TXT support with robust extraction.",
              },
              {
                icon: <Brain size={20} />,
                title: "Extract",
                body: "Skills, experience, education, and impact.",
              },
              {
                icon: <Target size={20} />,
                title: "Match",
                body: "Role-aligned keywords and seniority fit.",
              },
              {
                icon: <TrendingUp size={20} />,
                title: "Score",
                body: "0–100 score with explainable weighting.",
              },
              {
                icon: <ShieldCheck size={20} />,
                title: "Recommend",
                body: "Hire, Consider, or Reject with rationale.",
              },
            ].map((step) => (
              <Card
                key={step.title}
                className="p-5 flex flex-col items-start text-left"
              >
                <div className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400">{step.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="report" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 lg:max-w-xl">
            <Badge variant="info">Report</Badge>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Structured insights that hiring teams trust
            </h2>
            <p className="text-slate-400">
              The report highlights strengths, weaknesses, and a transparent
              rationale for the final recommendation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                "Skills coverage map",
                "Experience impact highlights",
                "Education verification",
                "Role-fit reasoning",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">
                    Candidate Snapshot
                  </p>
                  <p className="text-xl font-semibold text-white">
                    {latestAnalysis?.extracted?.candidate_name ||
                      "Aanya Sharma"}
                  </p>
                </div>
                <Badge
                  variant={
                    latestAnalysis
                      ? latestAnalysis.recommendation === "Hire"
                        ? "success"
                        : latestAnalysis.recommendation === "Consider"
                          ? "warning"
                          : "danger"
                      : "warning"
                  }
                >
                  {latestAnalysis?.recommendation || "Consider"}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 truncate">
                  {latestAnalysis?.extracted?.experience?.[0]?.slice(0, 25) ||
                    "7 years experience"}
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  {latestAnalysis?.match?.length || 9}/12 skills matched
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-slate-300 line-clamp-2 italic">
                  Strengths:{" "}
                  <span className="not-italic">
                    {latestAnalysis?.strengths?.join(", ") ||
                      "Product strategy, stakeholder management, experimentation."}
                  </span>
                </p>
                <p className="text-slate-400 line-clamp-2 italic">
                  Gaps:{" "}
                  <span className="not-italic">
                    {latestAnalysis?.weaknesses?.join(", ") ||
                      "No direct ATS optimization, limited ML exposure."}
                  </span>
                </p>
              </div>
              <Button
                size="md"
                className="w-full"
                onClick={handleExploreReport}
              >
                {latestAnalysis ? "View Full Report" : "Explore Sample Report"}
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

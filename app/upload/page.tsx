"use client";

import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { UploadForm } from "../components/resume/UploadForm";
import { JobDescriptionInput } from "../components/resume/JobDescriptionInput";
import { Input } from "../components/ui/Input";
import { ShieldCheck, Target, Zap } from "lucide-react";
import { colors } from "@/constants/colors";
import { AuthGuard } from "../components/auth/AuthGuard";
import { useAnalysis } from "@/hooks/useAnalysis";

export default function UploadPage() {
  const {
    jobDescription,
    setJobDescription,
    roleTitle,
    setRoleTitle,
    isAnalyzing,
    setFile,
    canAnalyze,
    handleAnalyze,
  } = useAnalysis();

  return (
    <AuthGuard>
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16 space-y-3"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-semibold">
            Resume Analyzer
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Upload & evaluate with explainable AI
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Provide a target role and optional job description so the agent can
            score fit, highlight strengths, and identify gaps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <Card className="p-6 md:p-10">
            <div className="space-y-6 md:space-y-8">
              <UploadForm onFileChange={setFile} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Input
                  label="Target Role"
                  placeholder="e.g. Data Analyst, Backend Engineer"
                  value={roleTitle}
                  onChange={(event) => setRoleTitle(event.target.value)}
                />
                <Input label="Location" placeholder="Optional" type="text" />
              </div>
              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
              />
            </div>

            <div className="mt-8 md:mt-12 flex justify-center">
              <Button
                size="lg"
                className="w-full sm:w-auto px-12 gap-2"
                isLoading={isAnalyzing}
                disabled={!canAnalyze}
                onClick={handleAnalyze}
              >
                {isAnalyzing ? "Processing..." : "Run Analysis"}
              </Button>
            </div>
          </Card>

          <div className="space-y-4 md:space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap size={18} className="text-amber-400" />
                Agent Evaluation
              </h3>
              <ul
                className="space-y-4 text-sm"
                style={{ color: colors.text.secondary }}
              >
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                  Skills coverage and missing role keywords
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                  Experience impact and measurable results
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                  Education completeness and relevance
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                  Overall fit score with decision rationale
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="grid grid-cols-1 gap-5 text-sm">
                <div className="flex items-center gap-3 group">
                  <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <Target size={16} className="text-cyan-300" />
                  </div>
                  <span
                    style={{ color: colors.text.secondary }}
                    className="group-hover:text-slate-200 transition-colors"
                  >
                    ATS-friendly parsing
                  </span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <ShieldCheck size={16} className="text-emerald-300" />
                  </div>
                  <span
                    style={{ color: colors.text.secondary }}
                    className="group-hover:text-slate-200 transition-colors"
                  >
                    Secure processing
                  </span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <Zap size={16} className="text-amber-300" />
                  </div>
                  <span
                    style={{ color: colors.text.secondary }}
                    className="group-hover:text-slate-200 transition-colors"
                  >
                    Results in under 3 seconds
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

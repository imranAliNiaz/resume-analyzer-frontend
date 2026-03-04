"use client";

import Link from "next/link";
import { ArrowLeft, Download, Share2, Brain } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ScoreCard } from "../components/resume/ScoreCard";
import { StrengthList } from "../components/resume/StrengthList";
import { WeaknessList } from "../components/resume/WeaknessList";
import { ExtractionPanel } from "../components/resume/ExtractionPanel";
import { MatchBreakdown } from "../components/resume/MatchBreakdown";
import { colors } from "@/constants/colors";
import { AuthGuard } from "../components/auth/AuthGuard";
import { useAppSelector } from "@/redux/hooks";

import { useAnalysisActions } from "@/hooks/useAnalysisActions";

export default function ResultsPage() {
  const analysis = useAppSelector((state) => state.analysis.analysis);
  const { handleShare, handleDownload } = useAnalysisActions(analysis);

  return (
    <AuthGuard>
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-[1536px] mx-auto pb-32">
        {!analysis ? (
          <Card className="p-8 md:p-12 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
              <ArrowLeft size={32} className="text-slate-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">
                No analysis yet
              </h2>
              <p className="text-sm" style={{ color: colors.text.secondary }}>
                Upload a resume to generate your first report.
              </p>
            </div>
            <Link href="/upload" className="block">
              <Button size="lg" className="w-full sm:w-auto">
                Go to Upload
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <Link href="/upload">
                <Button variant="ghost" className="gap-2 -ml-2 md:-ml-4 group">
                  <ArrowLeft
                    size={18}
                    className="transition-transform group-hover:-translate-x-1"
                  />{" "}
                  Back to Upload
                </Button>
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  className="gap-2 flex-grow sm:flex-grow-0"
                  onClick={handleShare}
                >
                  <Share2 size={18} /> Share
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 flex-grow sm:flex-grow-0"
                  onClick={handleDownload}
                >
                  <Download size={18} /> Download
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              <div className="lg:col-span-4 space-y-6 md:space-y-8">
                <ScoreCard
                  score={analysis.score}
                  recommendation={analysis.recommendation}
                />
                <Card className="p-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Brain size={18} className="text-cyan-400" />
                    AI Summary
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: colors.text.secondary }}
                  >
                    {analysis.extracted.summary}
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="text-white font-semibold mb-3">
                    Decision Details
                  </h4>
                  <div className="space-y-4">
                    <p
                      className="text-sm border-l-2 border-cyan-500/50 pl-4 py-1"
                      style={{ color: colors.text.secondary }}
                    >
                      {analysis.reasoning?.[0] ||
                        "Recommendation based on role match and experience."}
                    </p>
                    {analysis.reasoning
                      ?.slice(1, 4)
                      .map((r: string, i: number) => (
                        <p key={i} className="text-xs text-slate-400 pl-4">
                          {r}
                        </p>
                      ))}
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-8 space-y-6 md:space-y-8">
                <ExtractionPanel
                  name={analysis.extracted.candidate_name}
                  title={analysis.job_role || "Target Role"}
                  skills={analysis.extracted.skills}
                  experience={analysis.extracted.experience}
                  education={analysis.extracted.education}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <StrengthList strengths={analysis.strengths} />
                  <WeaknessList weaknesses={analysis.weaknesses} />
                </div>

                <MatchBreakdown role="Role Match" items={analysis.match} />

                <Card className="p-6">
                  <h4 className="text-white font-semibold mb-4">
                    Improvement Suggestions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.suggestions?.length ? (
                      analysis.suggestions.map((item: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex gap-3 text-sm p-3 rounded-xl bg-white/5 border border-white/5"
                        >
                          <span className="text-cyan-400 font-bold shrink-0">
                            {idx + 1}.
                          </span>
                          <span style={{ color: colors.text.secondary }}>
                            {item}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-sm text-slate-400">
                        No suggestions available.
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </AuthGuard>
  );
}

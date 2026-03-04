"use client";

import { useHistory } from "@/hooks/useHistory";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { colors } from "@/constants/colors";
import { AuthGuard } from "../components/auth/AuthGuard";
import { Clock, Eye, FileText, ArrowRight } from "lucide-react";

export default function HistoryPage() {
  const { history, loading, viewReport, router } = useHistory();

  return (
    <AuthGuard>
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-[1536px] mx-auto pb-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
              Analysis History
            </h1>
            <p
              className="text-sm md:text-base"
              style={{ color: colors.text.secondary }}
            >
              View and manage your previous resume reports.
            </p>
          </div>
          <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3 self-start sm:self-auto">
            <Clock size={20} className="text-cyan-400" />
            <div className="flex flex-col">
              <span className="text-white font-bold leading-tight">
                {history.length}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
                Reports
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Loading your history...</p>
          </div>
        ) : history.length === 0 ? (
          <Card className="p-12 text-center space-y-8 max-w-2xl mx-auto border-dashed border-white/10 bg-transparent">
            <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto ring-8 ring-white/[0.02]">
              <FileText size={48} className="text-slate-600" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                No history found
              </h2>
              <p
                className="text-sm md:text-base max-w-md mx-auto"
                style={{ color: colors.text.secondary }}
              >
                You haven&apos;t analyzed any resumes yet. Start by uploading a
                resume to generate your first report.
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => router.push("/upload")}
              className="px-8"
            >
              Upload Resume
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {history.map((item) => (
              <Card
                key={item.id}
                className="p-5 md:p-6 hover:bg-white/[0.04] transition-all border-white/5 hover:border-white/20 group cursor-pointer relative overflow-hidden"
                onClick={() => viewReport(item.id)}
              >
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold shrink-0 border border-white/5 transition-colors ${
                        item.score >= 80
                          ? "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20"
                          : item.score >= 60
                            ? "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20"
                      }`}
                    >
                      <span className="text-xl leading-none">{item.score}</span>
                      <span className="text-[10px] opacity-60 uppercase font-medium">
                        Score
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-cyan-300 transition-colors truncate">
                        {item.candidate_name || "Unknown Candidate"}
                      </h3>
                      <div className="text-sm text-slate-400 mb-1">
                        {item.job_role}
                      </div>
                      <div
                        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs"
                        style={{ color: colors.text.secondary }}
                      >
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="opacity-50" />
                          {new Date(
                            item.timestamp,
                          ).toLocaleDateString()} at{" "}
                          {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              item.recommendation === "Hire"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : item.recommendation === "Consider"
                                  ? "bg-amber-500/10 text-amber-500"
                                  : "bg-rose-500/10 text-rose-500"
                            }`}
                          >
                            {item.recommendation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:ml-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-slate-400 hover:text-white sm:opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 sm:translate-x-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        viewReport(item.id);
                      }}
                    >
                      <Eye size={18} />
                      <span className="sm:hidden">View Report</span>
                    </Button>
                    <div className="sm:block hidden group-hover:translate-x-1 transition-transform">
                      <ArrowRight
                        size={20}
                        className="text-slate-600 group-hover:text-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}

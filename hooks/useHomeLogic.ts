"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { authFetch } from "@/lib/api";
import { store, type AppDispatch } from "@/redux/store";
import { setAnalysis } from "@/redux/slices/analysisSlice";
import { useAuth } from "./useAuth";
import type { ResumeAnalysisResponse } from "@/types/analysis";

export const useHomeLogic = () => {
  const [latestAnalysis, setLatestAnalysis] =
    useState<ResumeAnalysisResponse | null>(null);
  const { isAuthenticated, login } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchLatestReport = async () => {
      try {
        const historyRes = await authFetch(
          "/resume/history",
          { method: "GET" },
          store.getState,
          dispatch as AppDispatch,
        );
        if (historyRes.ok) {
          const history = await historyRes.json();
          if (history && history.length > 0) {
            const latestId = history[0].id;
            const reportRes = await authFetch(
              `/resume/history/${latestId}`,
              { method: "GET" },
              store.getState,
              dispatch as AppDispatch,
            );
            if (reportRes.ok) {
              const fullReport = await reportRes.json();
              setLatestAnalysis(fullReport.analysis);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch latest report for landing page", error);
      }
    };

    if (isAuthenticated) {
      fetchLatestReport();
    }
  }, [dispatch, isAuthenticated]);

  const [prevIsAuthenticated, setPrevIsAuthenticated] =
    useState(isAuthenticated);
  if (isAuthenticated !== prevIsAuthenticated) {
    setPrevIsAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      setLatestAnalysis(null);
    }
  }

  const handleExploreReport = () => {
    if (latestAnalysis) {
      dispatch(setAnalysis(latestAnalysis));
      router.push("/results");
    } else {
      if (isAuthenticated) {
        router.push("/upload");
      } else {
        login();
      }
    }
  };

  const handleAnalyzeClick = () => {
    if (isAuthenticated) {
      router.push("/upload");
    } else {
      login();
    }
  };

  return {
    latestAnalysis,
    handleExploreReport,
    handleAnalyzeClick,
  };
};

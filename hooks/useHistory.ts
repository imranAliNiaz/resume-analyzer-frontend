"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setAnalysis } from "@/redux/slices/analysisSlice";
import { authFetch } from "@/lib/api";
import { store, type AppDispatch } from "@/redux/store";
import type { HistoryItem } from "@/types/resume";

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authFetch(
        "/resume/history",
        { method: "GET" },
        store.getState,
        dispatch as AppDispatch,
      );
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const viewReport = useCallback(
    async (id: string) => {
      try {
        const response = await authFetch(
          `/resume/history/${id}`,
          { method: "GET" },
          store.getState,
          dispatch as AppDispatch,
        );
        if (response.ok) {
          const data = await response.json();
          dispatch(setAnalysis(data.analysis));
          router.push("/results");
        }
      } catch (error) {
        console.error("Failed to fetch report:", error);
      }
    },
    [dispatch, router],
  );

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    loading,
    viewReport,
    fetchHistory,
    router,
  };
};

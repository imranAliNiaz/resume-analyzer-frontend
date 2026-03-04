"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setAnalysis } from "@/redux/slices/analysisSlice";
import { authFetchMultipart } from "@/lib/api";
import { store, type AppDispatch } from "@/redux/store";
import { useToast } from "@/app/components/ui/Toast";

export const useAnalysis = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const canAnalyze = !!file && roleTitle.trim().length > 0 && !isAnalyzing;

  const handleAnalyze = async () => {
    if (!file || !roleTitle.trim()) {
      toast({
        type: "error",
        title: "Missing required fields",
        message: "Please upload a resume and enter a target role.",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const job = `Target Role: ${roleTitle.trim()}\n\n${jobDescription}`;
      formData.append("job_description", job);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000);

      const response = await authFetchMultipart(
        "/resume/analyze",
        { method: "POST", body: formData, signal: controller.signal },
        store.getState,
        dispatch as AppDispatch,
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.detail || "Analysis failed");
      }

      const data = await response.json();
      dispatch(setAnalysis(data));

      toast({
        type: "success",
        title: "Analysis complete",
        message: "Resume insights are ready.",
      });

      router.push("/results");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        toast({
          type: "error",
          title: "Request timed out",
          message: "The analysis took too long. Please try again.",
        });
        return;
      }

      toast({
        type: "error",
        title: "Analysis failed",
        message: error instanceof Error ? error.message : "Try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    jobDescription,
    setJobDescription,
    roleTitle,
    setRoleTitle,
    isAnalyzing,
    setFile,
    handleAnalyze,
    canAnalyze,
  };
};

import { RecommendationType } from "./evaluation";
import { HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

export interface ResumeUploadRequest {
  file: File;
  jobDescription?: string;
}

export interface ResumeExtractedData {
  candidate_name: string;
  name?: string;
  email?: string;
  skills: string[];
  experience: string[];
  education: string[];
}

export interface StrengthListProps {
  strengths: string[];
}

export interface ScoreCardProps {
  score: number;
  recommendation: RecommendationType;
}

export interface UploadFormProps {
  onFileChange?: (file: File | null) => void;
}

export interface WeaknessListProps {
  weaknesses: string[];
}

export interface MatchItem {
  label: string;
  matched: boolean;
}

export interface MatchBreakdownProps {
  role: string;
  items: MatchItem[];
}

export interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface ExtractionPanelProps {
  name: string;
  title: string;
  skills: string[];
  experience: string[];
  education: string[];
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  className?: string;
}

export interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

export interface ToastContextValue {
  toast: (item: Omit<ToastItem, "id">) => void;
}

export interface HistoryItem {
  id: string;
  job_role: string;
  candidate_name: string;
  score: number;
  recommendation: string;
  timestamp: string;
}

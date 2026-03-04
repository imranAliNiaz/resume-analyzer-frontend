export type RecommendationType = "Hire" | "Consider" | "Reject";

export interface EvaluationResponse {
  score: number;
  recommendation: RecommendationType;
  strengths: string[];
  weaknesses: string[];
  summary: string;
}

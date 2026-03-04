export interface ResumeExtracted {
  candidate_name: string;
  skills: string[];
  experience: string[];
  education: string[];
  summary: string;
}

export interface ResumeMatchItem {
  label: string;
  matched: boolean;
}

export interface ResumeAnalysisResponse {
  score: number;
  recommendation: "Hire" | "Consider" | "Reject";
  job_role: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  reasoning: string[];
  extracted: ResumeExtracted;
  match: ResumeMatchItem[];
}

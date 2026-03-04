import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ResumeAnalysisResponse } from "@/types/analysis";

interface AnalysisState {
  analysis: ResumeAnalysisResponse | null;
}

const initialState: AnalysisState = {
  analysis: null,
};

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setAnalysis(state, action: PayloadAction<ResumeAnalysisResponse>) {
      state.analysis = action.payload;
    },
    clearAnalysis(state) {
      state.analysis = null;
    },
  },
});

export const { setAnalysis, clearAnalysis } = analysisSlice.actions;

export default analysisSlice.reducer;

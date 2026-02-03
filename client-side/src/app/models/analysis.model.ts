export interface Analysis {
  id: number;
  resumeId: number;
  jobDescriptionId: number;
  atsScore?: number;
  suggestionsJson?: string;
  aiResponseJson?: string;
  createdAt: string;
}

export interface AnalysisResult {
  id: number;
  resumeId: number;
  jobDescriptionId: number;
  atsScore?: number;
  suggestionsJson?: string;
  aiResponseJson?: string;
  createdAt: string;
  resumeFileName?: string;
  jobTitle?: string;
}

export interface AnalysisRequest {
  resumeId: number;
  jobDescriptionId: number;
  resumeText: string;
  jobDescription: string;
}
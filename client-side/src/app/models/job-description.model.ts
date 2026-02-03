export interface JobDescription {
  id: number;
  userId: number;
  title?: string;
  text?: string;
  uploadedAt: string;
}

export interface CreateJobDescriptionRequest {
  title?: string;
  text?: string;
}
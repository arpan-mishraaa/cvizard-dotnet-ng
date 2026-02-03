export interface Resume {
  id: number;
  userId: number;
  fileName: string;
  parsedText?: string;
  metadata?: string;
  uploadedAt: string;
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { AuthService } from '../../services/auth.service';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

@Component({
  selector: 'app-upload-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="upload-container">
      <h2>Upload Resume</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="file">Select Resume (PDF/DOCX):</label>
          <input type="file" id="file" (change)="onFileSelected($event)" accept=".pdf,.docx" required>
        </div>
        <div class="form-group">
          <label for="metadata">Metadata (optional):</label>
          <textarea id="metadata" [(ngModel)]="metadata" name="metadata" rows="3"></textarea>
        </div>
        <button type="submit" [disabled]="!selectedFile || isProcessing">
          {{ isProcessing ? 'Processing...' : 'Upload' }}
        </button>
        <button type="button" (click)="goBack()">Cancel</button>
        <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
        <div *ngIf="successMessage" class="success">{{ successMessage }}</div>
      </form>
    </div>
  `,
  styles: [`
    .upload-container { max-width: 500px; margin: 50px auto; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    input, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    button { margin-right: 10px; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    button[type="submit"] { background: #007bff; color: white; }
    button[type="button"] { background: #6c757d; color: white; }
    .error { color: red; margin-top: 10px; }
    .success { color: green; margin-top: 10px; }
  `]
})
export class UploadResumeComponent {
  selectedFile: File | null = null;
  metadata = '';
  errorMessage = '';
  successMessage = '';
  isProcessing = false;

  constructor(
    private resumeService: ResumeService,
    private authService: AuthService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.errorMessage = '';
    this.successMessage = '';
  }

  async onSubmit() {
    if (this.selectedFile) {
      const userId = this.authService.getUserId();
      if (userId) {
        this.isProcessing = true;
        try {
          const parsedText = await this.extractTextFromPDF(this.selectedFile);
          this.resumeService.uploadResumeText(userId, this.selectedFile.name, parsedText, this.metadata).subscribe({
            next: (response) => {
              this.successMessage = 'Resume processed successfully!';
              setTimeout(() => this.router.navigate(['/dashboard']), 2000);
              this.isProcessing = false;
            },
            error: (error) => {
              this.errorMessage = error.error?.message || 'Upload failed';
              this.isProcessing = false;
            }
          });
        } catch (error) {
          this.errorMessage = 'Failed to parse PDF. Please try again.';
          this.isProcessing = false;
        }
      }
    }
  }

  private async extractTextFromPDF(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText.trim();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
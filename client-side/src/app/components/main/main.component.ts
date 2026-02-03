import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AnalysisService } from '../../services/analysis.service';
import { CreateJobDescriptionRequest } from '../../models/job-description.model';
import { AnalysisRequest } from '../../models/analysis.model';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-content">
        <a href="#" class="navbar-brand">CVizard</a>
        <div class="navbar-nav">
          <span class="nav-link">Welcome, {{ userEmail }}</span>
          <button class="btn-logout" (click)="logout()">Logout</button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container">
      <!-- Header -->
      <div class="dashboard-header fade-in">
        <h1 class="dashboard-title">AI-Powered Resume Analysis</h1>
        <p class="dashboard-subtitle">Upload your resume and job description to get instant ATS scoring and recommendations</p>
      </div>

      <!-- Main Form -->
      <div class="grid grid-2">
        <!-- Resume Upload -->
        <div class="card fade-in">
          <div class="card-header">
            <h2 class="card-title">📄 Upload Resume</h2>
          </div>
          
          <form (ngSubmit)="uploadResume()">
            <div class="form-group">
              <label>Select Resume (PDF/DOCX)</label>
              <div class="file-input-wrapper">
                <input type="file" class="file-input" (change)="onResumeSelected($event)" accept=".pdf,.docx">
                <div class="file-input-label" [class.has-file]="selectedResume">
                  <span *ngIf="!selectedResume">📁 Choose file or drag & drop</span>
                  <span *ngIf="selectedResume">✅ {{ selectedResume.name }}</span>
                </div>
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary" [disabled]="!selectedResume || isUploading">
              <span *ngIf="!isUploading">📤 Upload Resume</span>
              <span *ngIf="isUploading">⏳ Uploading...</span>
            </button>
            
            <div *ngIf="resumeMessage" [class]="resumeMessage.type === 'success' ? 'alert alert-success' : 'alert alert-error'">
              {{ resumeMessage.text }}
            </div>
          </form>
        </div>

        <!-- Job Description -->
        <div class="card fade-in">
          <div class="card-header">
            <h2 class="card-title">💼 Job Description</h2>
          </div>
          
          <form (ngSubmit)="createJobDescription()">
            <div class="form-group">
              <label>Job Title</label>
              <input type="text" [(ngModel)]="jobData.title" name="jobTitle" placeholder="e.g., Senior Software Engineer" required>
            </div>
            
            <div class="form-group">
              <label>Job Description</label>
              <textarea [(ngModel)]="jobData.text" name="jobText" rows="8" placeholder="Paste the complete job description here..." required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" [disabled]="!jobData.title || !jobData.text || isCreatingJob">
              <span *ngIf="!isCreatingJob">📤 Upload Job Description</span>
              <span *ngIf="isCreatingJob">⏳ Uploading...</span>
            </button>
            
            <div *ngIf="jobMessage" [class]="jobMessage.type === 'success' ? 'alert alert-success' : 'alert alert-error'">
              {{ jobMessage.text }}
            </div>
          </form>
        </div>
      </div>

      <!-- Analysis Section -->
      <div class="card fade-in" *ngIf="selectedResume && jobData.title && jobData.text">
        <div class="card-header">
          <h2 class="card-title">🤖 AI Analysis</h2>
        </div>
        
        <div style="background: #eff6ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
          <p><strong>Resume:</strong> {{ selectedResume.name }}</p>
          <p><strong>Job:</strong> {{ jobData.title }}</p>
        </div>
        
        <button class="btn btn-primary" (click)="analyzeResume()" [disabled]="isAnalyzing">
          <span *ngIf="!isAnalyzing">🚀 Analyze Resume</span>
          <span *ngIf="isAnalyzing">🔄 Analyzing...</span>
        </button>
        
        <div *ngIf="isAnalyzing" class="progress">
          <div class="progress-bar" [style.width.%]="analysisProgress"></div>
        </div>
        
        <!-- ATS Score Display -->
        <div *ngIf="atsScore && atsScore !== 'N/A'" class="ats-score-box">
          <h3>ATS Score</h3>
          <div class="score-display">{{ atsScore }}/100</div>
        </div>

        <!-- Analysis Result -->
        <div *ngIf="analysisResult" class="alert alert-success" style="margin-top: 1rem;">
          <h3>Detailed Analysis</h3>
          <pre style="white-space: pre-wrap; margin-top: 1rem;">{{ analysisResult }}</pre>
          
          <button class="btn btn-primary" (click)="generateLatex()" [disabled]="isGeneratingLatex" style="margin-top: 1rem;">
            <span *ngIf="!isGeneratingLatex">📄 Generate LaTeX Code</span>
            <span *ngIf="isGeneratingLatex">⏳ Generating...</span>
          </button>
        </div>

        <!-- LaTeX Code Display -->
        <div *ngIf="latexCode" class="latex-box">
          <h3>LaTeX Code</h3>
          <pre style="background: #f8f9fa; padding: 1rem; border-radius: 8px; overflow-x: auto; font-family: 'Courier New', monospace;">{{ latexCode }}</pre>
        </div>
        
        <div *ngIf="analysisError" class="alert alert-error">
          {{ analysisError }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    pre {
      background: #f8fafc;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .ats-score-box {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      margin: 1rem 0;
    }
    
    .score-display {
      font-size: 3rem;
      font-weight: 700;
      margin-top: 0.5rem;
    }
    
    .latex-box {
      margin-top: 2rem;
      padding: 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      background: white;
    }
  `]
})
export class MainComponent implements OnInit {
  userEmail = '';
  
  // Resume data
  selectedResume: File | null = null;
  isUploading = false;
  resumeMessage: {type: string, text: string} | null = null;
  parsedResumeText = '';
  
  // Job description data
  jobData: CreateJobDescriptionRequest = { title: '', text: '' };
  isCreatingJob = false;
  jobMessage: {type: string, text: string} | null = null;
  isAnalyzing = false;
  analysisProgress = 0;
  analysisResult = '';
  analysisError = '';
  atsScore = '';
  isGeneratingLatex = false;
  latexCode = '';

  constructor(
    private authService: AuthService,
    private analysisService: AnalysisService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail') || 'User';
  }

  onResumeSelected(event: any) {
    this.selectedResume = event.target.files[0];
    this.resumeMessage = null;
  }

  async uploadResume() {
    if (this.selectedResume) {
      this.isUploading = true;
      try {
        this.parsedResumeText = await this.extractTextFromPDF(this.selectedResume);
        this.resumeMessage = { type: 'success', text: 'Resume processed successfully!' };
        this.isUploading = false;
      } catch (error) {
        this.resumeMessage = { type: 'error', text: 'Failed to parse PDF. Please try again.' };
        this.isUploading = false;
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

  createJobDescription() {
    this.isCreatingJob = true;
    this.jobMessage = { type: 'success', text: 'Job description uploaded successfully!' };
    this.isCreatingJob = false;
  }



  analyzeResume() {
    if (this.parsedResumeText && this.jobData.text) {
      this.isAnalyzing = true;
      this.analysisProgress = 0;
      this.analysisResult = '';
      this.analysisError = '';

      const progressInterval = setInterval(() => {
        this.analysisProgress += 10;
        if (this.analysisProgress >= 90) {
          clearInterval(progressInterval);
        }
      }, 200);

      const request: AnalysisRequest = {
        resumeId: 1,
        jobDescriptionId: 1,
        resumeText: this.parsedResumeText,
        jobDescription: this.jobData.text
      };

      this.analysisService.analyzeResume(request).subscribe({
        next: (response) => {
          clearInterval(progressInterval);
          this.analysisProgress = 100;
          const result = typeof response === 'string' ? response : (response.result || JSON.stringify(response));
          this.analysisResult = result;
          this.extractAtsScore(result);
          this.isAnalyzing = false;
        },
        error: (error) => {
          clearInterval(progressInterval);
          this.analysisError = error.error?.message || error.message || 'Analysis failed';
          this.isAnalyzing = false;
        }
      });
    }
  }

  extractAtsScore(result: string) {
    const match = result.match(/ATS_SCORE:\s*(\d+)/i);
    this.atsScore = match ? match[1] : 'N/A';
  }

  generateLatex() {
    if (this.parsedResumeText && this.jobData.text) {
      this.isGeneratingLatex = true;
      this.latexCode = '';

      const request: AnalysisRequest = {
        resumeId: 1,
        jobDescriptionId: 1,
        resumeText: this.parsedResumeText,
        jobDescription: this.jobData.text
      };

      this.analysisService.generateLatex(request).subscribe({
        next: (response) => {
          this.latexCode = response.latexCode || response;
          this.isGeneratingLatex = false;
        },
        error: (error) => {
          this.latexCode = 'LaTeX generation failed: ' + (error.error?.message || error.message);
          this.isGeneratingLatex = false;
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
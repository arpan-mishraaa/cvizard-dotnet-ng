import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnalysisService } from '../../services/analysis.service';
import { ResumeService } from '../../services/resume.service';
import { JobDescriptionService } from '../../services/job-description.service';
import { AuthService } from '../../services/auth.service';
import { Resume } from '../../models/resume.model';
import { JobDescription } from '../../models/job-description.model';
import { AnalysisRequest } from '../../models/analysis.model';

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="analyze-container">
      <h2>Analyze Resume</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="resume">Select Resume:</label>
          <select id="resume" [(ngModel)]="selectedResumeId" name="resume" required>
            <option value="">Choose a resume...</option>
            <option *ngFor="let resume of resumes" [value]="resume.id">{{ resume.fileName }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="job">Select Job Description:</label>
          <select id="job" [(ngModel)]="selectedJobId" name="job" required>
            <option value="">Choose a job description...</option>
            <option *ngFor="let job of jobDescriptions" [value]="job.id">{{ job.title || 'Untitled' }}</option>
          </select>
        </div>
        <button type="submit" [disabled]="!selectedResumeId || !selectedJobId || isAnalyzing">
          {{ isAnalyzing ? 'Analyzing...' : 'Analyze' }}
        </button>
        <button type="button" (click)="goBack()">Cancel</button>
        <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
        <div *ngIf="result" class="result">
          <h3>Analysis Result:</h3>
          <pre>{{ result }}</pre>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .analyze-container { max-width: 600px; margin: 50px auto; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; }
    select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    button { margin-right: 10px; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    button[type="submit"] { background: #007bff; color: white; }
    button[type="button"] { background: #6c757d; color: white; }
    .error { color: red; margin-top: 10px; }
    .result { margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
    pre { white-space: pre-wrap; }
  `]
})
export class AnalyzeComponent implements OnInit {
  resumes: Resume[] = [];
  jobDescriptions: JobDescription[] = [];
  selectedResumeId: number | null = null;
  selectedJobId: number | null = null;
  errorMessage = '';
  result = '';
  isAnalyzing = false;

  constructor(
    private analysisService: AnalysisService,
    private resumeService: ResumeService,
    private jobService: JobDescriptionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.resumeService.getResumesByUser(userId).subscribe(data => this.resumes = data);
      this.jobService.getJobDescriptionsByUser(userId).subscribe(data => this.jobDescriptions = data);
    }
  }

  onSubmit() {
    if (this.selectedResumeId && this.selectedJobId) {
      const selectedResume = this.resumes.find(r => r.id === this.selectedResumeId);
      const selectedJob = this.jobDescriptions.find(j => j.id === this.selectedJobId);

      if (selectedResume && selectedJob) {
        this.isAnalyzing = true;
        const request: AnalysisRequest = {
          resumeId: this.selectedResumeId,
          jobDescriptionId: this.selectedJobId,
          resumeText: selectedResume.parsedText || '',
          jobDescription: selectedJob.text || ''
        };

        this.analysisService.analyzeResume(request).subscribe({
          next: (response) => {
            this.result = response.result;
            this.isAnalyzing = false;
          },
          error: (error) => {
            this.errorMessage = error.error?.message || 'Analysis failed';
            this.isAnalyzing = false;
          }
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
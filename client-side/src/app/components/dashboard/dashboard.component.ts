import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ResumeService } from '../../services/resume.service';
import { JobDescriptionService } from '../../services/job-description.service';
import { AnalysisService } from '../../services/analysis.service';
import { Resume } from '../../models/resume.model';
import { JobDescription } from '../../models/job-description.model';
import { AnalysisResult } from '../../models/analysis.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <header>
        <h1>CVizard Dashboard</h1>
        <button (click)="logout()">Logout</button>
      </header>
      
      <nav class="nav-tabs">
        <button [class.active]="activeTab === 'resumes'" (click)="activeTab = 'resumes'">Resumes</button>
        <button [class.active]="activeTab === 'jobs'" (click)="activeTab = 'jobs'">Job Descriptions</button>
        <button [class.active]="activeTab === 'analysis'" (click)="activeTab = 'analysis'">Analysis</button>
      </nav>

      <div class="tab-content">
        <div *ngIf="activeTab === 'resumes'" class="tab-pane">
          <h2>My Resumes</h2>
          <button (click)="navigateTo('/upload-resume')">Upload Resume</button>
          <div *ngFor="let resume of resumes" class="item-card">
            <h3>{{ resume.fileName }}</h3>
            <p>Uploaded: {{ resume.uploadedAt | date }}</p>
          </div>
        </div>

        <div *ngIf="activeTab === 'jobs'" class="tab-pane">
          <h2>Job Descriptions</h2>
          <button (click)="navigateTo('/create-job')">Create Job Description</button>
          <div *ngFor="let job of jobDescriptions" class="item-card">
            <h3>{{ job.title || 'Untitled' }}</h3>
            <p>Created: {{ job.uploadedAt | date }}</p>
          </div>
        </div>

        <div *ngIf="activeTab === 'analysis'" class="tab-pane">
          <h2>Analysis Results</h2>
          <button (click)="navigateTo('/analyze')">New Analysis</button>
          <div *ngFor="let analysis of analyses" class="item-card">
            <h3>{{ analysis.resumeFileName }} vs {{ analysis.jobTitle }}</h3>
            <p>ATS Score: {{ analysis.atsScore || 'N/A' }}%</p>
            <p>Date: {{ analysis.createdAt | date }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .nav-tabs { display: flex; gap: 10px; margin-bottom: 20px; }
    .nav-tabs button { padding: 10px 20px; border: 1px solid #ddd; background: white; cursor: pointer; }
    .nav-tabs button.active { background: #007bff; color: white; }
    .item-card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px; }
    button { padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
  `]
})
export class DashboardComponent implements OnInit {
  activeTab = 'resumes';
  resumes: Resume[] = [];
  jobDescriptions: JobDescription[] = [];
  analyses: AnalysisResult[] = [];

  constructor(
    private authService: AuthService,
    private resumeService: ResumeService,
    private jobService: JobDescriptionService,
    private analysisService: AnalysisService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.resumeService.getResumesByUser(userId).subscribe(data => this.resumes = data);
      this.jobService.getJobDescriptionsByUser(userId).subscribe(data => this.jobDescriptions = data);
      this.analysisService.getAnalysesByUser(userId).subscribe(data => this.analyses = data);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
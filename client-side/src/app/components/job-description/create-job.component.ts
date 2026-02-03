import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobDescriptionService } from '../../services/job-description.service';
import { AuthService } from '../../services/auth.service';
import { CreateJobDescriptionRequest } from '../../models/job-description.model';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-job-container">
      <h2>Create Job Description</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Job Title:</label>
          <input type="text" id="title" [(ngModel)]="jobData.title" name="title" required>
        </div>
        <div class="form-group">
          <label for="text">Job Description:</label>
          <textarea id="text" [(ngModel)]="jobData.text" name="text" rows="10" required></textarea>
        </div>
        <button type="submit">Create</button>
        <button type="button" (click)="goBack()">Cancel</button>
        <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
        <div *ngIf="successMessage" class="success">{{ successMessage }}</div>
      </form>
    </div>
  `,
  styles: [`
    .create-job-container { max-width: 600px; margin: 50px auto; padding: 20px; }
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
export class CreateJobComponent {
  jobData: CreateJobDescriptionRequest = { title: '', text: '' };
  errorMessage = '';
  successMessage = '';

  constructor(
    private jobService: JobDescriptionService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.jobService.createJobDescription(userId, this.jobData).subscribe({
        next: () => {
          this.successMessage = 'Job description created successfully!';
          setTimeout(() => this.router.navigate(['/dashboard']), 2000);
        },
        error: (error) => this.errorMessage = error.error?.message || 'Creation failed'
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
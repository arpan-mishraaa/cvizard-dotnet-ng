import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-logo">
        <a [routerLink]="['/']" class="logo-link">CVizard</a>
      </div>
      <div class="auth-card fade-in">
        <h1 class="auth-title">Create Account</h1>
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" [(ngModel)]="registerData.email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" [(ngModel)]="registerData.password" placeholder="Create a password" required minlength="6">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" [(ngModel)]="registerData.confirmPassword" placeholder="Confirm your password" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;" [disabled]="!registerForm.valid || registerData.password !== registerData.confirmPassword">
            Create Account
          </button>
          <div *ngIf="errorMessage" class="alert alert-error">{{ errorMessage }}</div>
          <div *ngIf="successMessage" class="alert alert-success">{{ successMessage }}</div>
        </form>
        <div class="auth-link">
          <a [routerLink]="['/login']">Already have an account? Sign in</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-logo {
      position: absolute;
      top: 2rem;
      left: 2rem;
      z-index: 1001;
    }
    
    .logo-link {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2563eb;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .logo-link:hover {
      color: #1d4ed8;
    }
  `]
})
export class RegisterComponent {
  registerData: RegisterRequest = { email: '', password: '', confirmPassword: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful! Please login.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || error.message || 'Registration failed';
      }
    });
  }
}
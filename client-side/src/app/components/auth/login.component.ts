import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-logo">
        <a [routerLink]="['/']" class="logo-link">CVizard</a>
      </div>
      <div class="auth-card fade-in">
        <h1 class="auth-title">Welcome Back</h1>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" [(ngModel)]="loginData.email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" [(ngModel)]="loginData.password" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;" [disabled]="!loginForm.valid">
            Sign In
          </button>
          <div *ngIf="errorMessage" class="alert alert-error">{{ errorMessage }}</div>
        </form>
        <div class="auth-link">
          <a [routerLink]="['/register']">Don't have an account? Create one</a>
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
export class LoginComponent {
  loginData: LoginRequest = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        localStorage.setItem('userEmail', response.email);
        this.router.navigate(['/main']);
      },
      error: (error) => this.errorMessage = error.error?.message || 'Login failed'
    });
  }
}
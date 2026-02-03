import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44371/api';
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private userIdSubject = new BehaviorSubject<number | null>(
    localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : null
  );

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, request, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/users/login`, request, {
      headers: { 'Content-Type': 'application/json' }
    })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId.toString());
          this.tokenSubject.next(response.token);
          this.userIdSubject.next(response.userId);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.tokenSubject.next(null);
    this.userIdSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getUserId(): number | null {
    return this.userIdSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobDescription, CreateJobDescriptionRequest } from '../models/job-description.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobDescriptionService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createJobDescription(userId: number, request: CreateJobDescriptionRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}`, request, {
      headers: this.getHeaders()
    });
  }

  getJobDescriptionsByUser(userId: number): Observable<JobDescription[]> {
    return this.http.get<JobDescription[]>(`${this.apiUrl}/${userId}`, {
      headers: this.getHeaders()
    });
  }

  getJobDescriptionById(id: number): Observable<JobDescription> {
    return this.http.get<JobDescription>(`${this.apiUrl}/details/${id}`, {
      headers: this.getHeaders()
    });
  }
}
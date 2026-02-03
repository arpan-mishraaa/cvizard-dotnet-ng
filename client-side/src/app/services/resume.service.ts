import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from '../models/resume.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  uploadResumeText(userId: number, fileName: string, parsedText: string, metadata?: string): Observable<any> {
    const payload = {
      fileName,
      parsedText,
      metadata: metadata || ''
    };

    return this.http.post(`${this.apiUrl}/${userId}`, payload, {
      headers: this.getHeaders()
    });
  }

  getResumesByUser(userId: number): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}/${userId}`, {
      headers: this.getHeaders()
    });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisRequest, AnalysisResult, Analysis } from '../models/analysis.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private apiUrl = 'https://localhost:44371/api/analysis';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  analyzeResume(request: AnalysisRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze`, request, {
      headers: this.getHeaders()
    });
  }

  getAnalysesByUser(userId: number): Observable<AnalysisResult[]> {
    return this.http.get<AnalysisResult[]>(`${this.apiUrl}/${userId}`, {
      headers: this.getHeaders()
    });
  }

  getAnalysisById(id: number): Observable<Analysis> {
    return this.http.get<Analysis>(`${this.apiUrl}/details/${id}`, {
      headers: this.getHeaders()
    });
  }

  generateLatex(request: AnalysisRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/latex`, request, {
      headers: this.getHeaders()
    });
  }
}
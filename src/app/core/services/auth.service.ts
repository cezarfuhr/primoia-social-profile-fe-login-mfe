import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  // Defina aqui a interface da resposta do seu backend
  token?: string;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://192.168.0.119:8000/api/v1/auth';
  private readonly headers = {
    'client': 'token',
    'token': '2B961EB8-8D6E-4DC1-B4A2-A736C6B7512C'
  };

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    const headers = new HttpHeaders(this.headers);
    
    return this.http.post<LoginResponse>(
      `${this.API_URL}/login`,
      credentials,
      { headers }
    ).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_data', JSON.stringify(response.user));
          window.location.href = 'http://localhost:4201/dashboard';
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    window.location.href = 'http://localhost:4200/login';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
} 
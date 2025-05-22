import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, delay } from 'rxjs';

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
    console.log('=== Iniciando processo de login ===');
    console.log('Credenciais:', credentials);
    
    const headers = new HttpHeaders(this.headers);
    
    return this.http.post<LoginResponse>(
      `${this.API_URL}/login`,
      credentials,
      { headers }
    ).pipe(
      tap(response => {
        console.log('Resposta do servidor:', response);
        
        if (response.token) {
          try {
            console.log('Limpando localStorage...');
            localStorage.clear();
            
            console.log('Salvando novo token:', response.token);
            localStorage.setItem('auth_token', response.token);
            
            console.log('Salvando dados do usuário:', response.user);
            localStorage.setItem('user_data', JSON.stringify(response.user));
            
            // Verificação dupla
            const savedToken = localStorage.getItem('auth_token');
            console.log('Token verificação:', savedToken);
            
            if (savedToken === response.token) {
              console.log('Token salvo com sucesso, redirecionando...');
              // Pequeno delay antes do redirecionamento
              setTimeout(() => {
                window.location.href = 'http://localhost:4201/dashboard';
              }, 500);
            } else {
              throw new Error('Falha na verificação do token');
            }
          } catch (error) {
            console.error('Erro ao salvar dados:', error);
            throw error;
          }
        } else {
          console.error('Token não recebido na resposta');
        }
      })
    );
  }

  logout(): void {
    console.log('Realizando logout...');
    localStorage.clear();
    window.location.href = 'http://localhost:4200/login';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    console.log('Verificando autenticação - token:', token);
    return !!token;
  }
} 
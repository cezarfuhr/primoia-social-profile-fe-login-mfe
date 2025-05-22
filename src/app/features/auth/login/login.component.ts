import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      console.log('Iniciando login...');
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login bem sucedido:', response);
          console.log('Token salvo:', localStorage.getItem('auth_token'));
          console.log('Dados do usuário salvos:', localStorage.getItem('user_data'));
          // Redirecionar para o micro frontend home
          window.location.href = 'http://localhost:4201/dashboard';
        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}

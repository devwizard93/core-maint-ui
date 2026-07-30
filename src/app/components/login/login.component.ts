import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = { username: '', password: '' };
  message = '';
  success = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const { username, password } = this.user;

    this.authService.login(username, password).subscribe({
      next: (res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          // ✅ Redirige directamente a "sale" tras iniciar sesión
          this.router.navigate(['/sale']);
        } else {
          this.message = 'Error: no se recibió token';
          this.success = false;
        }
      },
      error: () => {
        this.message = 'Usuario o contraseña incorrectos';
        this.success = false;
      },
    });
  }

 goToRegister() {
    this.router.navigate(['/register']);
  }


}

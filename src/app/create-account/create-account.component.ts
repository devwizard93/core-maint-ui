import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.component.html'
})
export class CreateAccountComponent {

  user = { username: '', password: '' };
  message = '';
  success = false;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        this.success = true;
        this.message = res.message;

        // Redirigir al login después de 1 segundo
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.success = false;

        if (err.status === 400) {
          this.message = err.error?.message || 'Error: datos inválidos';
        } else {
          this.message = 'Error inesperado';
        }
      }
    });
  }
}

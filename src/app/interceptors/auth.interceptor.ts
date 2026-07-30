import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  let cloned = req;
  if (token) {
    cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(cloned).pipe(
    catchError(err => {
      if (err.status === 401) {
        console.warn('⚠️ Token inválido o expirado');
        authService.logout();
        // forzamos navegación al login (fuera del router)
        window.location.href = '/login';
      }
      return throwError(() => err);
    })
  );
};

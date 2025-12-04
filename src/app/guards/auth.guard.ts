import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasToken()) {
    return true; // usuario logueado → deja pasar
  } else {
    router.navigate(['/not-authorized']); // no logueado → redirige
    return false;
  }
};

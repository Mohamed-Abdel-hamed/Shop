import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  const user = authService.getUserInfo();

  if (!user) {
    return true;
  }

  if (user.role === 'Admin') {
    router.navigate(['/admin/dashboard']);
     return false
  }

  if (user.role === 'Customer') {

    return router.navigate(['/home']);
  }

  return true;
};

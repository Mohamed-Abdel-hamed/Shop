import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
  const authService=inject(AuthService);

  const role = authService.getUserInfo()?.role;

  if (role !== 'Admin') {
    router.navigate(['/home']);
    return false;
  }

  return true;
};

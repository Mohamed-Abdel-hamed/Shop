import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const customerGuard: CanActivateFn = (route, state) => {
   const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.getUserInfo()?.role;

  if (role !== 'Customer') {
    router.navigate(['/admin']); 
    return false;
  }

  return true;
};

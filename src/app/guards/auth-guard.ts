import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage';

export const authGuard: CanMatchFn = () => {
  const store = inject(TokenStorageService);
  const router = inject(Router);
  if (store.isLoggedIn) return true;
  router.navigate(['/login']);
  return false;
};

import { CanMatchFn, Router, Route, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage';

export const roleGuard: CanMatchFn = (route: Route, _segments: UrlSegment[]) => {
  const store = inject(TokenStorageService);
  const router = inject(Router);
  const expected = (route.data?.['roles'] as string[]) || [];
  if (store.role && expected.includes(store.role)) return true;
  router.navigate(['/']);
  return false;
};

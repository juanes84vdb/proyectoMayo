import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const loggedIn = localStorage.getItem('loggedInKey') !== null;
  const router = inject(Router);
  if(loggedIn) {
    return loggedIn
  }
  else{
    return router.parseUrl('/login');
  }
};

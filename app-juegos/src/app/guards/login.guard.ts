import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * A guard function to protect routes and ensure that only authenticated users can access them.
 *
 * @param route - The current route being activated.
 * @param state - The current state of the route.
 * @returns {boolean | UrlTree} - Returns `true` if the user is authenticated,
 * otherwise, it returns a `UrlTree` object that redirects the user to the login page.
 *
 * @remarks
 * This function checks if the user is authenticated by checking if the `loggedInKey` exists in local storage.
 * If the user is authenticated, it returns `true`.
 * If the user is not authenticated, it uses the `Router` to navigate to the login page and returns the `UrlTree` object.
 *
 * @example
 * ```typescript
 * import { loginGuard } from './login-guard';
 *
 * const routes: Routes = [
 *   { path: 'dashboard', component: DashboardComponent, canActivate: [loginGuard] },
 *   { path: 'login', component: LoginComponent },
 * ];
 * ```
 */
export const loginGuard: CanActivateFn = (route, state) => {
  const loggedIn = localStorage.getItem('loggedInKey')!== null;
  const router = inject(Router);
  if (loggedIn) {
    return loggedIn;
  } else {
    return router.parseUrl('/login');
  }
};
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  return user !== null && user.length > 0;
};

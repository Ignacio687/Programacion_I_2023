import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authSessionGuard: CanActivateFn = (route, state) => {

  let router: Router = inject(Router);
  let token = localStorage.getItem('token')

  if (!token) {
    router.navigateByUrl('/home')
    return false
  } else {
    return true
  }
};

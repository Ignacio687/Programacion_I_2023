import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import jwt_decode from "jwt-decode";

export const recoverPassGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const token = localStorage.getItem('token')
  const tokenRol = localStorage.getItem('token_rol')

  if (token && tokenRol && tokenRol.includes('recover-pass')) {
    return true
  } else {
    router.navigateByUrl('/home')
    return false
  }
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import jwt_decode from "jwt-decode";

export const adminSessionGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const token = localStorage.getItem('token')
  const tokenRol = localStorage.getItem('token_rol')

  if (token && tokenRol && tokenRol.includes('admin')) {
    return true
  } else {
    router.navigateByUrl('/home')
    return false
  }
};

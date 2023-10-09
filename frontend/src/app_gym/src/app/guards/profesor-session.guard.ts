import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import jwt_decode from "jwt-decode";

export const profesorSessionGuard: CanActivateFn = (route, state) => {
  
  let router: Router = inject(Router);
  let token = localStorage.getItem('token')

  if (token) {
    let tokenPayload: any = jwt_decode(token)
    if (tokenPayload.rol.includes('profesor') || tokenPayload.rol.includes('admin')) {
      return true
    } else {
      router.navigateByUrl('/home')
      return false
    }
  } else {
    router.navigateByUrl('/home')
    return false
  }
};

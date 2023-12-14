import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import jwt_decode from "jwt-decode";

export const recoverPassGuard: CanActivateFn = (route, state) => {


  const router: Router = inject(Router);
  const token: string = String(route.paramMap.get('token'))
  const tokenPayload: any = jwt_decode(token)
  const tokenRol = tokenPayload.rol

  if (token && tokenRol && tokenRol.includes('recover-pass')) {
    return true
  } else {
    router.navigateByUrl('/home')
    return false
  }
};

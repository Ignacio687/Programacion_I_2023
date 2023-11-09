import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const profesorSessionGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const token = localStorage.getItem('token')
  const tokenRol = localStorage.getItem('token_rol')

  if (token && tokenRol) {
    if (tokenRol.includes('profesor') || tokenRol.includes('admin')) {
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

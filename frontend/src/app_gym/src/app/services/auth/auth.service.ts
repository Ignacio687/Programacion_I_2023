import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private loginService: LoginService,

  ) { setInterval(() => {
    this.checkTokenExpiration();
  }, 30000);
 }

  // Función para verificar si el token ha expirado
  checkTokenExpiration() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (tokenExpiration < currentTimestamp) {
        // Si el token ha expirado, cierra la sesión
        this.loginService.logout();
      }
    }
  }

  // Función para obtener la fecha de expiración del token
  getTokenExpiration(token: string) {
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    return tokenData.exp;
  }

}

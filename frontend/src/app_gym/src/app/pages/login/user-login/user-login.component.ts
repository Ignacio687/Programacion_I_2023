import { Component } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
    ){}
  login(dataLogin: any = {}){
    dataLogin = {email: "a@a.com", password: "password"};
    
    console.log('Comprobando credenciales');
    this.authService.login(dataLogin).subscribe({
      next: (rta: any) => {
        console.log('Respuesta login: ', rta.access_token);
        localStorage.setItem('token', rta.access_token);
        this.router.navigateByUrl('/home');
      },
      error: (error: any) => {
        console.log(error);
        alert('Credenciales incorrectas')
        localStorage.removeItem('token');
      },
      complete: () => {
        console.log('Completado');
      }

    })
  }

}

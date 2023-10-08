import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-credentials',
  templateUrl: './user-credentials.component.html',
  styleUrls: ['./user-credentials.component.css']
})
export class UserCredentialsComponent {
  selectedOption: string = 'Selecciona una opción'; // Valor inicial'
  
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  login(dataLogin: any = {}){
    dataLogin = {email: "matiasboldrini@gmail.com", password: "ujshu110945-"};
    console.log('Comprobando credenciales');
    this.authService.login(dataLogin).subscribe({
      next: (rta: any) => {
        console.log('Respuesta login: ', rta.access_token);
        localStorage.setItem('token', rta.access_token);
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

  sendRecoverEmail() {
  }

  getCurrentRoute() {
    return this.router.url
  }
}

import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app_gym';

  constructor (
    private AuthServices: AuthService 
  ) {}

  ngOnInit() {
    console.log(
      {
        Admin: {email: 'ignaciochaves@gmail.com', password: '45sdkaj1i28f*R%@D'},
        Profesor: {email: 'gonzaloruiz@gmail.com', password: '45skuqy^%#.5665s'},
        Alumno: {email: 'pepeGarcia@gmail.com', password: 'adsd4848*awd92'}
      }
      )
    const testAuthService = this.AuthServices;
  }
}
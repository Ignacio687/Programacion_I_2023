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
        Admin: {email: 'i.chaves@alumno.um.edu.ar', password: '45sdkaj1i28f*'},
        Profesor: {email: 'francopisso@gmai.com', password: 'a4d5sad45as'},
        Alumno: {email: 'camelCase@snakeCase.com', password: '1234'}
      }
      )
    const testAuthService = this.AuthServices;
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) { }
  login(dataLogin: any): Observable<any>{
    return this.httpClient.post(this.url + '/auth/login', dataLogin).pipe(take(1))
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('token_rol');
    localStorage.removeItem('token_DNI');
    this.router.navigate(['/','home']);
  }
  
  enviarCorreo(to: string, subject: string, template: string, kwargs: any): Observable<any> {
    const correoData = {
      to,
      subject,
      template,
    };

    return this.httpClient.post(this.url+'/auth/recover-pass', correoData);
  }
}

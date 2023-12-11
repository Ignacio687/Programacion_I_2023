import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first, take } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) { }
  register (dataRegister: any): Observable<any>{
    return this.httpClient.post(this.url + '/auth/register', dataRegister).pipe(take(1))
  }

  recoverPass(email: any): Observable<any> {
    return this.httpClient.post(this.url + '/auth/recover-pass', email).pipe(take(1))
  }

  changePassword(token: any, dni: number, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.put(`${this.url}/usuario/${dni}`, userData, {headers: headers}).pipe(first())
  }
}

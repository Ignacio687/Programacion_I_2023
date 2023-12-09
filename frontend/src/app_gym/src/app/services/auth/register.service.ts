import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
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

  recoverPass(dataRecover: any): Observable<any> {
    return this.httpClient.post(this.url + '/auth/recover-pass-form', dataRecover).pipe(take(1))
  }
}

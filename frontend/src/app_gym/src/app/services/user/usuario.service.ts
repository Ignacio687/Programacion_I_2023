import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
  ) { }

  getUsers(): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/usuarios`, {headers: headers})
  }

  getUserByDni(dni: number): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/usuario/${dni}`, {headers: headers}).pipe(first())
  }

  updateUserInfo(dni: number, userData: any): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(userData)
    return this.httpClient.put(`${this.url}/usuario/${dni}`, userData, {headers: headers}).pipe(first())
  }
}

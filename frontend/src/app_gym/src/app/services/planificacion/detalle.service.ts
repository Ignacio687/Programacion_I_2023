import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  url= '/api'
  constructor(
    private httpClient: HttpClient,
  ) { }

  postDetalle(data: any): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.post(`${this.url}/detalle`, data, {headers: headers}).pipe(first())
  }

  putDetalle(data: any, id: Number, dia: string): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    console.log(data)
    return this.httpClient.put(`${this.url}/detalle/${id}/${dia}`, data, {headers: headers}).pipe(first())
  }

}

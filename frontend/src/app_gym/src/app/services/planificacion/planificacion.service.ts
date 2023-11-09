import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
  ) { }
  
  getPlanificacionById(id: number): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/plan/${id}`, {headers: headers}).pipe(first())
  }

  getPlanificacionAlumnoDNI(dni: number): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/plan_alumno/${dni}`, {headers: headers}).pipe(first())
  }

  postPlanificacion(data: any): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.post(`${this.url}/plans`, data, {headers: headers}).pipe(first())
  }

  putPlanificacion(data: any, id: Number): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.put(`${this.url}/plan/${id}`, data, {headers: headers}).pipe(first())
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, first, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
  ) { }
    
  postAlumno(dataAlumno: any): Observable<any>{
    return this.httpClient.post(this.url + '/alumnos', dataAlumno).pipe(take(1))
  }

  getAlumnos(page: number, per_page: number): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    let params = new HttpParams().appendAll({
      "per_page": per_page,
      "page": page,
    });
    return this.httpClient.get(`${this.url}/alumnos`, {headers: headers, params: params})
  }

  getAlumnoByDni(dni: number): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/alumno/${dni}`, {headers: headers}).pipe(first())
  }
}
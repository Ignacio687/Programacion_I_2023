import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take } from 'rxjs';
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

  getAlumnos() {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/alumnos`, {headers: headers})
  }
}
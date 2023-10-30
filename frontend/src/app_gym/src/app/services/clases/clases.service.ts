import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
  ) { }
    
  getClases(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.httpClient.get(`${this.url}/clases`, {headers: headers}).pipe(first())
  }

  inscribirseAlumno(claseID: number, userDNI: number): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.post(`${this.url}/alum_clas/${claseID}/${userDNI}`, null, {headers: headers})
  }

  desuscribirseAlumno(claseID: number, userDNI: number): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.delete(`${this.url}/alum_clas/${claseID}/${userDNI}`, {headers: headers})
  }
}

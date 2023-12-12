import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
  ) { }

  postProfe(dataProf: any): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.post(this.url + '/profs', dataProf, {headers: headers}).pipe(take(1))
  }

  getProfeByDni(dni: number): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/profe/${dni}`, {headers: headers}).pipe(first())
  }

  getProfesores(page: number, per_page: number): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    let params = new HttpParams().appendAll({
      "per_page": per_page,
      "page": page,
    });
    return this.httpClient.get(`${this.url}/profs`, {headers: headers, params: params})
  }
}

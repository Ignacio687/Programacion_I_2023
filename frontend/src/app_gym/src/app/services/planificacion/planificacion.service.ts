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
}

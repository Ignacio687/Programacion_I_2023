import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
  ) { }
    
  getClases() {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.httpClient.get(`${this.url}/clases`, {headers: headers})
  }
}

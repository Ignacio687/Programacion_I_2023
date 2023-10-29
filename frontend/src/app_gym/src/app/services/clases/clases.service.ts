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
}

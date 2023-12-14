import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, first, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
  ) { }
  private stringSearchSubject = new BehaviorSubject<string>('');
  private filtroAplicado = new BehaviorSubject<boolean>(false);
  setFiltroAplicado$ = this.filtroAplicado.asObservable();
  setStringSearch(dia: string): void {
    this.stringSearchSubject.next(dia);

  }
  setFiltroAplicado(filtro: boolean): void {
    this.filtroAplicado.next(filtro)
  }
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
      "nombre": this.stringSearchSubject.value,
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
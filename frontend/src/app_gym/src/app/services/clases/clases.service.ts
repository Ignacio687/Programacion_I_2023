import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, first, BehaviorSubject } from 'rxjs';

interface Clase {
  Clase_id: number;
  Nombre: string;
  Tipo: string;
  Dia: string;
  Horario: string;
}

interface ApiResponse {
  Clases: Clase[];
  total: number;
  pages: number;
  page: number;
}
@Injectable({
  providedIn: 'root'
})

export class ClasesService {
  url= '/api'
  constructor(
    private httpClient: HttpClient,
  ) { }
  private diaSeleccionadoSubject = new BehaviorSubject<string>('');
  diaSeleccionado$ = this.diaSeleccionadoSubject.asObservable();

  setDiaSeleccionado(dia: string): void {
    this.diaSeleccionadoSubject.next(dia);
  }

  setTipoSeleccionado(tipo: string): void {
    this.diaSeleccionadoSubject.next(tipo);
  }

  getClases(page: number, per_page: number, dia:string=""): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    const params = new HttpParams().appendAll({
      "per_page": per_page,
      "page": page,
      "dia" : this.diaSeleccionadoSubject.value
    });
    return this.httpClient.get(`${this.url}/clases`, {headers: headers, params: params}).pipe(first())
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

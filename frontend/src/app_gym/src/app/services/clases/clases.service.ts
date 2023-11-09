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

  private tipoSeleccionadoSubject = new BehaviorSubject<string>('');
  tipoSeleccionado$ = this.tipoSeleccionadoSubject.asObservable();
  
  private ordenarPorHora = new BehaviorSubject<boolean>(false);
  setOrdenarPorHora$: Observable<boolean> = this.ordenarPorHora.asObservable();
    private ordenar= false;
  setDiaSeleccionado(dia: string): void {
    this.diaSeleccionadoSubject.next(dia);
  }

  setTipoSeleccionado(tipo: string): void {
    this.tipoSeleccionadoSubject.next(tipo);
  }

  setOrdenarPorHora(ordenar: boolean): void {
    this.ordenarPorHora.next(ordenar); 
    this.ordenar = ordenar;
  }

  getClases(page: number, per_page: number, dia:string=""): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let params = new HttpParams().appendAll({
      "per_page": per_page,
      "page": page,
      "dia" : this.diaSeleccionadoSubject.value,
      "tipo" : this.tipoSeleccionadoSubject.value,
      "orby_hora":""
    });
    if (!this.ordenar) {
      params = params.delete("orby_hora");
    }
    
    return this.httpClient.get(`${this.url}/clases`, {headers: headers, params: params}).pipe(first())
  }

  getClasesDisponibles(dispoInscFlag: boolean, page: number, per_page: number): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    let params = new HttpParams().appendAll({
      "per_page": per_page,
      "page": page,
      "dia" : this.diaSeleccionadoSubject.value,
      "tipo" : this.tipoSeleccionadoSubject.value,
      "orby_hora":""
    });
    
    if (!this.ordenar) {
      params = params.delete("orby_hora");
    }
    
    return this.httpClient.get(`${this.url}/clases/${dispoInscFlag === true ? "disponible" : "inscripto"}/${Number(localStorage.getItem('token_DNI'))}`, {headers: headers, params: params}).pipe(first())
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, first, BehaviorSubject, Subject, merge } from 'rxjs';

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

  private filtroAplicado = new BehaviorSubject<boolean>(false);
  setFiltroAplicado$ = this.filtroAplicado.asObservable();

  private diaSeleccionadoSubject = new BehaviorSubject<string>('');
  private stringSearchSubject = new BehaviorSubject<string>('');

  private tipoSeleccionadoSubject = new BehaviorSubject<string>('');
  
  private ordenarPorHora = new BehaviorSubject<boolean>(false);

  private pillChangeSubject = new Subject<string>();
  
  // Método para emitir eventos cuando se hace clic en una píldora
  emitPillChange(page: string) {
    this.pillChangeSubject.next(page);
  }

  // Método para suscribirse a los cambios en las píldoras
  onPillChange() {
    return this.pillChangeSubject.asObservable();
  }

  setFiltroAplicado(filtro: boolean): void {
    this.filtroAplicado.next(filtro)
  }

  setDiaSeleccionado(dia: string): void {
    this.diaSeleccionadoSubject.next(dia);
  }

  setStringSearch(dia: string): void {
    this.stringSearchSubject.next(dia);
  }

  setTipoSeleccionado(tipo: string): void {
    this.tipoSeleccionadoSubject.next(tipo);
  }

  setOrdenarPorHora(ordenar: boolean): void {
    this.ordenarPorHora.next(ordenar);
  }

  getClases(page: number, per_page: number, dia:string=""): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let params = new HttpParams().appendAll({
      "per_page": per_page,
      "page": page,
      "nombre" : this.stringSearchSubject.value,
      "dia" : this.diaSeleccionadoSubject.value,
      "tipo" : this.tipoSeleccionadoSubject.value,
      "orby_hora":""
    });
    if (!this.ordenarPorHora) {
      params = params.delete("orby_hora");
    }
    
    return this.httpClient.get(`${this.url}/clases`, {headers: headers, params: params}).pipe(first())
  }

  getClaseById(id: number): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.get(`${this.url}/clase/${id}`, {headers: headers}).pipe(first())
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
    
    if (!this.ordenarPorHora) {
      params = params.delete("orby_hora");
    }
    
    return this.httpClient.get(`${this.url}/clases/${dispoInscFlag === true ? "disponible" : "inscripto"}/${Number(localStorage.getItem('token_DNI'))}`, {headers: headers, params: params}).pipe(first())
  }

  postClase(data: any): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.post(`${this.url}/clases`, data, {headers: headers}).pipe(first())
  }

  postClaseProfesor(data: any): Observable<any>{
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.post(`${this.url}/prof_clas/${data.claseID}/${data.profeDNI}`, null, {headers: headers}).pipe(first())
  }

  putClase(data: any, claseID: Number): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.put(`${this.url}/clase/${claseID}`, data, {headers: headers}).pipe(first())
  }

  deleteClase(claseID: number): Observable<any> {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.httpClient.delete(`${this.url}/clase/${claseID}`, {headers: headers})
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

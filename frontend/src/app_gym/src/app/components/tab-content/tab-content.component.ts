import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { AlumnoService } from 'src/app/services/user/alumno.service';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { PlanificacionService } from 'src/app/services/planificacion/planificacion.service';
import { Observable, firstValueFrom,combineLatest, Subject } from 'rxjs';
import { ProfesorService } from 'src/app/services/user/profesor.service';
import { merge } from 'rxjs';
import { popper } from '@popperjs/core';

@Component({
  selector: 'app-tab-content',
  template: 'parentPageTitles',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent {
  profesores = [
    {
      "Especialidad": "cardio",
      "Inicio_actividad": "20/12/2017",
      "Usuario": {
        "DNI": 48988794,
        "Nombre": "Cristian",
        "Apellidos": "Coria",
        "Telefono": "2614347800",
        "Email": "cristiancoria@gmail.com",
        "Rol": "profesor"
      },
    }
  ];

  per_page: number = 1

  paginationParams: { [key: string]: {
    pageNumber: number;
    collectionSize: number;
    per_page: number;
  }; } = {
    "inscripto": {
      pageNumber: 1,
      collectionSize: 0,
      per_page: this.per_page
    }, 
    "disponibles": {
      pageNumber: 1,
      collectionSize: 0,
      per_page: this.per_page
    },
    "planificaciones": {
      pageNumber: 1,
      collectionSize: 0,
      per_page: this.per_page
    },
    "profesores": {
      pageNumber: 1,
      collectionSize: 0,
      per_page: this.per_page
    },
    "alumnos": {
      pageNumber: 1,
      collectionSize: 0,
      per_page: this.per_page
    },
  }
  
  @Input() parentPageTitles: string[];
  currentRoute: string;
  dia: string = "";
  items: any[] = [];
 

  alumnosObj!: any;
  clasesObj!: any;
  planificacionesObj!: any;
  profesoresObj!: any;
  clasesDisponiblesObj!: any;

  constructor(
	private router: Router,
	private alumnoService: AlumnoService,
  private planificacionService: PlanificacionService,
  private clasesService: ClasesService,
  private profesorService: ProfesorService) {
    this.parentPageTitles = [];
    this.currentRoute = this.router.url;
  }

  get isToken() {
    return localStorage.getItem('token');
  }

  get isTokenRol(): string {
    return localStorage.getItem('token_rol')!;
  }
  
  get isDNI() {
    return Number(localStorage.getItem('token_DNI'));
  }

  ngOnInit(): void {
    const combinedObservables = merge(
      this.clasesService.diaSeleccionado$,
      this.clasesService.tipoSeleccionado$,
      this.clasesService.setOrdenarPorHora$
    );
    combinedObservables.subscribe(valor => {
      this.executeAsyncQueries(1, this.per_page)
    });
  }


  async executeAsyncQueries(pageNumber: number, per_page: number) {
    if (this.isTokenRol === "admin") {
      this.getAlumnos()
    } else if (["profesor", "alumno"].includes(this.isTokenRol)) {
      this.getClasesDisponibles(false, pageNumber, per_page);
      if (this.isTokenRol === "alumno") {
        this.getClasesDisponibles(true, pageNumber, per_page);
      }
      this.getPlanDetalle(pageNumber, per_page)
    } else {
      this.getClases(1, per_page)
    }
  }
  
  definePageContent(page: string){
    let gettersDict: { [page: string]: any} = {
      "inscripto": this.clasesObj,
      "disponibles": this.clasesDisponiblesObj,
      "planificaciones": this.planificacionesObj,
      "profesores": this.getProfesores(),
      "alumnos": this.alumnosObj,
    };
    return gettersDict[page]
  }

  definePaginationConditionalAction(page: string, pageNumber: number, per_page: number) {
    const functions: { [key: string]: {
      useFunction: Function
    }; } = {
      "inscripto": {
        useFunction: () => this.getClasesDisponibles(false, pageNumber, this.paginationParams[page].per_page)
      }, 
      "disponibles": {
        useFunction: () => this.getClasesDisponibles(true, pageNumber, this.paginationParams[page].per_page)
      },
      "planificaciones": {
        useFunction: () => this.getPlanDetalle(pageNumber, this.paginationParams[page].per_page)
      },
      "profesores": {
        useFunction: () => this.getProfesores()
      },
      "alumnos": {
        useFunction: () => this.getAlumnos()
      },
    }
    if (!this.isToken) {
      this.getClases(pageNumber, this.paginationParams[page].per_page)
    } else {
      functions[page].useFunction()
    }
  }

  async getClases(pageNumber: number, per_page: number) {
    return firstValueFrom(this.clasesService.getClases(pageNumber, per_page)).then((data: any) => {
      this.paginationParams["inscripto"].collectionSize = data.pages*10;
      this.paginationParams["inscripto"].pageNumber = data.page;
      this.clasesObj = data.Clases;
    }).catch((err) => {
      console.log(err)
    })
  }

  async getClasesDisponibles(dispoInscFlag: boolean, pageNumber: number, per_page: number) {
    return firstValueFrom(this.clasesService.getClasesDisponibles(dispoInscFlag, pageNumber, per_page)).then((data: any) => {
      if (dispoInscFlag) {
        this.paginationParams["disponibles"].pageNumber = data.page;
        this.paginationParams["disponibles"].collectionSize = data.pages*10;
        this.clasesDisponiblesObj = data.Clases
      } else {
        this.paginationParams["inscripto"].pageNumber = data.page;
        this.paginationParams["inscripto"].collectionSize = data.pages*10;
        this.clasesObj = data.Clases
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  async getPlanDetalle(pageNumber: number, per_page: number) {
    let service = this.planificacionService.getPlanificacionProfeDNI(this.isDNI, pageNumber, per_page)
    if (this.isTokenRol === "alumno") {
      service = this.planificacionService.getPlanificacionAlumnoDNI(this.isDNI, pageNumber, per_page)
    }
    return firstValueFrom(service).then((data: any) => {
      this.paginationParams["planificaciones"].pageNumber = data.page;
      this.paginationParams["planificaciones"].collectionSize = data.pages*10;
      this.planificacionesObj = data.planificaciones
    }).catch((err) => {
      console.log(err)
    })
  }

  getProfesores() {
	  return this.profesores;
  }

  getAlumnos() {
    return firstValueFrom(this.alumnoService.getAlumnos()).then(data => {
      this.alumnosObj = data.alumnos;
    }).catch(err => {
      console.log(err);
    })
  }

  getProfesorProfileImg(dni: number) {
	  return "assets/profe 22.png"
  }

  inscribirse(clase_id:number) {
	  this.clasesService.inscribirseAlumno(clase_id, this.isDNI).subscribe({
      next: (data: any) => {
        this.executeAsyncQueries(1, this.per_page)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  desuscribirse(clase_id:number) {
	  this.clasesService.desuscribirseAlumno(clase_id, this.isDNI).subscribe({
      next: (data: any) => {
        this.executeAsyncQueries(1, this.per_page)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  convertirSaltosDeLinea(texto: string): string {
	  return texto.replace(/\n/g, '<br>');
  }

  dropdownButtonConditionalAction(page: string, title: boolean, ...parameters: any[]) {
    let optionsDict: { [key: string]: { [key: string]: any[]; }; } = {
      "/alum-clases":
      {
      "inscripto": [() => this.desuscribirse(parameters[0]), 'Desuscribirse'],
      "disponibles": [() => this.inscribirse(parameters[0]), 'Inscribirse'],
      },
      "/clases-plan":
      {
      "disponibles": ['Editar', "clases-form/"],
      "planificaciones": ['Editar', "plan-form/"]
      },
      "/admin-page":
      {
      "profesores": ['Editar', "change-user-info/"],
      "alumnos": ['Editar', "change-user-info/"]
      }
    };
    if (title) {
      return optionsDict[this.currentRoute][page][0]
    }
    else {
      if (this.currentRoute === "/alum-clases") {
        optionsDict[this.currentRoute][page][1]();
      } else {
        let parameter2 = ''
        if (parameters[0][1]) {
          parameter2 = parameters[0][1]
        }
        this.router.navigate([optionsDict[this.currentRoute][page][1], parameters[0][0], parameter2, 'editar'])
      }
    }
  }

}

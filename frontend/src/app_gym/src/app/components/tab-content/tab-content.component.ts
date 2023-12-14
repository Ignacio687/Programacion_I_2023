import { Component, Input } from '@angular/core';
import { Router} from '@angular/router';
import { AlumnoService } from 'src/app/services/user/alumno.service';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { PlanificacionService } from 'src/app/services/planificacion/planificacion.service';
import { firstValueFrom } from 'rxjs';
import { ProfesorService } from 'src/app/services/user/profesor.service';

@Component({
  selector: 'app-tab-content',
  template: 'parentPageTitles',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent {

  per_page: number = 5

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
      per_page: 1
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
  counter: number;
  collapseButton : boolean[] = Array(this.per_page).fill(true);

  alumnosObj!: any;
  clasesObj!: any;
  planificacionesObj!: any;
  profesoresObj!: any;
  clasesDisponiblesObj!: any;
  page_anterior = ["/clases-plan", "/alum-clases"].includes(this.router.url) ? "inscripto" : "profesores" ;
  
  constructor(
	private router: Router,
	private alumnoService: AlumnoService,
  private planificacionService: PlanificacionService,
  private clasesService: ClasesService,
  private profesorService: ProfesorService) {
    this.counter = 0
    this.parentPageTitles = [];
    this.currentRoute = this.router.url;
    this.clasesService.onPillChange().subscribe(page => {
      this.set_default_filter_values()
      this.definePaginationConditionalAction(page, this.paginationParams[page].pageNumber, this.paginationParams[page].per_page);
      this.page_anterior = page;
    });
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
    this.set_default_filter_values()
    for (let service of [this.clasesService, this.profesorService, this.alumnoService]) {
      service.setFiltroAplicado$.subscribe(valor => {
        this.paginationParams[this.page_anterior].pageNumber = 1
        this.definePaginationConditionalAction(this.page_anterior, this.paginationParams[this.page_anterior].pageNumber, this.paginationParams[this.page_anterior].per_page)
      });
    }
    this.executeAsyncQueries(1, this.per_page)
  }

  async executeAsyncQueries(pageNumber: number, per_page: number) {
    if (this.isTokenRol === "admin") {
      this.getAlumnos(pageNumber, per_page)
      this.getProfesores(pageNumber, per_page)
      this.getClases(pageNumber, per_page)
      this.getPlanificaciones(pageNumber, per_page)
    } else if (["profesor", "alumno"].includes(this.isTokenRol)) {
      this.getClasesDisponibles(false, pageNumber, per_page);
      if (this.isTokenRol === "alumno") {
        this.getClasesDisponibles(true, pageNumber, per_page);
      }
      this.getPlanDetalle(pageNumber, per_page)
    } else {
      this.getClases(pageNumber, per_page)
    }
  }

  setCollapseButton(id:number) {
    this.collapseButton[id] = !this.collapseButton[id]
  }

  set_default_filter_values(){
    this.clasesService.setStringSearch('')
    this.clasesService.setDiaSeleccionado('')
    this.clasesService.setOrdenarPorHora(false);
    this.clasesService.setTipoSeleccionado('')
    this.profesorService.setStringSearch('')
    this.collapseButton = Array(this.per_page).fill(true)
  }
  
  definePageContent(page: string){
    let gettersDict: { [page: string]: any} = {
      "inscripto": this.clasesObj,
      "disponibles": this.clasesDisponiblesObj,
      "planificaciones": this.planificacionesObj,
      "profesores": this.profesoresObj,
      "alumnos": this.alumnosObj,
    };
    return gettersDict[page]
  }

  definePaginationConditionalAction(page: string, pageNumber: number, per_page: number) {
    this.collapseButton = Array(this.per_page).fill(true)
    const functions: { [key: string]: {
      useFunction: Function
    }; } = {
      "inscripto": {
        useFunction: () => this.isTokenRol!=="admin"? this.getClasesDisponibles(false, pageNumber, this.paginationParams[page].per_page): this.getClases(pageNumber, this.paginationParams[page].per_page)
      }, 
      "disponibles": {
        useFunction: () => this.getClasesDisponibles(true, pageNumber, this.paginationParams[page].per_page)
      },
      "planificaciones": {
        useFunction: () => this.isTokenRol!=="admin"? this.getPlanDetalle(pageNumber, this.paginationParams[page].per_page): this.getPlanificaciones(pageNumber, this.paginationParams[page].per_page)
      },
      "profesores": {
        useFunction: () => this.getProfesores(pageNumber, this.paginationParams[page].per_page),
      },
      "alumnos": {
        useFunction: () => this.getAlumnos(pageNumber, this.paginationParams[page].per_page)
      },
    }
    if (!this.isTokenRol) {
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

  async getPlanificaciones(pageNumber: number, per_page: number) {
    firstValueFrom(this.planificacionService.getPlanificaciones(pageNumber, per_page)).then((data: any) => {
      this.paginationParams["planificaciones"].pageNumber = data.page;
      this.paginationParams["planificaciones"].collectionSize = data.pages*10;
      this.planificacionesObj = []
      if (data.Planificaciones.length = 1) {
        for (let plan of data.Planificaciones) {
          firstValueFrom(this.planificacionService.getPlanificacionById(plan.planificacion_id)).then((data: any) => {
            this.planificacionesObj.push(data);
          }).catch((err: any) => {
            console.log(err)
          })
        }
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }

  async getProfesores(pageNumber: number, per_page: number) {
    return firstValueFrom(this.profesorService.getProfesores(pageNumber, per_page)).then(data => {
      this.paginationParams["profesores"].pageNumber = data.page;
      this.paginationParams["profesores"].collectionSize = data.pages*10;
      this.profesoresObj = data.profesores;
    }).catch(err => {
      console.log(err);
    })
  }

  async getAlumnos(pageNumber: number, per_page: number) {
    return firstValueFrom(this.alumnoService.getAlumnos(pageNumber, per_page)).then(data => {
      this.paginationParams["alumnos"].pageNumber = data.page;
      this.paginationParams["alumnos"].collectionSize = data.pages*10;
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
        this.collapseButton = Array(this.per_page).fill(true)
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
      "inscripto": ['Desuscribirse', () => this.desuscribirse(parameters[0])],
      "disponibles": ['Inscribirse', () => this.inscribirse(parameters[0])],
      },
      "/clases-plan":
      {
      "disponibles": ['Editar', "clases-form/"],
      "planificaciones": ['Editar', "plan-form/"],
      "inscripto": ['Editar', "clases-form/"],
      },
      "/admin-page":
      {
      "profesores": ['Editar', "change-user-info/prof/"],
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
        if (parameters[0][1]) {
          this.router.navigate([optionsDict[this.currentRoute][page][1], parameters[0][0], parameters[0][1], 'editar'])
        } else {
          this.router.navigate([optionsDict[this.currentRoute][page][1], parameters[0], 'editar'])
        }
      }
    }
  }

}

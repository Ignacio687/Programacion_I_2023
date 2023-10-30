import { Component, Input } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { AlumnoService } from 'src/app/services/user/alumno.service';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { PlanificacionService } from 'src/app/services/planificacion/planificacion.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ProfesorService } from 'src/app/services/user/profesor.service';

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
		  "Apellidos": "Coria",  // IMPORTANTE en la base de datos esta como Apelidos le falta una l arreglar
		  "Telefono": "2614347800",
		  "Email": "cristiancoria@gmail.com",
		  "Rol": "profesor"
	  },
	}
  ];
  
  page=1;
  @Input() parentPageTitles: string[];
  currentRoute: string;

  alumnosObj!: any;
  clasesObj!: any;
  planificacionesObj!: any;
  profesoresObj!: any;
  clasesDisponiblesObj!: any;

  constructor(
	private router: Router,
	private alumnoService: AlumnoService,
	private clasesService: ClasesService,
  private planificacionService: PlanificacionService,
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

  ngOnInit() {
    this.executeAsyncQueries()
  }

  async executeAsyncQueries() {
    if (this.isTokenRol === "admin") {
      this.getAlumnos()
      console.log(this.alumnosObj)
    } else if (["profesor", "alumno"].includes(this.isTokenRol)) {
      await this.getUserData()
      if (this.isTokenRol === "alumno") {
        await this.getClasesDisponibles();
      }
      for (let planIndex=0; planIndex < this.planificacionesObj.length; planIndex++) {
        let plan = this.planificacionesObj[planIndex]
        await this.getPlanDetalle(plan ,planIndex);
      }
    } else {
      this.getClases()
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

  async getUserData() {
    let service!: Observable<any>
    if (this.isTokenRol ==="alumno") {
      service = this.alumnoService.getAlumnoByDni(this.isDNI);
    } else if (this.isTokenRol === "profesor") {
      service = this.profesorService.getProfeByDni(this.isDNI);
    }
    return firstValueFrom(service).then((data: any) => {
      this.clasesObj = data.Clases
      this.planificacionesObj = data.Planificaciones
    }).catch((error) => {
      console.log(error)
    })
  }
  
  async getClases() {
    return firstValueFrom(this.clasesService.getClases()).then((data: any) => {
      this.clasesObj = data.Clases;
    }).catch((err) => {
      console.log(err)
    })
  }

  async getClasesDisponibles() {
    return firstValueFrom(this.clasesService.getClases()).then((data: any) => {
      const claseIds = this.clasesObj.map((clase: any) => clase.Clase_id);
      const filteredData = data.Clases.filter((clase: any) => !claseIds.includes(clase.Clase_id));
      this.clasesDisponiblesObj = filteredData;
    }).catch((err) => {
      console.log(err)
    })
  }

  async getPlanDetalle(plan: any, planIndex: number) {
    return firstValueFrom(this.planificacionService.getPlanificacionById(plan.planificacion_id)).then((data: any) => {
      this.planificacionesObj[planIndex] = data
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
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  desuscribirse(clase_id:number) {
	  this.clasesService.desuscribirseAlumno(clase_id, this.isDNI).subscribe({
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  convertirSaltosDeLinea(texto: string): string {
	  return texto.replace(/\n/g, '<br>');
  }

  dropdownButtonConditionalAction(page: string, title: boolean, parameter_id: number=0) {
    let optionsDict: { [key: string]: { [key: string]: string[]; }; } = {
      "/alum-clases":
      {
      "inscripto": ['Desuscribirse', 'Desuscribirse'],
      "disponibles": ['Inscribirse', 'Inscribirse'],
      },
      "/clases-plan":
      {
      "disponibles": ['Editar', 'clases-form/:'+String(parameter_id)+'/editar'],
      "planificaciones": ['Editar', 'plan-form/:'+String(parameter_id)+'/editar']
      },
      "/admin-page":
      {
      "profesores": ['Editar', 'change-user-info/'+String(parameter_id)+'/editar'],
      "alumnos": ['Editar', 'change-user-info/'+String(parameter_id)+'/editar']
      }
    };
    if (title) {
      return optionsDict[this.currentRoute][page][0]
    }
    else {
      let action = optionsDict[this.currentRoute][page][1];
      if (action === 'Desuscribirse') {
        this.desuscribirse(parameter_id);
      } else if ( action === 'Inscribirse') {
        this.inscribirse(parameter_id);
      } else {
        this.router.navigate([action]);
      }
      return false;
    }
  }

}

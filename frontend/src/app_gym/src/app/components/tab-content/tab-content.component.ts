import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/user/alumno.service';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { PlanificacionService } from 'src/app/services/planificacion/planificacion.service';
import { firstValueFrom } from 'rxjs';

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
  private planificacionService: PlanificacionService) {
    this.parentPageTitles = [];
    this.currentRoute = this.router.url;
  }

  get isToken() {
    return localStorage.getItem('token');
  }

  get isTokenRol() {
    return localStorage.getItem('token_rol');
  }
  
  get isDNI() {
    return Number(localStorage.getItem('dni'));
  }

  ngOnInit() {
    this.executeAsyncQueries()
  }

  async executeAsyncQueries() {
    if (this.isTokenRol === "admin") {
      this.getAlumnos()
      console.log(this.alumnosObj)
    } else if (this.isTokenRol === "profesor") {

    } else if (this.isTokenRol === "alumno") {
      await this.getUserData()
      await this.getClasesDisponibles();
      for (let plan of this.planificacionesObj) {
        await this.getPlanDetalle(plan);
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
    return firstValueFrom(this.alumnoService.getAlumnoByDni(this.isDNI)).then((data: any) => {
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

  async getPlanDetalle(plan: any) {
    return firstValueFrom(this.planificacionService.getPlanificacionById(plan.planificacion_id)).then((data: any) => {
      plan["detalles_dia"] = data.detalles_dia;
    }).catch((err) => {
      console.log(err)
    })
  }

  getProfesores() {
	  return this.profesores;
  }

  getAlumnos() {
      return new Promise(() => {
      this.alumnoService.getAlumnos().subscribe({
        next: (data: any) => {
          this.alumnosObj = data.alumnos;
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    });
  }

  getProfesorByDni(dni: number) {
	  return "Lillo"
  }

  getAlumnoByDni(dni: number) {
	  return "Pablo Ruiz"
  }

  getProfesorProfileImg(dni: number) {
	  return "assets/profe 22.png"
  }

  inscribirse(clase_id:number) {
	  console.log(clase_id)
  }

  desuscribirse(clase_id:number) {
	  console.log(clase_id)
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

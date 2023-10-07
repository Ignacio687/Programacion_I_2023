import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-content',
  template: 'parentPageTitles',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent {
  // "clases" se va a obtener desde el back cuando lo conectemos
  clases = [
    {
        "Clase_id": 1,
        "Nombre": "Zumba",
        "Tipo": "Cardio",
        "Dia": "Lunes",
        "Horario": "10:30"
    },
    {
      "Clase_id": 3,
      "Nombre": "Functional",
      "Tipo": "Estiramiento",
      "Dia": "Jueves",
      "Horario": "12:15"
    }
  ];
  // "clasesDisponibles" se va a obtener desde el back cuando lo conectemos
  clasesDisponibles = [
    {
      "Clase_id": 2,
      "Nombre": "Boxeo",
      "Tipo": "Cardio",
      "Dia": "Martes",
      "Horario": "20:30"
    }
  ];
  // "planificaciones" se va a obtener desde el back cuando lo conectemos
  planificaciones = [
    {
      "planificacion_id": 1,
      "profesor_DNI": 48988794,
      "alumno_DNI": 489721048,
      "estado": true,
      "creation_date": "20/05/2019",
      "detalles_dia": [
        {
            "planificacion_id": 1,
            "dia": "Martes",
            "detalle": "Cardio y bicicleta"
        },
        {
          "planificacion_id": 2,
          "dia": "Miercoles",
          "detalle": "PushUp aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
      ]
    }
  ];
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
  alumnos = [
    {
      "Edad": 30,
      "Sexo": false,
      "Usuario": {
          "DNI": 48978797,
          "Nombre": "Tomas",
          "Apellidos": "Bastias",
          "Telefono": "2614348546",
          "Email": "tomasbastias@gmail.com",
          "Rol": "alumno"
      },
    },
    {
      "Edad": 25,
      "Sexo": true,
      "Usuario": {
          "DNI": 48987025,
          "Nombre": "Franco",
          "Apellidos": "Sales",
          "Telefono": "2614349987",
          "Email": "francosales@gmail.com",
          "Rol": "alumno"
      },
    },
    {
      "Edad": 55,
      "Sexo": false,
      "Usuario": {
          "DNI": 489721048,
          "Nombre": "Lisan",
          "Apellidos": "Rivera",
          "Telefono": "2614348976",
          "Email": "riveralisan@gmail.com",
          "Rol": "alumno"
      },
    }
  ];
  @Input() parentPageTitles: string[];

  currentRoute: string;
  
  constructor(private router: Router) {
    this.parentPageTitles = [];
    this.currentRoute = this.router.url;
  }

  conditionalRuoter(page: string) {
    let gettersDict: { [page: string]: string} = {
      "profesores": '/change-user-info',
      "alumnos": '/change-user-info'
    };
    let pageRoute = gettersDict[page]
    if (pageRoute) {
      this.router.navigate([pageRoute])
    }
  }

  definePageContent(page: string){
    let gettersDict: { [page: string]: any} = {
      "inscripto": this.getClases(),
      "disponibles": this.getClasesDisponibles(),
      "planificaciones": this.getPlanificaciones(),
      "profesores": this.getProfesores(),
      "alumnos": this.getAlumnos()
    };
    return gettersDict[page]
  }
  getClases() {
    return this.clases;
  }
  getClasesDisponibles() {
    return this.clasesDisponibles;
  }
  getPlanificaciones() {
    return this.planificaciones;
  }
  getProfesores() {
    return this.profesores;
  }
  getAlumnos() {  
    return this.alumnos;
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
  }
  desinscribirse(clase_id:number) {
  }
}

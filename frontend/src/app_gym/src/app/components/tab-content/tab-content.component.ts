import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/user/alumno.service';

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
			"detalle": "Espalda y Bíceps\n\nDominadas o Pull-ups: 3-4 series de 6-8 repeticiones.\nPeso muerto: 3 series de 6-8 repeticiones.\nPull-ups en máquina asistida: 3 series de 8-10 repeticiones (si es necesario).\nCurl de bíceps con barra: 3-4 series de 6-8 repeticiones.\nCurl de martillo con mancuernas: 3 series de 8-10 repeticiones.\nCurl de bíceps en polea baja: 3 series de 10-12 repeticiones."
		},
		{
		  "planificacion_id": 2,
		  "dia": "Miercoles",
		  "detalle": " Pecho y Tríceps\n\nPress de banca: 3-4 series de 6-8 repeticiones\nPress de banca inclinado: 3 series de 8-10 repeticiones\nAperturas con mancuernas: 3 series de 10-12 repeticiones\nFondos en paralelas: 3 series de 8-10 repeticiones\nPress de tríceps con barra: 3-4 series de 6-8 repeticiones\nTríceps en polea alta: 3 series de 8-10 repeticiones."
	  }
	  ]
	}
  ];
  // "profesores" se va a obtener desde el back cuando lo conectemos
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
  // "alumnos" se va a obtener desde el back cuando lo conectemos
//   alumnos = [
// 	{
// 	  "Edad": 30,
// 	  "Sexo": false,
// 	  "Usuario": {
// 		  "DNI": 48978797,
// 		  "Nombre": "Tomas",
// 		  "Apellidos": "Bastias",
// 		  "Telefono": "2614348546",
// 		  "Email": "tomasbastias@gmail.com",
// 		  "Rol": "alumno"
// 	  },
// 	},
// 	{
// 	  "Edad": 25,
// 	  "Sexo": true,
// 	  "Usuario": {
// 		  "DNI": 48987025,
// 		  "Nombre": "Franco",
// 		  "Apellidos": "Sales",
// 		  "Telefono": "2614349987",
// 		  "Email": "francosales@gmail.com",
// 		  "Rol": "alumno"
// 	  },
// 	},
// 	{
// 	  "Edad": 55,
// 	  "Sexo": false,
// 	  "Usuario": {
// 		  "DNI": 489721048,
// 		  "Nombre": "Lisan",
// 		  "Apellidos": "Rivera",
// 		  "Telefono": "2614348976",
// 		  "Email": "riveralisan@gmail.com",
// 		  "Rol": "alumno"
// 	  },
// 	}
//   ];
  
  page=1;
  @Input() parentPageTitles: string[];
  currentRoute: string;

  alumnosObj: any;

  constructor(
	private router: Router,
	private alumnoService: AlumnoService) {
	this.parentPageTitles = [];
	this.currentRoute = this.router.url;
  }
  
  ngOnInit() {
	this.getAlumnos()
	console.log(this.alumnosObj)
  }

  definePageContent(page: string){
	let gettersDict: { [page: string]: any} = {
	  "inscripto": this.getClases(),
	  "disponibles": this.getClasesDisponibles(),
	  "planificaciones": this.getPlanificaciones(),
	  "profesores": this.getProfesores(),
	  "alumnos": this.alumnosObj,
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
	this.alumnoService.getAlumnos().subscribe({
		next: (data: any) => {
			this.alumnosObj = data.alumnos;
		},
		error: (error: any) => {
			console.log(error);
		}
	})
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

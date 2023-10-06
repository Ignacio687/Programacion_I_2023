import { Component, Input } from '@angular/core';

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
        "Clase_id": 2,
        "Nombre": "Boxeo",
        "Tipo": "Cardio",
        "Dia": "Martes",
        "Horario": "20:30"
    },
    {
        "Clase_id": 3,
        "Nombre": "Functional",
        "Tipo": "Estiramiento",
        "Dia": "Jueves",
        "Horario": "12:15"
    }
  ];
  // "planificaciones" se va a obtener desde el back cuando lo conectemos
  planificaciones = [
    {
      "planificacion_id": 1,
      "profesor_DNI": 48988794,
      "alumno_DNI": 489721048,
      "estado": true,
      "creation_date": "20/05/2019"
    }
  ]

  @Input() parentPageTitles: string[];

  constructor() { 
    this.parentPageTitles = []
  }

  getClases() {
    return this.clases;
  }
}

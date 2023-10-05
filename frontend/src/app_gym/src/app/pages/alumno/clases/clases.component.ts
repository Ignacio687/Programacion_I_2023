import { Component } from '@angular/core';

@Component({
  selector: 'app-clases',
  template: '<app-tab-pages [titlesData]="parentTitlesData"></app-tab-pages>',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {
 parentTitlesData = [
  {
    title: "INSCRIPTO",
    id: "pills-home-tab",
    "data-bs-target": "#pills-home",
    "aria-controls": "pills-home",
    "aria-selected": "true"
  },
  {
    title: "DISPONIBLES",
    id: "pills-disponibles-tab",
    "data-bs-target": "#pills-profile",
    "aria-controls": "pills-profile",
    "aria-selected": "false"
  },
  {
    title: "PLANIFICACIONES",
    id: "pills-planification-tab",
    "data-bs-target": "#pills-planification",
    "aria-controls": "pills-planification",
    "aria-selected": "false"
  }
 ]
 constructor() { }
}

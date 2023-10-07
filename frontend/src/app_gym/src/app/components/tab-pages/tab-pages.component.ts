import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-pages',
  templateUrl: './tab-pages.component.html',
  styleUrls: ['./tab-pages.component.css']
})
export class TabPagesComponent {
  titlesList: { [key: string]: string[] } = {
    "alum-clases": ["inscripto", "disponibles", "planificaciones"],
    "admin-page": ["profesores", "alumnos"],
    "clases-plan": ["disponibles", "planificaciones"]
  };
  
  currentRoute: string;
  
  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }
  getCurrentPageTitles(): string[] {
      return this.titlesList[this.currentRoute.replace('/', '')];
  }
}

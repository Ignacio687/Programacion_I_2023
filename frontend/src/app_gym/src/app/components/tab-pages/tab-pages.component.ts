import { ArrayType } from '@angular/compiler';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-pages',
  template: 'titlesData',
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
      return this.titlesList[this.currentRoute.replace('/', '')]; //No funcionaba porque la url es /alum-clases y la key es igual pero sin la barra
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ClasesService } from 'src/app/services/clases/clases.service';


@Component({
  selector: 'app-tab-pages',
  templateUrl: './tab-pages.component.html',
  styleUrls: ['./tab-pages.component.css']
})
export class TabPagesComponent {
  titlesList: { [key: string]: string[] } = {
    "alum-clases": ["inscripto", "disponibles", "planificaciones"],
    "admin-page": ["profesores", "alumnos"],
    "clases-plan": ["inscripto", "planificaciones"]
  };
    
  currentRoute: string;
  onPillClick(page: string) {
    this.clasesService.emitPillChange(page);
  }

  get isToken() {
    return localStorage.getItem('token');
  }

  get isTokenRol() {
    return localStorage.getItem('token_rol');
  }

  constructor(private router: Router, private clasesService: ClasesService) {
    this.currentRoute = this.router.url;
  }
  getCurrentPageTitles(): string[] {
      return this.titlesList[this.currentRoute.replace('/', '')];
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfesorService } from 'src/app/services/user/profesor.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  profesores: any[] = [];
  rutaBaseImagenes = '/assets/profes';

  constructor (
    private profesorService: ProfesorService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.getProfesores();
  }

  getProfesores(): void {
    this.profesorService.getProfesores(1, 4).subscribe({
      next: (profes: any) => {
        this.profesores = profes.profesores;
        this.asignarImagenesAleatorias();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  asignarImagenesAleatorias(): void {
    let imagenes = ["profe-1.png", "profe-2.png", "profe-3.png", "profe-4.png"]
    
    this.profesores.forEach((profesor: any) => {
      let indiceAleatorio = Math.floor(Math.random() * imagenes.length);
      profesor.imagenAleatoria = `${this.rutaBaseImagenes}/${imagenes[indiceAleatorio]}`;
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  arrayProfesores = [
    {
      img: 'assets/profe 21.png',
      title: 'Horacio Larreta',
      description: ['PowerLifting', 'Running']
    },
    {
      img: 'assets/profe 25.png',
      title: 'Daniela Lopez',
      description: ['Crossfit', 'Running']
    },
    {
      img: 'assets/profe 24.png',
      title: 'Pablo Lillo',
      description: ['PowerLifting', 'Cardio']
    },
  ]
  constructor() {}
  ngOnInit(): void {
    console.log('arrayClases: ', this.arrayProfesores)
  }

}

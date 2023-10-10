import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  // 'profesoresImg' va a estar en algun servicio de el front donde esten las imagenes
  profesoresImg = [
    {
      dni: 48987810,
      img: 'assets/profe 21.png',
    },
    {
      dni: 48988794,
      img: 'assets/profe 25.png',
    },
    {
      dni: 48984898,
      img: 'assets/profe 24.png',
    },
  ];

  profesores = [
    {
      "Especialidad": "PowerLifting",
      "Inicio_actividad": "12/12/2012",
      "Usuario": {
        "DNI": 48987810,
        "Nombre": "Cristian",
        "Apellidos": "Coria",  // IMPORTANTE en la base de datos esta como Apelidos le falta una l arreglar
        "Telefono": "2614347800",
        "Email": "cristiancoria@gmail.com",
        "Rol": "profesor"
      },
    },
    {
      "Especialidad": "cardio",
      "Inicio_actividad": "20/12/2017",
      "Usuario": {
        "DNI": 48988794,
        "Nombre": "Ana",
        "Apellidos": "Gonzales",  // IMPORTANTE en la base de datos esta como Apelidos le falta una l arreglar
        "Telefono": "2614347800",
        "Email": "cristiancoria@gmail.com",
        "Rol": "profesor"
      },
    },
    {
      "Especialidad": "Crossfit",
      "Inicio_actividad": "20/09/2022",
      "Usuario": {
        "DNI": 48984898,
        "Nombre": "Daniela",
        "Apellidos": "Lopez",  // IMPORTANTE en la base de datos esta como Apelidos le falta una l arreglar
        "Telefono": "2614347800",
        "Email": "cristiancoria@gmail.com",
        "Rol": "profesor"
      },
    },
  ];


  getProfesores() {
    return this.profesores
  }
  getProfesorImgAddr(dni: number) {
    for (let profe of this.profesoresImg) {
      if (profe.dni === dni) {
        return profe.img
      }
    } return '';
  }
  constructor() {}

}

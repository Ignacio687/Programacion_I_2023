import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { AlumnoService } from'src/app/services/user/alumno.service';
import { ProfesorService } from 'src/app/services/user/profesor.service';
import { UsuarioService } from 'src/app/services/user/usuario.service';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})

export class NavVarComponent{

  pagesUrlsArray = [
    {
      sectionTitle: 'Inicio',
      url: '/home',
      iconPath: ['M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z'],
      permission: ['any', 'alumno', 'admin', 'profesor']
    },
    {
      sectionTitle: 'Editar Perfil',
      url: '/change-user-info',
      iconPath: ['M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z'],
      permission: ['alumno', 'admin', 'profesor']
    },
    {
      sectionTitle: 'Clases',
      url: '/alum-clases',
      iconPath: ['M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z'],
      permission: ['any', 'alumno']
    },
    {
      sectionTitle: 'Clases y planificaciones',
      url: '/clases-plan',
      iconPath: ['M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z', 'M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z'],
      permission: ['profesor', 'admin']
    },
    {
      sectionTitle: 'Profesores y alumnos',
      url: '/admin-page',
      iconPath: ['M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
      permission: ['admin']
    },
    {
      sectionTitle: 'Horarios y dirección',
      url: '/horarios',
      iconPath: ['M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z', 'M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z'],
      permission: ['any', 'alumno', 'admin', 'profesor']
    },
  ];

  userData!: any;
  tokenStatus!: string|null

  constructor(
    private router: Router,
    private loginService: LoginService,
    private usuarioService: UsuarioService
    ) {
  }

  get isTokenRol() {
    return localStorage.getItem("token_rol")
  }

  get isToken(){
    return localStorage.getItem('token');
  }

  get isDNI() {
    return Number(localStorage.getItem('token_DNI'));
  }

  ngDoCheck() {
    if (this.tokenStatus !== this.isToken) {
      this.tokenStatus = this.isToken
      this.getUserData()
    }
  }

  getUserData() {
    return firstValueFrom(this.usuarioService.getUserByDni(this.isDNI)).then((data: any) => {
      this.userData = data;
    }).catch((error) => {
      this.userData = null;
    })
  }

  cerrarSesion(){
    this.loginService.logout();
  }

  getCurrentRoute() {
    return this.router.url;
  }
  
  setButtonVisibility(page: any) {
    if (this.isTokenRol) {
      if(page.permission.includes(this.isTokenRol)) {
        return true
      } else { 
        return false
      }
    } else {
      if (page.permission.includes('any')) {
        return true
      } else {
        return false
      }
    }
  }
}
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-register-button',
  templateUrl: './generate-register-button.component.html',
  styleUrls: ['./generate-register-button.component.css']
})
export class GenerateRegisterButtonComponent {
  currentRoute: string;

  @Input() parentPage: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
    this.parentPage = '';
  }

  routeSelector() {
    let routerDict: { [key: string]: string } = {
      "disponibles": '/clases-form',
      "planificaciones": '/plan-form',
      "profesores": '/register',
      "alumnos": '/register',
    }
    return routerDict[this.parentPage]
  }
}

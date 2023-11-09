import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-selector-button',
  templateUrl: './form-selector-button.component.html',
  styleUrls: ['./form-selector-button.component.css']
})
export class FormSelectorButtonComponent {
  @Input() parentPage: string;
  currentRoute: string;

  constructor(
    private router: Router,
  ) {
    this.parentPage = '';
    this.currentRoute = this.router.url;
  }

  get isTokenRol(): string {
    return localStorage.getItem('token_rol')!;
  }

  routeSelector() {
    let routerDict: { [key: string]: string } = {
      "inscripto": '/clases-form',
      "planificaciones": '/plan-form',
    }
    this.router.navigateByUrl(routerDict[this.parentPage])
  }
}

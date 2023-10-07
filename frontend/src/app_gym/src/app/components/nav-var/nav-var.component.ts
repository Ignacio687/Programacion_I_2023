import { Component, Directive, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})

export class NavVarComponent{
  constructor(
    private router: Router,
    private authService: AuthService
    ) {
  }

  is404Page = false;
  get isToken(){
    return localStorage.getItem('token');
  }
  ngOnInit(): void {
    console.log('routerLink: ', this.router.url)
    this.router.events

  }
  
  
  cerrarSesion(){
    this.authService.logout();
  }
}

// @Directive({selector: "a[hideNav]"})
// export class NavVarToggler {
//   navBarToggler = true;

//   @HostListener('click')
//   hideNavBar() {
//     this.navBarToggler = false;
//   }
// }

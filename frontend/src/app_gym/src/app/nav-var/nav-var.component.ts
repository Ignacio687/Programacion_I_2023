import { Component, Directive, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})

export class NavVarComponent {
}

// @Directive({selector: "a[hideNav]"})
// export class NavVarToggler {
//   navBarToggler = true;

//   @HostListener('click')
//   hideNavBar() {
//     this.navBarToggler = false;
//   }
// }

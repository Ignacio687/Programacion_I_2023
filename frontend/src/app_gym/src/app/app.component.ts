import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app_gym';

  ngOnInit() {
    console.log(
      {
        Admin: {email: 'matiasboldrini@gmail.com', password: 'ujshu110945-'},
        Profesor: {email: '', password: ''},
        Alumno: {email: '', password: ''}
      }
    )
  }
}
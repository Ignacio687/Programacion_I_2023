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
        Profesor: {email: 'gonzaloruiz@gmail.com', password: '45skuqy^%#.5665s'},
        Alumno: {email: 'juangomez@gmail.com', password: 'adhwir6292.&@'},
        Alumno2: {email: 'pepeGarcia@gmail.com', password: 'adsd4848*awd92'}
      }
    )
  }
}
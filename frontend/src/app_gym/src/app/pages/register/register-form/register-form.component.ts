import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataManagerService } from 'src/app/services/data-manager.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  inputFields = {
    register: [
      {
        label: "Nombre y Apellido",
        type: "text",
        formControlName: "nombre"
      },
      {
        label: "Teléfono",
        type: "tel",
        formControlName: "telefono"
      },
      {
        label: "Edad",
        type: "number",
        formControlName: "edad"
      },
    ]
  }
  selectedOption: string = 'Selecciona una opción'; // Valor inicial'
  registerForm!: FormGroup;

  get isTokenRol() { 
    return localStorage.getItem('token_rol');
  }

  constructor(
    private dataManagerService: DataManagerService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.maxLength(10), Validators.required]],
      edad: ['', [Validators.required]]
    })
  }

}

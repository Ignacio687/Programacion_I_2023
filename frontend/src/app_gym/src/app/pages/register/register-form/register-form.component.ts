import { NumberFormatStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { AlumnoService } from 'src/app/services/user/alumno.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  inputFields = {
    register: [
      {
        label: "DNI",
        type: "number",
        formControlName: "dni"
      },
      {
        label: "Nombre",
        type: "text",
        formControlName: "nombre"
      },
      {
        label: "Apellido",
        type: "text",
        formControlName: "apellido"
      },
      {
        label: "Teléfono",
        type: "number",
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
    private router: Router,
    private alumnoService: AlumnoService,
    private registerService: RegisterService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.maxLength(10), Validators.required]],
      edad: ['', [Validators.required]]
    })
  }

  register(dataRegister: any = {}, alumnoData: any = {}){
    this.registerService.register(dataRegister).subscribe({
      next: (rta: any) => {
        this.alumnoService.postAlumno(alumnoData).subscribe({
          next: (rta: any) => {
            alert("Registro Exitoso")
            this.router.navigateByUrl('/home');
          },
          error: (error: any ) => {
            console.log(error);
            alert('Error al registrar')
          }
        })
      },
      error: (error: any) => {
        console.log(error);
        alert('Error al registrar')
      },
    })
  }

  submit() { 
    if (this.registerForm.valid && this.selectedOption!=="Selecciona una opción") {
      let credentials = this.dataManagerService.getUserCredentials()
      let registerData = {
        "DNI": Number(this.registerForm.get("dni")?.value),
        "Nombre": this.registerForm.get("nombre")?.value,
        "Apelidos": this.registerForm.get("apellido")?.value,
        "Telefono": Number(this.registerForm.get("telefono")?.value),
        "Email": credentials.email,
        "Password": credentials.password,
        "Rol": "alumno",
      }
      let userSex = true
      if (this.selectedOption === "Masculino") {
        userSex = false
      }
      let alumnoData = {
        "DNI": Number(this.registerForm.get("dni")?.value),
        "Edad": Number(this.registerForm.get("edad")?.value),
        "Sexo": Boolean(userSex)
      }
      console.log(alumnoData)
      this.register(registerData, alumnoData);
    }
  }

}

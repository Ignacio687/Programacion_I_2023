import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { AlumnoService } from 'src/app/services/user/alumno.service';


@Component({
  selector: 'app-form-content',
  templateUrl: './form-content.component.html',
  styleUrls: ['./form-content.component.css']
})
export class FormContentComponent {
  inputFields: {
    [key: string]: {
      formLabel: string;
      formContentLabels: {
        label: string;
        type: string;
        formControlName: string;
      }[];
    };
  } = {
    "/register-form": {
      formLabel: "Contanos un poco sobre vos",
      formContentLabels: [
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
    },
    "/plan-form": {
      formLabel: "Crear una planificación",
      formContentLabels: [
        {
          label: "DNI del Alumno",
          type: "number",
          formControlName: "alumnoDNI"
        },
        {
          label: "Detalle de la planificación",
          type: "text",
          formControlName: "detalle"
        },
      ]
    },
  }

  selectedOption: string = 'Selecciona una opción'; // Valor inicial'
  registerForm!: FormGroup;
  planForm!: FormGroup;

  get isTokenRol() { 
    return localStorage.getItem('token_rol');
  }

  get currentRoute() {
    return this.router.url
  }

  constructor(
    private dataManagerService: DataManagerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alumnoService: AlumnoService,
    private registerService: RegisterService
    ) { }

  ngOnInit() {
    this.formGenerator()
  }

  formGenerator() {
    this.registerForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.maxLength(10), Validators.required]],
      edad: ['', [Validators.required]]
    })
    this.planForm = this.formBuilder.group({
      alumnoDNI: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      estado: ['', [Validators.required]],
      dia: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
    })
  }

  formLabelsSelector() {
    return this.inputFields[this.currentRoute].formContentLabels
  }

  formGroupSelector() {
    const conditionalArray: {[key:string]: any} = {
      "/plan-form": this.planForm,
      "/register-form": this.registerForm
    }
    return conditionalArray[this.currentRoute]
  }

  dropdownMenuOptionsSelector(key: string) {
    const conditionalArray: { [key: string]: {[key: string]: string[]} } = {
      "/plan-form": {
        "dias": ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
      },
      "/register-form": {
        "rol": ['Alumno', 'Profesor']
      }
    }
    return conditionalArray[this.currentRoute][key];
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
        "Sexo": userSex
      }
      console.log(alumnoData)
      this.register(registerData, alumnoData);
    }
  }

  refeshComponent() {
    
  }
}

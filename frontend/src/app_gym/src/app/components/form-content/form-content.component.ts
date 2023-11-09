import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RegisterService } from 'src/app/services/auth/register.service';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { DetalleService } from 'src/app/services/planificacion/detalle.service';
import { PlanificacionService } from 'src/app/services/planificacion/planificacion.service';
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
      submitButtonLabel: string;
      backButtonURL: string;
      formContentLabels: {
        label: string;
        type: string;
        formControlName: string;
      }[],
      formOptionsContent: {
        label: string,
        formControlName: string
        optionsList: string[]
      }[]
    };
  } = {
    "/register-form": {
      formLabel: "Contanos un poco sobre vos",
      submitButtonLabel: "Registrarme",
      backButtonURL: "/register",
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
      ],
      formOptionsContent: [
        {
          label: "Selecciona una opción",
          formControlName: "sexo",
          optionsList: ['Masculino', 'Femenino']
        }
      ]
    },
    "/plan-form": {
      formLabel: "Crear una planificación",
      submitButtonLabel: "Crear",
      backButtonURL: "/clases-plan",
      formContentLabels: [
        {
          label: "DNI del Alumno",
          type: "number",
          formControlName: "alumnoDNI"
        },
        {
          label: "Detalle de la planificación",
          type: "textarea",
          formControlName: "detalle"
        },
      ],
      formOptionsContent: [
        {
          label: "Seleccione un día",
          formControlName: "dia",
          optionsList: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
        },
      ]
    },
  }

  registerForm!: FormGroup;
  planForm!: FormGroup;

  get isTokenRol() { 
    return localStorage.getItem('token_rol');
  }

  get isTokenDNI() {
    return Number(localStorage.getItem('token_DNI'));
  }

  get currentRoute() {
    return this.router.url
  }

  constructor(
    private dataManagerService: DataManagerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alumnoService: AlumnoService,
    private registerService: RegisterService,
    private planificacionService: PlanificacionService,
    private detalleService: DetalleService
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
      edad: ['', [Validators.required]],
      sexo: ['', [Validators.required]]
    })
    this.planForm = this.formBuilder.group({
      alumnoDNI: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      dia: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
    })
  }

  formGroupSelector() {
    const conditionalArray: {[key:string]: any} = {
      "/plan-form": this.planForm,
      "/register-form": this.registerForm
    }
    return conditionalArray[this.currentRoute]
  }

  register(){
    if (this.registerForm.valid) {
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
      if (this.registerForm.get("sexo")?.value === "Masculino") {
        userSex = false
      }
      let alumnoData = {
        "DNI": Number(this.registerForm.get("dni")?.value),
        "Edad": Number(this.registerForm.get("edad")?.value),
        "Sexo": userSex
      }
      this.registerService.register(registerData).subscribe({
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
  }

  submit() { 
    const functions: { [key:string]: any } = {
      "/register-form": () => this.register(),
      "/plan-form": () => this.postPlanificacion()
    }
    functions[this.currentRoute]()
  }

  postPlanificacion() {
    if (this.planForm.valid) {
      return firstValueFrom(this.planificacionService.getPlanificacionAlumnoDNI(this.planForm.get('alumnoDNI')?.value, 1, 8)).then((data: any) => {
        if (data.length > 0) {
          this.putPlanificacion(data[0].planificacion_id, data)
        } else {
          const fechaActual = new Date();
          const dia = fechaActual.getDate();
          const mes = fechaActual.getMonth() + 1;
          const año = fechaActual.getFullYear();
          const diaFormateado = dia.toString().padStart(2, '0');
          const mesFormateado = mes.toString().padStart(2, '0');
          const fechaFormateada = `${diaFormateado}/${mesFormateado}/${año}`;
          const planData = {
            "profesor_DNI": this.isTokenDNI,
            "alumno_DNI":  this.planForm.get("alumnoDNI")?.value,
            "estado": true,
            "creation_date": fechaFormateada
            }
          this.planificacionService.postPlanificacion(planData).subscribe({
            next: (rta: any) => {
              const detalleData = {
                "planificacion_id": rta.planificacion_id,
                "dia": this.planForm.get("dia")?.value,
                "detalle": this.planForm.get("detalle")?.value
              }
              this.detalleService.postDetalle(detalleData).subscribe({
                next: (rta: any) => {
                  this.router.navigateByUrl("/clases-plan")
                },
                error: (error: any) => {
                  alert("Error al crear la planificacion")
                  console.log(error);
                }
              })
            },
            error: (error: any) => {
              console.log(error);
            },
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    } else {
      return null;
    }
  }

  putPlanificacion(planID: Number, data: any) {
    const detalleData = {
      "planificacion_id": planID,
      "dia": this.planForm.get("dia")?.value,
      "detalle": this.planForm.get("detalle")?.value
    }
    this.detalleService.putDetalle(detalleData, planID, this.planForm.get("dia")?.value).subscribe({
      next: (rta: any) => {
        this.router.navigateByUrl("/clases-plan")
      },
      error: (error: any) => {
        alert("Error al actualizar la planificacion")
        console.log(error);
      }
    })
  }
}

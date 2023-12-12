import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RegisterService } from 'src/app/services/auth/register.service';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { DetalleService } from 'src/app/services/planificacion/detalle.service';
import { PlanificacionService } from 'src/app/services/planificacion/planificacion.service';
import { ClasesService } from 'src/app/services/clases/clases.service';
import { AlumnoService } from 'src/app/services/user/alumno.service';
import { UsuarioService } from 'src/app/services/user/usuario.service';


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
      formLabel: this.urlParameterID? "Mofidicar Planificación":"Crear una planificación",
      submitButtonLabel: this.urlParameterID? "Modificar": "Crear",
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
    "/clases-form": {
      formLabel: this.urlParameterID? "Mofidicar la Clase":"Crear una Clase",
      submitButtonLabel: this.urlParameterID? "Modificar": "Crear",
      backButtonURL: "/clases-plan",
      formContentLabels: [
        {
          label: "Nombre de la Clase",
          type: "text",
          formControlName: "nombreClase",
        },
        {
          label: "Hora de la Clase",
          type: "time",
          formControlName: "horario",
        },
        {
          label: "Tipo de Clase",
          type: "text",
          formControlName: "tipoClase",
        },
      ],
      formOptionsContent: [
        {
          label: "Seleccione un dia",
          formControlName: "dia",
          optionsList: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
      }]
    },
    "/change-user-info": {
      formLabel: "Editar la información personal del usuario",
      submitButtonLabel: "Actualizar",
      backButtonURL: "/admin-page",
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
      ],
      formOptionsContent: [
        {
          label: "Selecciona un rol",
          formControlName: "rol",
          optionsList: ['admin', 'alumno', 'profesor']
        }
      ]
    },
  }

  registerForm!: FormGroup;
  planForm!: FormGroup;
  clasesForm!: FormGroup;
  changeUserInfoForm!: FormGroup;

  get isTokenRol() { 
    return localStorage.getItem('token_rol');
  }

  get isTokenDNI() {
    return Number(localStorage.getItem('token_DNI'));
  }

  get currentRoute() {
    const urlSections = this.router.url.split('/')
    return `/${urlSections[1]}`
  }

  get urlParameterDNI() {
    return Number(this.route.snapshot.paramMap.get('dni'))
  }

  get urlParameterID() {
    return Number(this.route.snapshot.paramMap.get('id'))
  }

  constructor(
    private dataManagerService: DataManagerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alumnoService: AlumnoService,
    private registerService: RegisterService,
    private planificacionService: PlanificacionService,
    private claseService: ClasesService,
    private detalleService: DetalleService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
    ) { }

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
    this.clasesForm = this.formBuilder.group({
      nombreClase: ['', [Validators.maxLength(50), Validators.required]],
      horario: ['', [Validators.required]],
      tipoClase: ['', [Validators.maxLength(50), Validators.required]],
      dia: ['', [Validators.required]],
    })
    this.changeUserInfoForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.maxLength(10), Validators.required]],
      rol: ['', [Validators.required]],
    })
    if (this.isTokenRol==="admin") {
      this.planForm.addControl("profesorDNI", this.formBuilder.control('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]))
      this.inputFields["/plan-form"].formContentLabels.splice(1, 0 ,{
        label: "DNI del Profesor",
        type: "number",
        formControlName: "profesorDNI"
      })
      this.clasesForm.addControl("profesorDNI", this.formBuilder.control('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]))
      this.inputFields["/clases-form"].formContentLabels.splice(1, 0 ,{
        label: "DNI del Profesor",
        type: "number",
        formControlName: "profesorDNI"
      })
    }
  }

  formGroupSelector() {
    const conditionalArray: {[key:string]: any} = {
      "/register-form": this.registerForm,
      "/plan-form": this.planForm,
      "/clases-form": this.clasesForm,
      "/change-user-info": this.changeUserInfoForm
    }
    return conditionalArray[this.currentRoute]
  }

  ngOnInit() {
    this.formGenerator()
    if (this.route.snapshot.paramMap.get('id')) {
      if (this.currentRoute === '/clases-form') {
        this.getClaseDetalle(this.urlParameterID)
      }
      else if (this.currentRoute === '/plan-form') {
        this.getPlanDetalle(this.urlParameterID)
      } 
    } else if (this.route.snapshot.paramMap.get('dni')) {
      this.getUserInfo(this.urlParameterDNI)
    }
  }

  getPlanDetalle(planID: number) {
    this.planificacionService.getPlanificacionById(planID).subscribe({
      next: (data: any) => {
        console.log(data)
        const dia = data.detalles_dia.find((detalle: any) => detalle.dia === this.route.snapshot.paramMap.get('dia'))
        this.planForm.patchValue({
          alumnoDNI: data.Alumno.Usuario.DNI,
          detalle: data.detalles_dia.find((detalle: any) => detalle.dia === this.route.snapshot.paramMap.get('dia')).detalle,
          dia: this.route.snapshot.paramMap.get('dia')
        });
        if (this.isTokenRol==="admin") {
          this.planForm.patchValue({
            profesorDNI: data.Profesor.Usuario.DNI
          })
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getClaseDetalle(claseID: number){
    this.claseService.getClaseById(claseID).subscribe({
      next: (data: any) => {
        console.log(data)
        this.clasesForm.patchValue({
          nombreClase: data.Nombre,
          horario: data.Horario,
          tipoClase: data.Tipo, 
          dia: data.Dia
        });
        if (this.isTokenRol==="admin") {
          this.clasesForm.patchValue({
            profesorDNI: data.Profesores[0].Usuario.DNI
          })
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getUserInfo(dni: number) {
    return firstValueFrom(this.usuarioService.getUserByDni(dni)).then((data: any) => {
      this.changeUserInfoForm.patchValue({
        dni: data.DNI,
        nombre: data.Nombre,
        apellido: data.Apellidos,
        telefono: data.Telefono,
        rol: data.Rol
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  delete(){
    this.claseService.deleteClase(this.urlParameterID).subscribe({
        next: (rta: any) => {
          this.router.navigateByUrl("/clases-plan")
        },
        error: (error: any) => {
          alert("Error al elimnar la clase")
          console.log(error);
        }
    }) 
  }

  submit() { 
    console.log("alo?")
    const functions: { [key:string]: any } = {
      "/register-form": () => this.register(),
      "/plan-form": () => this.submitPlanificacion(),
      "/clases-form": () => this.submitClases(),
      "/change-user-info": () => this.updateUserInfo(),
    }
    functions[this.currentRoute]()
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
        "Rol": "",
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

  submitPlanificacion() {
    if (this.planForm.valid) {
      return firstValueFrom(this.planificacionService.getPlanificacionAlumnoDNI(this.planForm.get('alumnoDNI')?.value, 1, 8)).then((data: any) => {
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const año = fechaActual.getFullYear();
        const diaFormateado = dia.toString().padStart(2, '0');
        const mesFormateado = mes.toString().padStart(2, '0');
        const fechaFormateada = `${diaFormateado}/${mesFormateado}/${año}`;
        let dniProfe = this.isTokenDNI
        if (this.isTokenRol==="admin") {
          dniProfe = this.planForm.get("profesorDNI")?.value
        }
        const planData = {
          "profesor_DNI": dniProfe,
          "alumno_DNI":  this.planForm.get("alumnoDNI")?.value,
          "estado": true,
          "creation_date": fechaFormateada
        }
        let detalleData: { [key:string]: any } = {
          "dia": this.planForm.get("dia")?.value,
          "detalle": this.planForm.get("detalle")?.value
        }
        let planService = this.planificacionService.postPlanificacion(planData)
        let detalleService = this.detalleService.postDetalle(detalleData)
        if (data.planificaciones.length > 0) {
          planService = this.planificacionService.putPlanificacion(planData, data.planificaciones[0].planificacion_id)
          const detalleDiaArray = data.planificaciones[0].detalles_dia.map((item:any) => item.dia)
          if (detalleDiaArray.includes(this.planForm.get("dia")?.value)) {
            detalleService = this.detalleService.putDetalle(detalleData, data.planificaciones[0].planificacion_id, this.planForm.get("dia")?.value)
          }
        }
        planService.subscribe({
          next: (rta: any) => {
            detalleData["planificacion_id"] = rta.planificacion_id;
            detalleService.subscribe({
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
      }).catch((err) => {
        console.log(err);
      })
    } else {
      return null;
    }
  }

  submitClases() {
    console.log("Hola?")
    if (this.clasesForm.valid) {
      console.log("chau!")
      let dniProfe = this.isTokenDNI
        if (this.isTokenRol==="admin") {
          dniProfe = this.clasesForm.get("profesorDNI")?.value
        }
      let clasesData = {
        "Nombre": this.clasesForm.get("nombreClase")?.value,
        "Tipo": this.clasesForm.get("tipoClase")?.value,
        "Dia": this.clasesForm.get("dia")?.value,
        "Horario": this.clasesForm.get("horario")?.value,
      }
      let clasesProfes: { [key:string]: any } = {
        "profeDNI": dniProfe,
      }

      let claseSet = this.claseService.postClase(clasesData)

      if (this.urlParameterID) {
        claseSet = this.claseService.putClase(clasesData, this.urlParameterID)
        this.claseService.getClaseById(this.urlParameterID).subscribe({
            next: (data: any) => {
              data.Profesores.forEach((profesor: any) => {
                this.claseService.deleteClaseProfesor(this.urlParameterID, profesor.Usuario.DNI).subscribe({
                  next: (rta: any) => { },
                })
              });
            },
            error: (error: any) => {
              alert("Error con los datos del Profesor")
              console.log(error);
            }
        }) 
      }
      claseSet.subscribe({
        next: (rta: any) => {
          clasesProfes ["claseID"] = rta.Clase_id
          this.claseService.postClaseProfesor(clasesProfes).subscribe({
            next: (rta: any) => {
              this.router.navigateByUrl("/clases-plan")
            },
            error: (error: any) => {
              alert("Clase Creada. Error al crear la asociacion con el Profesor")
              console.log(error);
            }
          }) 
        },
        error: (error: any) => {
          alert("Error al crear la clase")
          console.log(error);
        }
      })
    }
  }

  updateUserInfo() {
    const userData = {
      "Nombre": this.changeUserInfoForm.get("nombre")?.value,
      "Apellidos": this.changeUserInfoForm.get("apellido")?.value,
      "Telefono": Number(this.changeUserInfoForm.get("telefono")?.value),
      "Rol": this.changeUserInfoForm.get("rol")?.value
    }
    if (this.changeUserInfoForm.valid) {
      return firstValueFrom(this.usuarioService.updateUserInfo(Number(this.route.snapshot.paramMap.get('dni')), userData)).then((data: any) => {
        this.router.navigateByUrl("/admin-page")
      }).catch((err) => {
        alert("Error al actualizar los datos")
        console.log(err);
      })
    } else {
      return false;
    }
  }
}

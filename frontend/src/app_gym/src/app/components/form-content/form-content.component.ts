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
import { ProfesorService } from 'src/app/services/user/profesor.service';


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
    "/register-form/prof": {
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
          label: "Especialidad",
          type: "text",
          formControlName: "especialidad"
        },
      ],
      formOptionsContent: [
        {
          label: "Seleccione el perfil de permisos",
          formControlName: "rol",
          optionsList: ['admin', 'profesor']
        }
      ]
    },
    "/plan-form": {
      formLabel: this.urlParameterID? "Modificar Planificación":"Crear una planificación",
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
      formLabel: this.urlParameterID? "Modificar la Clase":"Crear una Clase",
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
        },
      ]
    },
    "/change-user-info": {
      formLabel: "Editar la información personal del Alumno",
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
          label: "Seleccione el perfil de permisos",
          formControlName: "rol",
          optionsList: ['alumno', 'sin permisos']
        }
      ],
    },
    "/change-user-info/prof": {
      formLabel: "Editar perfil",
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
        {
          label: "Especialidad",
          type: "text",
          formControlName: "especialidad"
        },
      ],
      formOptionsContent: [
        {
          label: "Seleccione el perfil de permisos",
          formControlName: "rol",
          optionsList: ['admin', 'profesor', 'sin permisos']
        }
      ]
    },
  }

  registerForm!: FormGroup;
  registerFormProf!: FormGroup;
  planForm!: FormGroup;
  clasesForm!: FormGroup;
  changeUserInfoForm!: FormGroup;
  changeProfInfoForm!: FormGroup;
  commitAttempted:boolean = false;

  get isTokenRol() { 
    return localStorage.getItem('token_rol');
  }

  get isTokenDNI() {
    return Number(localStorage.getItem('token_DNI'));
  }

  get currentRoute() {
    const urlSections = this.router.url.split('/')
    if (this.router.url === "/register-form/prof") {
      return this.router.url
    } else if (`/${urlSections[2]}` === "/prof") {
      return "/change-user-info/prof"
    } else {
      return `/${urlSections[1]}`
    }
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
    private profesorService: ProfesorService,
    private registerService: RegisterService,
    private planificacionService: PlanificacionService,
    private claseService: ClasesService,
    private detalleService: DetalleService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
    ) { }

/*  HTML: (keypress)="validarEntrada($event, field.type)"    

    validarEntrada(event: KeyboardEvent, type: string) {
      const input = event.key;
      const regex = /^[A-Za-z]+$/; // Expresión regular para letras
      
      if (type !== "text") {
        event.NONE
      } else if (!regex.test(input)) {
        event.preventDefault(); // Evitar que se escriban caracteres no válidos
      }
    } */

  formGenerator() {
    this.registerForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.maxLength(10), Validators.required]],
      edad: ['', [Validators.required]],
      sexo: ['', [Validators.required]]
    })
    this.registerFormProf = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.maxLength(10), Validators.required]],
      especialidad: ['', [Validators.required]],
      rol: ['', [Validators.required]],
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
    this.changeProfInfoForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.maxLength(10), Validators.required]],
      especialidad: ['', [Validators.required]],
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
      "/register-form/prof": this.registerFormProf,
      "/plan-form": this.planForm,
      "/clases-form": this.clasesForm,
      "/change-user-info": this.changeUserInfoForm,
      "/change-user-info/prof": this.changeProfInfoForm
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
    } else if (this.urlParameterDNI) {
      this.getUserInfo(this.urlParameterDNI)
    }
  }

  getPlanDetalle(planID: number) {
    this.planificacionService.getPlanificacionById(planID).subscribe({
      next: (data: any) => {
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
      if (this.currentRoute == "/change-user-info/prof") {
        this.profesorService.getProfeByDni(dni).subscribe({
          next: (prof: any) => {
            this.changeProfInfoForm.patchValue({
              dni: data.DNI,
              nombre: data.Nombre,
              apellido: data.Apellidos,
              telefono: data.Telefono,
              especialidad: prof.Especialidad,
              rol: data.Rol
            })
          }
        })
      } else {
        this.changeUserInfoForm.patchValue({
          dni: data.DNI,
          nombre: data.Nombre,
          apellido: data.Apellidos,
          telefono: data.Telefono,
          rol: data.Rol
        });
      }
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
          alert("Error al eliminar la clase")
          console.log(error);
        }
    }) 
  }

  submit() { 
    const functions: { [key:string]: any } = {
      "/register-form": () => this.register(),
      "/register-form/prof": () => this.register(),
      "/plan-form": () => this.submitPlanificacion(),
      "/clases-form": () => this.submitClases(),
      "/change-user-info": () => this.updateUserInfo(),
      "/change-user-info/prof": () => this.updateProfInfo()
    }
    functions[this.currentRoute]()
  }

  register(){
    const formGroup = this.formGroupSelector()
    if (formGroup.valid) {
      let credentials = this.dataManagerService.getUserCredentials()
      let rol = formGroup.get("rol")?.value
      if (rol === undefined) {
        rol = ""
      }
      let registerData = {
        "DNI": Number(formGroup.get("dni")?.value),
        "Nombre": formGroup.get("nombre")?.value,
        "Apellidos": formGroup.get("apellido")?.value,
        "Telefono": Number(formGroup.get("telefono")?.value),
        "Email": credentials.email,
        "Password": credentials.password,
        "Rol": rol,
      }
      let userData = {}
      if(this.currentRoute === "/register-form") {
        let userSex = true
        if (formGroup.get("sexo")?.value === "Masculino") {
          userSex = false
        }
        userData = {
          "DNI": Number(formGroup.get("dni")?.value),
          "Edad": Number(formGroup.get("edad")?.value),
          "Sexo": userSex
        }
      } else {
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const año = fechaActual.getFullYear();
        const diaFormateado = dia.toString().padStart(2, '0');
        const mesFormateado = mes.toString().padStart(2, '0');
        const fechaFormateada = `${diaFormateado}/${mesFormateado}/${año}`;
        userData = {
          "DNI": Number(this.registerFormProf.get("dni")?.value),
          "Especialidad": this.registerFormProf.get("especialidad")?.value,
          "Inicio_actividad": fechaFormateada
        }
      }
      this.registerService.register(registerData).subscribe({
        next: (rta: any) => {
          let service = this.alumnoService.postAlumno(userData)
          if (this.currentRoute === "/register-form/prof") {
            service = this.profesorService.postProfe(userData)
          }
          service.subscribe({
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
    }	else {
			this.commitAttempted = true
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
    }	else {
			this.commitAttempted = true
      return null;
    }
  }

  submitClases() {
    if (this.clasesForm.valid) {
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
    }	else {
			this.commitAttempted = true
    }
  }
  
  updateUserInfo() {
    let rol = this.changeUserInfoForm.get("rol")?.value
    if (rol === 'sin permisos') {
      rol = ''
    }
    const userData = {
      "Nombre": this.changeUserInfoForm.get("nombre")?.value,
      "Apellidos": this.changeUserInfoForm.get("apellido")?.value,
      "Telefono": Number(this.changeUserInfoForm.get("telefono")?.value),
      "Rol": rol
    }
    if (this.changeUserInfoForm.valid) {
      return firstValueFrom(this.usuarioService.updateUserInfo(this.urlParameterDNI, userData)).then((data: any) => {
        this.router.navigateByUrl("/admin-page")
      }).catch((err) => {
        alert("Error al actualizar los datos")
        console.log(err);
      })
    }	else {
      this.commitAttempted = true
      return null;
    }
  }

  updateProfInfo() {
    const UsarData = {
      "Nombre": this.changeProfInfoForm.get("nombre")?.value,
      "Apellidos": this.changeProfInfoForm.get("apellido")?.value,
      "Telefono": Number(this.changeProfInfoForm.get("telefono")?.value),
      "Rol": this.changeProfInfoForm.get("rol")?.value
    }
    const ProfeData = {
      "Especialidad": this.changeProfInfoForm.get("especialidad")?.value
    }
    if (this.changeProfInfoForm.valid) {
      return firstValueFrom(this.usuarioService.updateUserInfo(this.urlParameterDNI, UsarData)).then((data: any) => {
        this.profesorService.putProfesores(this.urlParameterDNI, ProfeData).subscribe({
          next: (rta: any) => {
            this.router.navigateByUrl("/admin-page")
          },
          error: (error: any) => {
            alert("Error al actualizar profesor")
            console.log(error);
          }
        })
      }).catch((err) => {
        alert("Error al actualizar usuario")
        console.log(err);
      })
    }	else {
			this.commitAttempted = true
      return null;
    }
  }
}

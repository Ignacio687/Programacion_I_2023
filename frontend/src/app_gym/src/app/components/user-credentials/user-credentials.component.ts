import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import jwt_decode from "jwt-decode";
import { DataManagerService } from 'src/app/services/data-manager.service'

@Component({
  selector: 'app-user-credentials',
  templateUrl: './user-credentials.component.html',
  styleUrls: ['./user-credentials.component.css']
})
export class UserCredentialsComponent {
  samePasswordCondition: boolean = true;
  
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  recoverPassForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private dataManagerService: DataManagerService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password1: ['', [Validators.maxLength(32), Validators.required]]
    })
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password1: ['',[ Validators.maxLength(32), Validators.required]],
      password2: ['',[ Validators.maxLength(32), Validators.required]]
    })
    this.recoverPassForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }   

  login(dataLogin: any = {}){
    console.log('Comprobando credenciales');
    this.loginService.login(dataLogin).subscribe({
      next: (rta: any) => {
        localStorage.setItem('token', rta.access_token);
        let tokenPayload: any = jwt_decode(rta.access_token)
        localStorage.setItem('token_rol', tokenPayload.rol);
        localStorage.setItem('token_DNI', tokenPayload.DNI);
        this.router.navigateByUrl('/home');
      },
      error: (error: any) => {
        console.log(error);
        alert('Credenciales incorrectas')
        localStorage.removeItem('token');
      },
      complete: () => {
        console.log('Completado');
      }

    })
  }

  getFormValue(index: number): any {
    if (index === 0) {
      return this.getFormGroup().get('email');
    } else {
      return this.getFormGroup().get(`password${index}`);
    }
  }

  submit() {
    if (this.getFormGroup().valid) {
      if (this.getCurrentRoute() === '/login') {
        this.login({email: this.getFormValue(0)?.value, password: this.getFormValue(1)?.value})
      } else if (this.getCurrentRoute() === '/register') {
        if (this.getFormValue(1).value===this.getFormValue(2).value) {
          this.dataManagerService.setUserCredentials(this.getFormValue(0).value, this.getFormValue(1).value)
          this.router.navigateByUrl("/register-form")
        } else {
          this.samePasswordCondition = false
        }
      } else {
        this.sendRecoverEmail(this.getFormValue(0).value)
      }
    }
  }

  sendRecoverEmail(email: string) {
    console.log(email)
    this.router.navigateByUrl('/login')
  }

  getCurrentRoute() {
    return this.router.url
  }

  getFormGroup() {
    if (this.getCurrentRoute() === '/login') {
      return this.loginForm
    } else if (this.getCurrentRoute() === '/register') {
      return this.registerForm
    } else {
      return this.recoverPassForm
    }
  }

  getIterable() {
    if (this.getCurrentRoute() === '/register') {
      return ['Email', 'Password', 'Password']
    } else if (this.getCurrentRoute() === '/login') {
      return ['Email', 'Password']
    } else {
      return ['Email']
    }
  }
}

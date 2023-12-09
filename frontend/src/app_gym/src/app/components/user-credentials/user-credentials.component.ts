import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import jwt_decode from "jwt-decode";
import { DataManagerService } from 'src/app/services/data-manager.service'
import { RegisterService } from 'src/app/services/auth/register.service';

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
	recoverPassDataForm!: FormGroup;

	constructor(
		private loginService: LoginService,
		private router: Router,
		private formBuilder: FormBuilder,
		private cdRef: ChangeDetectorRef,
		private dataManagerService: DataManagerService,
		private registerService: RegisterService,
	) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password1: ['', [Validators.maxLength(32), Validators.required]]
		})
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password1: ['', [Validators.maxLength(32), Validators.required]],
			password2: ['', [Validators.maxLength(32), Validators.required]]
		})
		this.recoverPassForm = this.formBuilder.group({
			email: ['', [Validators.email, Validators.required]]
		})
		this.recoverPassDataForm = this.formBuilder.group({
			password1: ['', [Validators.maxLength(32), Validators.required]],
			password2: ['', [Validators.maxLength(32), Validators.required]]
		})
	}

	login(dataLogin: any = {}) {
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
				this.login({ email: this.getFormValue(0)?.value, password: this.getFormValue(1)?.value })
			} else if (this.getCurrentRoute() === '/register') {
				if (this.getFormValue(1).value === this.getFormValue(2).value) {
					this.dataManagerService.setUserCredentials(this.getFormValue(0).value, this.getFormValue(1).value)
					this.router.navigateByUrl("/register-form")
				} else {
					this.samePasswordCondition = false
				}
			} else if (this.getCurrentRoute() === '/recover-pass') {
				this.registerService.recoverPass({email: this.getFormValue(0).value}).subscribe({
					next: (rta: any) => {
						alert('Se ha enviado un correo de recuperación')
						this.router.navigateByUrl('/login') //???
					},
					error: (error: any) => {
						console.log(error);
					},
				})
			} else if (this.getCurrentRoute() === '/recover-pass-form'){
				if (this.getFormValue(1).value === this.getFormValue(2).value) {
					this.registerService.recoverPass({password: this.getFormValue(1).value}).subscribe({
						next: (rta: any) => {
							alert('Se ha cambiado la contraseña')
							this.router.navigateByUrl('/login')
						},
						error: (error: any) => {
							console.log(error);
						},
					})
				} else {
					this.samePasswordCondition = false
				}
			}
		}
	}

	getCurrentRoute() {
		const urlSections = this.router.url.split('/')
		return `/${urlSections[1]}`
	}

	getFormGroup() {
		if (this.getCurrentRoute() === '/login') {
			return this.loginForm
		} else if (this.getCurrentRoute() === '/register') {
			return this.registerForm
		} else if (this.getCurrentRoute() === '/recover-pass'){
			return this.recoverPassForm
		}
		else {
			return this.recoverPassDataForm
		}
	}


	getIterable() {
		if (this.getCurrentRoute() === '/register') {
		  return [
			{ type: 'Email', placeholder: 'Ingresa tu dirección de correo' },
			{ type: 'Password', placeholder: 'Ingresa tu contraseña (no más de 32 caracteres)' },
			{ type: 'Password', placeholder: 'Repetí tu contraseña' }
		  ];
		} else if (this.getCurrentRoute() === '/login') {
		  return [
			{ type: 'Email', placeholder: 'Ingresa tu dirección de correo' },
			{ type: 'Password', placeholder: 'Ingresa tu contraseña (no más de 32 caracteres)' }
		  ];
		} else if (this.getCurrentRoute() === '/recover-pass') {
		  return [
			{ type: 'Email', placeholder: 'Ingresa tu dirección de correo' }
		  ];
		} else {
		  return [
			{ type: 'Password', placeholder: 'Ingresa tu contraseña (no más de 32 caracteres)' },
			{ type: 'Password', placeholder: 'Repetí tu contraseña' }
		  ];
		}
	}

	trackByIndex(index: number, item: any): number {
		return index;
	}
}

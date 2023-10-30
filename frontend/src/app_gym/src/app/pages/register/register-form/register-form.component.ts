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
  constructor() { }
  
}

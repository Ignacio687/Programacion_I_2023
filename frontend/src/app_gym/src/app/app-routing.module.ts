import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumProfAdmComponent } from './pages/admin/alum-prof-adm/alum-prof-adm.component';
import { ClasesComponent } from './pages/alumno/clases/clases.component';
import { ChangeUserInfoComponent } from './pages/home/change-user-info/change-user-info.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { HorariosDireccionComponent } from './pages/home/horarios-direccion/horarios-direccion.component';
import { RecoverPassComponent } from './pages/login/recover-pass/recover-pass.component';
import { UserLoginComponent } from './pages/login/user-login/user-login.component';
import { ClasesFormComponent } from './pages/profesor/clases-form/clases-form.component';
import { ClasesPlanComponent } from './pages/profesor/clases-plan/clases-plan.component';
import { PlanFormComponent } from './pages/profesor/plan-form/plan-form.component';
import { RegisterFormComponent } from './pages/register/register-form/register-form.component';
import { UserRegisterComponent } from './pages/register/user-register/user-register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authSessionGuard } from './guards/auth-session.guard'
import { profesorSessionGuard } from './guards/profesor-session.guard';
import { adminSessionGuard } from './guards/admin-session.guard';


const routes: Routes = [
  { path: 'admin-page', component: AlumProfAdmComponent, canActivate:[adminSessionGuard]},
  { path: 'alum-clases', component: ClasesComponent},
  { path: 'change-user-info', component: ChangeUserInfoComponent, canActivate:[authSessionGuard]},
  { path: 'change-user-info/:id/editar', component: ChangeUserInfoComponent, canActivate:[adminSessionGuard]},
  { path: 'home', component: HomePageComponent},
  { path: 'horarios', component: HorariosDireccionComponent},
  { path: 'recover-pass', component: RecoverPassComponent},
  { path: 'login', component: UserLoginComponent},
  { path: 'clases-form', component: ClasesFormComponent, canActivate:[adminSessionGuard]},
  { path: 'clases-form/:id/editar', component: ClasesFormComponent, canActivate:[adminSessionGuard]},
  { path: 'clases-plan', component: ClasesPlanComponent, canActivate:[profesorSessionGuard]},
  { path: 'plan-form', component: PlanFormComponent, canActivate:[profesorSessionGuard]},
  { path: 'plan-form/:id/editar', component: PlanFormComponent, canActivate:[profesorSessionGuard]},
  { path: 'register-form', component: RegisterFormComponent, },
  { path: 'register', component: UserRegisterComponent},
  { path: 'error404', component: PageNotFoundComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/error404', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

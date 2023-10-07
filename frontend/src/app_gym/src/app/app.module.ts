import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavVarComponent } from './components/nav-var/nav-var.component';
import { UserRegisterComponent } from './pages/register/user-register/user-register.component';
import { RegisterFormComponent } from './pages/register/register-form/register-form.component';
import { UserLoginComponent } from './pages/login/user-login/user-login.component';
import { RecoverPassComponent } from './pages/login/recover-pass/recover-pass.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { HorariosDireccionComponent } from './pages/home/horarios-direccion/horarios-direccion.component';
import { ChangeUserInfoComponent } from './pages/home/change-user-info/change-user-info.component';
import { ClasesComponent } from './pages/alumno/clases/clases.component';
import { ClasesPlanComponent } from './pages/profesor/clases-plan/clases-plan.component';
import { ClasesFormComponent } from './pages/profesor/clases-form/clases-form.component';
import { PlanFormComponent } from './pages/profesor/plan-form/plan-form.component';
import { AlumProfAdmComponent } from './pages/admin/alum-prof-adm/alum-prof-adm.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TabPagesComponent } from './components/tab-pages/tab-pages.component';
import { TabContentComponent } from './components/tab-content/tab-content.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    NavVarComponent,
    UserRegisterComponent,
    RegisterFormComponent,
    UserLoginComponent,
    RecoverPassComponent,
    HomePageComponent,
    HorariosDireccionComponent,
    ChangeUserInfoComponent,
    ClasesComponent,
    ClasesPlanComponent,
    ClasesFormComponent,
    PlanFormComponent,
    AlumProfAdmComponent,
    PageNotFoundComponent,
    TabPagesComponent,
    TabContentComponent,
    SearchboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
const routes: Routes = [
  { path: 'register', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: "login", pathMatch: 'full' }
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AuthComponent, LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }

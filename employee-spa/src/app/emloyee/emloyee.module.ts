import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmloyeeComponent } from './emloyee.component';
import { EmpService } from './emp.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { EmpNewComponent } from './emp-new/emp-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JWTInterceptor } from '../jwt-interceptor';
const routes: Routes = [
  { path: 'emp', component: EmloyeeComponent },
  { path: 'emp-add', component: EmpNewComponent },
  { path: 'emp-edit/:id', component: EmpNewComponent },
  { path: '', redirectTo: "emp", pathMatch: 'full' }
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    IonicModule.forRoot()

    
  ],
  declarations: [
    EmloyeeComponent,
    EmpNewComponent
  ],
  providers: [
    EmpService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }

  ]
})
export class EmloyeeModule { }

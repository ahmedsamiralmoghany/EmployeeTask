import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmloyeeComponent } from './emloyee.component';
import { EmpService } from './emp.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { EmpNewComponent } from './emp-new/emp-new.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule
  ],
  declarations: [
    EmloyeeComponent,
    EmpNewComponent
  ],
  providers: [
    EmpService
  ]
})
export class EmloyeeModule { }

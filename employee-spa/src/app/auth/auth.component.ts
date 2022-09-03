import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  form: FormGroup;
  loading = false;
  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', [Validators.required])
    }, this.checkPasswords)
  }
  getform(name: string): AbstractControl {
    return this.form.controls[name];
  }
  register() {
    if (!this.form.valid)
      return
    this.loading = true;

    this.authService.register(this.form.value.userName, this.form.value.password).subscribe({
      next: () => {
        this.Login()
      },
      error: (e) => {
        alert(e.error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  Login() {
    this.router.navigate(['/auth/login'])

  }
  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmControll = group.get('confirmPassword');
    let confirmPass: AbstractControl = confirmControll?.value
    return pass === confirmPass ? null : { notSame: true }
  }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })
  }
  ngOnInit() {

  }
  loading = false;
  getform(name: string): AbstractControl {
    return this.form.controls[name];
  }
  login() {
    if (!this.form.valid)
      return;
      this.loading = true;

    this.authService.login(this.form.value.userName, this.form.value.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['emp'])
      },
      error: (err) => {
        alert(err.error);
        this.loading = false;

      },
      complete: () => {
        this.loading = false;
      },
    }
    )
  }
  register() {
    this.router.navigate(['/auth/register'])
  }
}

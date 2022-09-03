import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      'userName': new FormControl(),
      'password': new FormControl(),
      'confirmPassword': new FormControl()
    })
  }
  ngOnInit() {

  }
  register() {
    console.log(this.form.value)

    this.authService.register(this.form.value.userName, this.form.value.password).subscribe({
      next: () => {
        this.Login()
      },
      error(e) {
        alert(e.error);
      }
    }
    )
  }
  Login() {
    this.router.navigate(['auth/login'])

  }

}

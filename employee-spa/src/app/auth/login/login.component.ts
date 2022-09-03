import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      'userName': new FormControl(),
      'password': new FormControl()
    })
  }
  ngOnInit() {

  }
  login() {
    console.log(this.form.value)

    this.authService.login(this.form.value.userName, this.form.value.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['emp'])
      },
      error(err) {
        alert(err);
        console.log(err)

      }
    }
    )
  }
  register() {
    this.router.navigate(['auth/register'])
  }
}

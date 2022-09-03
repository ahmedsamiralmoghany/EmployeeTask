import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private authService: AuthService) {
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
      next(res) {
        console.log(res.token)
        localStorage.setItem('token', res.token);

      },
      error(err) {
        alert(err);
        console.log(err)

      }
    }


    )
  }
}

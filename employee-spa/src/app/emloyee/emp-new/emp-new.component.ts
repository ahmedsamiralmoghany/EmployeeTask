import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-emp-new',
  templateUrl: './emp-new.component.html',
  styleUrls: ['./emp-new.component.css']
})
export class EmpNewComponent {
  form: FormGroup;

  loading = false;
  constructor(private empService: EmpService, private rout: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'id': new FormControl(''),
      'phoneNumber': new FormControl(''),
      'address': new FormControl(''),
      'email': new FormControl('', Validators.email),
      'birthDate': new FormControl(''),

    })
    rout.params.subscribe({
      next: (parm: any) => {
        if (parm.id) {
          this.empService.getById(parm.id).subscribe({
            next: (v) => {
              this.form.patchValue(v);
            }
          })
        }
      }
    })
  }

  getform(name: string): AbstractControl {
    return this.form.controls[name];
  }

  save() {
    if (this.form.valid == false)
      return;
    this.loading = true;
    if (this.form.value.id) {
      this.empService.update(this.form.value).subscribe({
        next: () => this.back(),
        complete: () => {
          this.loading = false
        }

      }
      )
    }
    else {
      this.empService.add(this.form.value).subscribe({
        next: () => this.back(),
        complete: () => {
          this.loading = false
        }
      })
    }
  }

  back() {
    this.router.navigate(['']);
  }
}

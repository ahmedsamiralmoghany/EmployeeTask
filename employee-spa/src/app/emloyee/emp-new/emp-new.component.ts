import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-emp-new',
  templateUrl: './emp-new.component.html',
  styleUrls: ['./emp-new.component.css']
})
export class EmpNewComponent implements OnInit {
  form: FormGroup;
  constructor(private empService: EmpService, private rout: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      'name': new FormControl(),
      'id': new FormControl()
    })
    rout.params.subscribe({
      next: (parm: any) => {
        if (parm.id) {
          this.empService.getById(parm.id).subscribe({
            next: (v) => {
              this.form.setValue(v);
            }
          })
        }
      }
    })

  }

  ngOnInit() {
  }
  save() {
    console.log(this.form.value)
    if (this.form.value.id) {
      this.empService.update(this.form.value).subscribe({
        next: () => this.back()
      })
    }
    else {
      this.empService.add(this.form.value).subscribe({
        next: () => this.back()
      })
    }
  }

  back() {
    this.router.navigate(['']);
  }
}

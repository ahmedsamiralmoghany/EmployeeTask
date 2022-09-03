import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpService } from './emp.service';

@Component({
  selector: 'app-emloyee',
  templateUrl: './emloyee.component.html',
  styleUrls: ['./emloyee.component.css']
})
export class EmloyeeComponent implements OnInit {

  constructor(private empService: EmpService, private router: Router) { }
  employees!: Array<any>
  ngOnInit() {
    this.empService.getAllEmployee().subscribe({
      next: (v) => {
        this.employees = v
      }
    })
  }
  edit(id: number) {
    this.router.navigate(['emp-edit', id]);
  }
  delte(id: number, index: number) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.empService.delete(id).subscribe({
        next: () => {
          this.employees.splice(index, 1);
        }
      })
    }
  }

}

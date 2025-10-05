import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api';
import { Department } from '../../../models/department.model';
import { NgFor, NgIf, } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ CORRECT


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboardComponent implements OnInit {
  depts: Department[] = [];
  deptName = '';
  doctor: any = { username:'', email:'', phone:'', password:'', specialization:'', departmentId:'' };
  msg = ''; err = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void { this.loadDepts(); }

  loadDepts() {
    this.api.listDepartments().subscribe({ next: d => this.depts = d });
  }
  addDept() {
    this.msg=''; this.err='';
    this.api.addDepartment(this.deptName).subscribe({
      next: _ => { this.msg = 'Department added'; this.deptName=''; this.loadDepts(); },
      error: e => this.err = e?.error?.message || 'Failed to add department'
    });
  }
  createDoctor() {
    this.msg=''; this.err='';
    this.api.createDoctor(this.doctor).subscribe({
      next: _ => {
        this.msg = 'Doctor created';
        this.doctor = { username:'', email:'', phone:'', password:'', specialization:'', departmentId:'' };
      },
      error: e => this.err = e?.error?.message || 'Failed to create doctor'
    });
  }
}

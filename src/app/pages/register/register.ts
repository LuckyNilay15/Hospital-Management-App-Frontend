import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { AuthService } from '../../services/auth';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterLink],
  template: `
  <h3 class="form-title">Register (Patient)</h3>

<form (ngSubmit)="submit()" class="custom-form" #f="ngForm">

  <div class="form-row">
    <div class="form-col">
      <label class="form-label-custom">Username</label>
      <input class="form-input" [(ngModel)]="form.username" name="username" required />
    </div>
    <div class="form-col">
      <label class="form-label-custom">Email</label>
      <input class="form-input" type="email" [(ngModel)]="form.email" name="email" required />
    </div>
  </div>

  <div class="form-row">
    <div class="form-col">
      <label class="form-label-custom">Phone</label>
      <input class="form-input" [(ngModel)]="form.phone" name="phone" />
    </div>
    <div class="form-col">
      <label class="form-label-custom">Password</label>
      <input class="form-input" type="password" [(ngModel)]="form.password" name="password" required minlength="6" />
    </div>
  </div>

  <div class="form-row">
    <div class="form-col small">
      <label class="form-label-custom">Age</label>
      <input class="form-input" type="number" [(ngModel)]="form.age" name="age" />
    </div>
    <div class="form-col small">
      <label class="form-label-custom">Gender</label>
      <select class="form-input" [(ngModel)]="form.gender" name="gender">
        <option value="">--</option>
        <option>Male</option><option>Female</option><option>Other</option>
      </select>
    </div>
    <div class="form-col small">
      <label class="form-label-custom">Blood Group</label>
      <input class="form-input" [(ngModel)]="form.blood_group" name="blood_group" />
    </div>
  </div>

  <button class="btn-primary" [disabled]="!f.valid">Register</button>
  <a routerLink="/login" class="btn-link-custom">Back to Login</a>

  <div class="form-error" *ngIf="error">{{error}}</div>
</form>
  `
})
export class RegisterComponent {
  form: any = { username:'', email:'', phone:'', password:'', age:null, gender:'', blood_group:'' };
  error = '';
  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.registerPatient(this.form).subscribe({
      next: _ => this.router.navigate(['/patient']),
      error: err => this.error = err?.error?.message || 'Registration failed'
    });
  }
}

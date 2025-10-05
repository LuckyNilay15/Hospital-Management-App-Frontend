import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { TokenStorageService } from '../services/token-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
  <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
   <a class="navbar-brand" href="#">
      Healthcare Portal
   </a>
    
    <ul class="navbar-nav me-auto" *ngIf="store.isLoggedIn">
      <li class="nav-item" *ngIf="store.role==='PATIENT'"><a class="nav-link" routerLink="/patient">Patient</a></li>
      <li class="nav-item" *ngIf="store.role==='DOCTOR'"><a class="nav-link" routerLink="/doctor">Doctor</a></li>
      <li class="nav-item" *ngIf="store.role==='ADMIN'"><a class="nav-link" routerLink="/admin">Admin</a></li>
    </ul>
    <span class="navbar-text text-light me-3" *ngIf="store.isLoggedIn">{{store.username}}</span>
    <button *ngIf="store.isLoggedIn" class="btn btn-outline-light btn-sm" (click)="logout()">Logout</button>
  </nav>
  <p class="text-center text-4xl mt-6 font-medium text-gray-800 bg-green-200 py-4 px-6 rounded shadow">
      Welcome to the Healthcare Portal — your one-stop platform for managing appointments, doctors, and more.
  </p>
  `
})
export class NavbarComponent {
  constructor(public store: TokenStorageService, private router: Router) {}
  logout() { this.store.clear(); this.router.navigate(['/login']); }
}

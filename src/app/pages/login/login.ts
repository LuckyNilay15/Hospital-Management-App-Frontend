// // import { Component } from '@angular/core';
// // import { FormsModule } from '@angular/forms';
// // import { NgIf } from '@angular/common';
// // import { AuthService } from '../../services/auth';
// // import { TokenStorageService } from '../../services/token-storage';
// // import { RouterLink, Router } from '@angular/router';

// // @Component({
// //   selector: 'app-login',
// //   standalone: true,
// //   imports: [FormsModule, NgIf, RouterLink],
// //   template: `
// //   <h3>Login</h3>
// //   <form (ngSubmit)="submit()" class="mt-3" #f="ngForm">
// //     <div class="mb-3">
// //       <label class="form-label">Username or Email</label>
// //       <input class="form-control" [(ngModel)]="usernameOrEmail" name="usernameOrEmail" required />
// //     </div>
// //     <div class="mb-3">
// //       <label class="form-label">Password</label>
// //       <input class="form-control" [(ngModel)]="password" name="password" type="password" required />
// //     </div>
// //     <button class="btn btn-primary" [disabled]="loading || !f.valid">Login</button>
// //     <a routerLink="/register/patient" class="btn btn-link">Register as Patient</a>
// //     <div class="text-danger mt-2" *ngIf="error">{{error}}</div>
// //   </form>
// //   `
// // })
// // export class LoginComponent {
// //   usernameOrEmail = '';
// //   password = '';
// //   loading = false;
// //   error = '';

// //   constructor(private auth: AuthService, private store: TokenStorageService, private router: Router) {}

// //   submit() {
// //     this.loading = true; this.error = '';
// //     this.auth.login(this.usernameOrEmail, this.password).subscribe({
// //       next: _ => {
// //         const role = this.store.role;
// //         if (role === 'PATIENT') this.router.navigate(['/patient']);
// //         else if (role === 'DOCTOR') this.router.navigate(['/doctor']);
// //         else if (role === 'ADMIN') this.router.navigate(['/admin']);
// //       },
// //       error: err => { this.error = err?.error?.message || 'Login failed'; this.loading = false; }
// //     });
// //   }
// // }


// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { NgIf } from '@angular/common';
// import { AuthService } from '../../services/auth';
// import { TokenStorageService } from '../../services/token-storage';
// import { RouterLink, Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule, NgIf, RouterLink],
//   templateUrl: './login.html'
// })
// export class LoginComponent {
//   usernameOrEmail = '';
//   password = '';
//   loading = false;
//   error = '';
//   loginType: 'USER' | 'ADMIN' = 'USER';

//   constructor(
//     private auth: AuthService,
//     private store: TokenStorageService,
//     private router: Router
//   ) {}

//   loginAs(type: 'USER' | 'ADMIN') {
//     this.loginType = type;
//     this.submit();
//   }

//   submit() {
//     this.loading = true;
//     this.error = '';

//     this.auth.login(this.usernameOrEmail, this.password).subscribe({
//       next: _ => {
//         const role = this.store.role;

//         if (this.loginType === 'ADMIN' && role !== 'ADMIN') {
//           this.error = 'Not an admin user';
//           this.loading = false;
//           return;
//         }

//         if (role === 'PATIENT') this.router.navigate(['/patient']);
//         else if (role === 'DOCTOR') this.router.navigate(['/doctor']);
//         else if (role === 'ADMIN') this.router.navigate(['/admin']);
//         else this.error = 'Unknown role';
//       },
//       error: err => {
//         this.error = err?.error?.message || 'Login failed';
//         this.loading = false;
//       }
//     });
//   }
// }


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';
import { TokenStorageService } from '../../services/token-storage';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  usernameOrEmail = '';
  password = '';
  loading = false;
  error = '';
  showAdminForm = false;
  showUserForm = false;
  loginType: 'USER' | 'ADMIN' | null = null; // initially null to hide form

  constructor(
    private auth: AuthService,
    private store: TokenStorageService,
    private router: Router
  ) {}

  chooseLogin(type: 'USER' | 'ADMIN') {
    this.loginType = type;
    this.error = '';
    this.usernameOrEmail = '';
    this.password = '';
  }

  submit() {
    this.loading = true;
    this.error = '';

    this.auth.login(this.usernameOrEmail, this.password).subscribe({
      next: _ => {
        const role = this.store.role;

        if (this.loginType === 'ADMIN' && role !== 'ADMIN') {
          this.error = 'Not an admin user';
          this.loading = false;
          return;
        }

        if (role === 'PATIENT') this.router.navigate(['/patient']);
        else if (role === 'DOCTOR') this.router.navigate(['/doctor']);
        else if (role === 'ADMIN') this.router.navigate(['/admin']);
        else this.error = 'Unknown role';
      },
      error: err => {
        this.error = err?.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}

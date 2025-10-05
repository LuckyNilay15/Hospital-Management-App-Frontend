import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { PatientDashboardComponent } from './pages/patient/patient-dashboard/patient-dashboard';
import { DoctorDashboardComponent } from './pages/doctor/doctor-dashboard/doctor-dashboard';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register/patient', component: RegisterComponent },
  {
    path: 'patient',
    component: PatientDashboardComponent,
    canMatch: [authGuard, roleGuard],
    data: { roles: ['PATIENT'] }
  },
  {
    path: 'doctor',
    component: DoctorDashboardComponent,
    canMatch: [authGuard, roleGuard],
    data: { roles: ['DOCTOR'] }
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canMatch: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];

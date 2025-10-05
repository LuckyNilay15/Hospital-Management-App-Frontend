import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';
import { Prescription } from '../models/prescription.model';
import { Department } from '../models/department.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  
   // 🔹 Patient prescriptions
  getMyPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.base}/patient/prescriptions`);
  }

  // 🔹 Doctor add/update prescription
  addOrUpdatePrescription(data: {
    appointmentId: string,
    doctor_notes: string,
    medicines: string
  }): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.base}/doctor/prescriptions`, data);
  }

  // Patient
  searchDoctors(params: { specialization?: string; name?: string; department?: string }) {
    const qs = new URLSearchParams(Object.entries(params).filter(([_,v]) => !!v) as any).toString();
    return this.http.get<Doctor[]>(`${this.base}/patient/doctors/search${qs ? '?' + qs : ''}`);
  }
  bookAppointment(body: { doctorId: string; appointment_date: string }) {
    return this.http.post<Appointment>(`${this.base}/patient/appointments`, body);
  }
  myAppointments() {
    return this.http.get<Appointment[]>(`${this.base}/patient/appointments`);
  }
  myPrescriptions() {
    return this.http.get<Prescription[]>(`${this.base}/patient/prescriptions`);
  }

  // Doctor
  todayAppointments() {
    return this.http.get<Appointment[]>(`${this.base}/doctor/appointments/today`);
  }
  setAvailability(availability: string) {
    return this.http.patch(`${this.base}/doctor/availability`, { availability });
  }
  upsertPrescription(body: { appointmentId: string; doctor_notes?: string; medicines?: string; markCompleted?: boolean }) {
    return this.http.post(`${this.base}/doctor/prescriptions`, body);
  }

  // Admin
  listDepartments() {
    return this.http.get<Department[]>(`${this.base}/admin/departments`);
  }
  addDepartment(name: string) {
    return this.http.post<Department>(`${this.base}/admin/departments`, { name });
  }
  createDoctor(body: { username: string; email: string; phone?: string; password: string; specialization?: string; departmentId?: string; }) {
    return this.http.post(`${this.base}/admin/doctors`, body);
  }
}

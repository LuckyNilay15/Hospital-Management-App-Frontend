import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api';
import { Doctor } from '../../../models/doctor.model';
import { Appointment } from '../../../models/appointment.model';
import { CommonModule } from '@angular/common';
import { Prescription } from '../../../models/prescription.model';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule,CommonModule],
  templateUrl: './patient-dashboard.html'
})
export class PatientDashboardComponent implements OnInit {
   prescriptions: Prescription[] = [];
  doctors: Doctor[] = [];
  appts: Appointment[] = [];
  q = { specialization:'', name:'', department:'' };
  book = { doctorId:'', appointment_date:'' };
  msg = ''; err = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.search();
    this.loadAppointments();
    this.api.getMyPrescriptions().subscribe({
      next: (res) => this.prescriptions = res,
      error: (err) => console.error(err)
    });
  }

  search() {
    this.api.searchDoctors(this.q).subscribe({
      next: d => this.doctors = d,
      error: e => this.err = e?.error?.message || 'Failed to load doctors'
    });
  }

  loadAppointments() {
    this.api.myAppointments().subscribe({
      next: a => this.appts = a
    });
  }

  bookAppt() {
    this.err = ''; this.msg = '';
    this.api.bookAppointment(this.book).subscribe({
      next: _ => { this.msg = 'Appointment booked'; this.loadAppointments(); },
      error: e => this.err = e?.error?.message || 'Booking failed'
    });
  }

  selectDoctor(id: string) { this.book.doctorId = id; }
}

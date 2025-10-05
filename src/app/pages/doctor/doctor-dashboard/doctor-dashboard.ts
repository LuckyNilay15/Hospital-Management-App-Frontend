// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../../../services/api';
// import { Appointment } from '../../../models/appointment.model';
// import { NgFor, NgIf, DatePipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-doctor-dashboard',
//   standalone: true,
//   imports: [NgFor, NgIf, FormsModule, DatePipe],
//   templateUrl: './doctor-dashboard.html'
// })
// export class DoctorDashboardComponent implements OnInit {
//   appts: Appointment[] = [];
//   availability = '';
//   appointmentId = '';
//   doctor_notes = '';
//   medicines = '';
//   msg = ''; err = '';

//   constructor(private api: ApiService) { }
  
//    savePrescription() {
//     this.api.addOrUpdatePrescription({
//       appointmentId: this.appointmentId,
//       doctor_notes: this.doctor_notes,
//       medicines: this.medicines
//     }).subscribe({
//       next: () => this.msg = 'Prescription saved!',
//       error: (e) => this.err = 'Failed: ' + e.error?.message
//     });
//   }

//   ngOnInit(): void { this.loadToday(); }

//   loadToday() {
//     this.api.todayAppointments().subscribe({
//       next: a => this.appts = a,
//       error: e => this.err = e?.error?.message || 'Failed to load appointments'
//     });
//   }

//   saveAvailability() {
//     this.msg = ''; this.err = '';
//     this.api.setAvailability(this.availability).subscribe({
//       next: _ => this.msg = 'Availability updated',
//       error: e => this.err = e?.error?.message || 'Failed to update'
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../../../services/api';
// import { Appointment } from '../../../models/appointment.model';
// import { NgFor, NgIf, DatePipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-doctor-dashboard',
//   standalone: true,
//   imports: [NgFor, NgIf, FormsModule, DatePipe],
//   templateUrl: './doctor-dashboard.html'
// })
// export class DoctorDashboardComponent implements OnInit {
  
//   appts: Appointment[] = [];
//   availability = '';

//   // Prescription fields
//   appointmentId = '';
//   doctor_notes = '';
//   medicines = '';

//   // UI state/messages
//   msg = '';
//   err = '';
//   isSaving = false;

//   // Selected appointment (for auto-fill and row highlight)
//   selectedAppt: Appointment | null = null;

//   constructor(private api: ApiService) { }

//   ngOnInit(): void {
//     this.loadToday();
//   }

//   loadToday() {
//     this.msg = ''; this.err = '';
//     this.api.todayAppointments().subscribe({
//       next: a => this.appts = a || [],
//       error: e => this.err = e?.error?.message || 'Failed to load appointments'
//     });
//   }

//   saveAvailability() {
//     this.msg = ''; this.err = '';
//     this.api.setAvailability(this.availability).subscribe({
//       next: _ => this.msg = 'Availability updated',
//       error: e => this.err = e?.error?.message || 'Failed to update'
//     });
//   }

//   // --- New: pick an appointment from the table and auto-fill the ID
//   selectAppt(a: Appointment) {
//     this.selectedAppt = a;
//     // @ts-ignore: your model likely has _id; adjust if different
//     // If your id field is `id` instead of `_id`, change below accordingly.
//     this.appointmentId = (a as any)._id || (a as any).id || '';
//   }

//   // --- Save prescription with basic validation and normalized payload
//   savePrescription() {
//     this.msg = ''; this.err = '';

//     const appointmentId = (this.appointmentId || '').trim();
//     const doctor_notes = (this.doctor_notes || '').trim();
//     const medicinesCsv = (this.medicines || '').trim();

//     if (!appointmentId) {
//       this.err = 'Please select an appointment (click a row) or enter an Appointment ID.';
//       return;
//     }
//     if (!doctor_notes && !medicinesCsv) {
//       this.err = 'Please enter doctor notes or medicines.';
//       return;
//     }

//     // Many backends expect an array of strings for medicines.
//     // If your API expects a comma-separated string instead, send `medicines: medicinesCsv`.
//     const medicinesArray = medicinesCsv
//       ? medicinesCsv.split(',').map(m => m.trim()).filter(Boolean)
//       : [];

//     const payload: any = {
//       appointmentId,
//       doctor_notes,
//       medicines: medicinesArray
//     };

//     this.isSaving = true;
//     this.api.addOrUpdatePrescription(payload).subscribe({
//       next: () => {
//         this.msg = 'Prescription saved!';
//         this.err = '';
//         // Optional: clear fields except appointmentId
//         // this.doctor_notes = '';
//         // this.medicines = '';
//       },
//       error: (e) => {
//         this.err = e?.error?.message ? `Failed: ${e.error.message}` : 'Failed to save prescription.';
//         this.msg = '';
//       },
//       complete: () => this.isSaving = false
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api';
import { Appointment } from '../../../models/appointment.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './doctor-dashboard.html'
})
export class DoctorDashboardComponent implements OnInit {

  appts: Appointment[] = [];
  availability = '';

  // Prescription fields
  appointmentId = '';
  doctor_notes = '';
  medicines = '';

  // UI state/messages
  msg = '';
  err = '';
  isSaving = false;

  // Selected appointment (for auto-fill and row highlight)
  selectedAppt: Appointment | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadToday();
  }

  loadToday() {
    this.msg = ''; this.err = '';
    this.api.todayAppointments().subscribe({
      next: a => this.appts = a || [],
      error: e => this.err = e?.error?.message || 'Failed to load appointments'
    });
  }

  saveAvailability() {
    this.msg = ''; this.err = '';
    this.api.setAvailability(this.availability).subscribe({
      next: _ => this.msg = 'Availability updated',
      error: e => this.err = e?.error?.message || 'Failed to update'
    });
  }

  // Select an appointment row and auto-fill the ID field
  selectAppt(a: Appointment) {
    this.selectedAppt = a;
    this.appointmentId = this.getApptId(a);
  }

  // Helper to safely get an appointment's id (handles _id or id)
  getApptId(a: any): string {
    return (a && (a._id || a.id)) ? String(a._id || a.id) : '';
  }

  // trackBy for better performance
  trackByAppt = (_: number, item: any) => this.getApptId(item) || _;

  // Save prescription with basic validation and normalised payload
  savePrescription() {
    this.msg = ''; this.err = '';

    const appointmentId = (this.appointmentId || '').trim();
    const doctor_notes = (this.doctor_notes || '').trim();
    const medicinesCsv = (this.medicines || '').trim();

    if (!appointmentId) {
      this.err = 'Please select an appointment (click a row) or enter an Appointment ID.';
      return;
    }
    if (!doctor_notes && !medicinesCsv) {
      this.err = 'Please enter doctor notes or medicines.';
      return;
    }

    // Send medicines as an array; if your API expects CSV, send medicinesCsv instead
    const medicinesArray = medicinesCsv
      ? medicinesCsv.split(',').map(m => m.trim()).filter(Boolean)
      : [];

    const payload: any = {
      appointmentId,
      doctor_notes,
      medicines: medicinesArray
      // If your backend expects a CSV string: medicines: medicinesCsv
    };

    this.isSaving = true;
    this.api.addOrUpdatePrescription(payload).subscribe({
      next: () => {
        this.msg = 'Prescription saved!';
        this.err = '';
        // Optional: clear fields (keep appointmentId if you like)
        // this.doctor_notes = '';
        // this.medicines = '';
      },
      error: (e) => {
        this.err = e?.error?.message ? `Failed: ${e.error.message}` : 'Failed to save prescription.';
        this.msg = '';
      },
      complete: () => this.isSaving = false
    });
  }
}

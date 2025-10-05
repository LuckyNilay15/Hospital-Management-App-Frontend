export type ApptStatus = 'BOOKED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  _id: string;
  patient: any;
  doctor: any;
  appointment_date: string;
  status: ApptStatus;
  createdAt?: string;
}

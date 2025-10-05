export interface DoctorUserRef {
  _id: string;
  username: string;
  email?: string;
  phone?: string;
}
export interface DepartmentRef { _id: string; name: string; }

export interface Doctor {
  _id: string;
  user: DoctorUserRef;
  department?: DepartmentRef;
  specialization?: string;
  availability?: string;
}

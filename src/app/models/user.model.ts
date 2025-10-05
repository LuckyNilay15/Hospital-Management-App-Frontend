export type Role = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: UserInfo;
}

import { Injectable } from '@angular/core';

const TOKEN = 'token';
const ROLE = 'role';
const USERNAME = 'username';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  setSession(token: string, role: string, username: string) {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(ROLE, role);
    localStorage.setItem(USERNAME, username);
  }
  clear() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(ROLE);
    localStorage.removeItem(USERNAME);
  }
  get token(): string | null { return localStorage.getItem(TOKEN); }
  get role(): ('PATIENT'|'DOCTOR'|'ADMIN'|null) { return (localStorage.getItem(ROLE) as any) ?? null; }
  get username(): string | null { return localStorage.getItem(USERNAME); }
  get isLoggedIn(): boolean { return !!this.token; }
}

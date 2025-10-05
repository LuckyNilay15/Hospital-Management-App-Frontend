import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient, private store: TokenStorageService) {}

  registerPatient(body: any) {
    return this.http.post<AuthResponse>(`${this.base}/register/patient`, body)
      .pipe(tap(res => this.store.setSession(res.token, res.user.role, res.user.username)));
  }

  login(usernameOrEmail: string, password: string) {
    return this.http.post<AuthResponse>(`${this.base}/login`, { usernameOrEmail, password })
      .pipe(tap(res => this.store.setSession(res.token, res.user.role, res.user.username)));
  }

  logout() { this.store.clear(); }
}

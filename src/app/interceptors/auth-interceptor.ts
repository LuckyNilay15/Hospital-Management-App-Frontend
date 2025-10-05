// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { TokenStorageService } from '../services/token-storage';
// import { catchError } from 'rxjs/operators';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private store: TokenStorageService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.store.token;
//     const request = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
//     return next.handle(request).pipe(
//       catchError((err: HttpErrorResponse) => throwError(() => err))
//     );
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.token;

    // 🔍 Debug: log token and request URL
    console.log('[AuthInterceptor] Token:', token);
    console.log('[AuthInterceptor] Request URL:', req.url);

    const request = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : req;

    if (token) {
      console.log('[AuthInterceptor] Authorization header set');
    } else {
      console.warn('[AuthInterceptor] No token available. Sending request without Authorization header');
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('[AuthInterceptor] HTTP Error:', err.status, err.message);
        return throwError(() => err);
      })
    );
  }
}

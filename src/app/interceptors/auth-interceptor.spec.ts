// import { TestBed } from '@angular/core/testing';
// import { HttpInterceptorFn } from '@angular/common/http';

// import { AuthInterceptor } from './auth-interceptor';

// describe('authInterceptor', () => {
//   const interceptor: HttpInterceptorFn = (req, next) => 
//     TestBed.runInInjectionContext(() => authInterceptor(req, next));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(interceptor).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { AuthInterceptor } from './auth-interceptor';
import { TokenStorageService } from '../services/token-storage';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let tokenStorageSpy: jasmine.SpyObj<TokenStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TokenStorageService', [], { token: 'test-token' });

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: TokenStorageService, useValue: spy },
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
    tokenStorageSpy = TestBed.inject(TokenStorageService) as jasmine.SpyObj<TokenStorageService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  // You can add more tests here (as shown earlier)
});


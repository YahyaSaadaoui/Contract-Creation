  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable, BehaviorSubject, of } from 'rxjs';
  import { finalize, catchError } from 'rxjs/operators';
  import { LoginRequest } from '../dto/login-request';
  import { JwtResponse } from '../dto/jwt-response';
  import { JwtHelperService } from '@auth0/angular-jwt';
  import { isPlatformBrowser } from '@angular/common';
  import { Inject, PLATFORM_ID } from '@angular/core';
  import { Router } from '@angular/router';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'http://localhost:8082/api/user';
    public token: string | null = null;
    isInitializingSubject = new BehaviorSubject<boolean>(true);
    isInitializing$ = this.isInitializingSubject.asObservable();


    constructor(
      private http: HttpClient,
      private router: Router,
      public jwtHelper: JwtHelperService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {this.token = this.getToken();}

    login(loginRequest: LoginRequest): Observable<JwtResponse | null> {
      return this.http.post<JwtResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
        catchError(error => {
          console.error('Login failed:', error);
          return of(null);
        }),
        finalize(() => {
          this.isInitializingSubject.next(false);
        })
      );
    }

    isLoggedIn(): boolean {
      if (isPlatformBrowser(this.platformId)) {
         // Get token from localStorage
        this.isLoggedInSubject.next(this.token != null && !this.jwtHelper.isTokenExpired(this.token));
      } else {
        this.isLoggedInSubject.next(false);
      }
      return this.isLoggedInSubject.value;
    }

    public isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    getUserRole(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        const token = this.getToken();
        if (token && !this.jwtHelper.isTokenExpired(token)) {
          const decodedToken = this.jwtHelper.decodeToken(token);
          const roles = decodedToken['roles'] as string;
          if (roles) {
            return roles;
          }
        }
      }
      return null;
    }

    getUserRolebrute(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        const token = this.getToken();
        if (token && !this.jwtHelper.isTokenExpired(token)) {
          const decodedToken = this.jwtHelper.decodeToken(token);
          const roles = decodedToken['roles'] as string;
          if (roles) {
            return roles.replace(/^ROLE_/, ''); // Remove the "ROLE_" prefix
          }
        }
      }
      return null;
    }

    setToken(token: string) {
      localStorage.setItem('token', token);
    }

    getToken(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem('token');
      } else {
        return null;
      }
    }

    logout() {
      localStorage.removeItem('token');
      this.token = null;
      this.isLoggedInSubject.next(false);
      this.router.navigate(['/login']);
    }

    getUsernameFromToken(): string | null {
      const token = this.getToken();
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken?.sub || null; // assuming 'sub' holds the username
      }
      return null;
    }

  }

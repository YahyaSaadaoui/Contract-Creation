import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../dto/login-request';
import { JwtResponse } from '../../dto/jwt-response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, of } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core'; // Removed unused import
import { isPlatformBrowser } from '@angular/common';
import { finalize, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/api/user'; 
  private token: string | null = null;

  private isInitializingSubject = new BehaviorSubject<boolean>(true); // Track initialization status
  isInitializing$ = this.isInitializingSubject.asObservable();

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(loginRequest: LoginRequest): Observable<JwtResponse | null> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        return of(null as JwtResponse | null);
      }),
      finalize(() => { 
        this.isInitializingSubject.next(false);
      })
    );
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) { 
      const token = localStorage.getItem('token');
      this.isLoggedInSubject.next(token != null && !this.jwtHelper.isTokenExpired(token));
    } else {
      this.isLoggedInSubject.next(false); 
    }
    return this.isLoggedInSubject.value;
  }

  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        const decodedToken = this.jwtHelper.decodeToken(token);   

        const roles = decodedToken['roles'] as string;
        if (roles) {
          return roles; // Directly return the role string (no need to split)
        }
      }
    }
    return null;
  }

  setToken(token: string) {
    this.token = token;
  }
}
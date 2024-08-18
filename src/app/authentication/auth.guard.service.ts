import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if isLoggedInSubject has been updated
    if (this.authService.isLoggedInSubject.value) {
      return true; // User is logged in, allow access
    } else {
      // Check localStorage and update isLoggedInSubject if necessary
      const token = localStorage.getItem('token');
      if (token && !this.authService.jwtHelper.isTokenExpired(token)) {
        this.authService.setToken(token);
        this.authService.isLoggedInSubject.next(true);
        return true; // Token is valid, allow access
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
}

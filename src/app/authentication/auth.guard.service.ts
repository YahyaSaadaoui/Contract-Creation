import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {PreloaderService} from "../preloader/preloader.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(@Inject(AuthService) private authService: AuthService, private router: Router,private preloaderService: PreloaderService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.preloaderService.setLoading(true); // Show the preloader immediately

    // Check localStorage for a valid token first
    const token = localStorage.getItem('token');
    if (token && !this.authService.jwtHelper.isTokenExpired(token)) {
      this.authService.setToken(token);
      this.authService.isLoggedInSubject.next(true);

      this.preloaderService.setLoading(false); // Hide the preloader
      return true; // Token is valid, allow access
    }

    // If no valid token in localStorage, check isLoggedInSubject
    if (this.authService.isLoggedInSubject.value) {
      this.preloaderService.setLoading(false); // Hide the preloader
      return true; // User is logged in (possibly from a previous session), allow access
    } else {
      this.preloaderService.setLoading(false); // Hide the preloader
      this.router.navigate(['/login']);
      return false;
    }
  }
}

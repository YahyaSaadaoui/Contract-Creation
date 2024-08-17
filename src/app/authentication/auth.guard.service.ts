import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Inject } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Observable } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 constructor(private authService: AuthService, private router: Router) {}

canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree   
 {
    // Wait for initialization to complete before checking login status
    return this.authService.isInitializing$.pipe(
      first(isInitializing => !isInitializing), // Wait until isInitializing is false
      switchMap(() => {
        if (this.authService.isLoggedIn()) {
          return of(true);
        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      })
    );
  }
}
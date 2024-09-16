import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolverService implements Resolve<boolean> {

  constructor(private authService: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isInitializing$.pipe(
      map(isInitializing => {
        if (isInitializing) {
          // Optionally, you can handle a loading state here
          return false;
        }
        const token = this.authService.getToken();
        if (token && !this.authService.jwtHelper.isTokenExpired(token)) {
          this.authService.setToken(token);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

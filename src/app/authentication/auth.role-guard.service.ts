import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getUserRole();

    if (userRole === null) {
      // Redirect to login or handle as needed (user is not authenticated)
      this.router.navigate(['/login']);
      return false;
    }

    if (requiredRoles && requiredRoles.includes(userRole)) {
      return true;
    } else {
      // Redirect to an unauthorized page or handle it as needed
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}

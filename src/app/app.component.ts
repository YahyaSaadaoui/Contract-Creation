import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInitStatus } from '@angular/core';
import { Inject } from '@angular/core';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cash-business-solution';

  constructor(
    private router: Router,

    @Inject(AuthService) private authService: AuthService,
    private appInitStatus: ApplicationInitStatus
  ) {
    // Check for token and update isLoggedInSubject immediately in the constructor
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && !this.authService.jwtHelper.isTokenExpired(token)) {
        this.authService.setToken(token);
        this.authService.isLoggedInSubject.next(true);
      }
    }
  }

  ngOnInit() {
    this.appInitStatus.donePromise.then(() => {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/dashboard']);
      }
  });
  }
}

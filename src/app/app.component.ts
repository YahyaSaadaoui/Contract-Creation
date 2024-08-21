import {NavigationEnd, RouterOutlet} from '@angular/router';
import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInitStatus } from '@angular/core';
import { Inject } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import {PreloaderComponent} from "./preloader/preloader.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {AsyncPipe, DOCUMENT, NgIf} from "@angular/common";
import {PreloaderService} from "./preloader/preloader.service";
import {filter} from "rxjs";
import {map} from "rxjs/operators";
import {LoginComponent} from "./authentication/login/login.component";
import {ThemeService} from "./shared/navbar/ThemeService";
import {SharedModule} from "./shared/shared.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PreloaderComponent, NavbarComponent, NgIf, AsyncPipe,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cash-business-solution';
  showPreloader = true;
  showNavbar= true;

  onActivate(event: any) {
    this.showNavbar = !(event instanceof LoginComponent);
  }
  constructor(
    private router: Router,
    public preloaderService: PreloaderService,
    private themeprovider : ThemeService,
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(AuthService) private authService: AuthService,
    private appInitStatus: ApplicationInitStatus,
    @Inject(DOCUMENT) private document: Document,
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
        this.preloaderService.setLoading(false);
        this.showPreloader=false;

      } else {
        this.router.navigate(['/dashboard']);
        this.preloaderService.setLoading(true);
        this.showPreloader=true;
      }
  });
  this.themeprovider.isDarkMode$.subscribe(isDarkMode => {
    const appRootElement = this.document.querySelector('app-root');
    if (isDarkMode) {
      this.renderer.addClass(appRootElement, 'dark:bg-haiti-950');
      this.renderer.addClass(this.document.documentElement, 'dark');
      this.renderer.addClass(this.document.body, 'dark:bg-haiti-950');
    } else {
      this.renderer.removeClass(appRootElement, 'dark:bg-haiti-950');
      this.renderer.removeClass(this.document.documentElement, 'dark');
      this.renderer.removeClass(this.document.body, 'dark:bg-haiti-950');
    }
  });
  }
}

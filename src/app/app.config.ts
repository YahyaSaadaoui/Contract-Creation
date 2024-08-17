import { ApplicationConfig, provideZoneChangeDetection , importProvidersFrom, APP_INITIALIZER, Injector } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthService } from './authentication/login/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

function initializeAppFactory(injector: Injector, authService: AuthService) {
  return () => {
    const jwtHelperService = injector.get(JwtHelperService);

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && !jwtHelperService.isTokenExpired(token)) {
        authService.setToken(token);
        authService.isLoggedInSubject.next(true); // Update isLoggedInSubject
      }
    }
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })),
    provideHttpClient(withFetch()), // Keep this one to enable fetch APIs
    importProvidersFrom(HttpClientModule), 
  ]
};
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  Injector,
  provideZoneChangeDetection
} from '@angular/core';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {AuthService} from "./authentication/auth.service";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {AuthenticationModule} from "./authentication/authentication.module";
import {AuthGuard} from "./authentication/auth.guard.service";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideClientHydration} from "@angular/platform-browser";


function initializeAppFactory(injector: Injector, authService: AuthService) {
  return () => {
    const jwtHelperService = injector.get(JwtHelperService);
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && !jwtHelperService.isTokenExpired(token)) {
        authService.setToken(token);
        authService.isLoggedInSubject.next(true);
      }
    }
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AuthenticationModule),
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token')
      }
    })),
    AuthService,
    AuthGuard,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [Injector, AuthService],
      multi: true
    }
  ]
};

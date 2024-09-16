import {NavigationEnd, RouterOutlet} from '@angular/router';
import {Component, ElementRef, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInitStatus } from '@angular/core';
import { Inject } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import {PreloaderComponent} from "./shared/preloader/preloader.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {AsyncPipe, DOCUMENT, isPlatformBrowser, NgIf} from "@angular/common";
import {PreloaderService} from "./shared/preloader/preloader.service";
import {LoginComponent} from "./authentication/login/login.component";
import {ThemeService} from "./shared/navbar/ThemeService";
import {SharedModule} from "./shared/shared.module";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ContractService} from "./admin/contract-creation/contract.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexAnnotations,
  NgApexchartsModule
} from "ng-apexcharts";
import ApexCharts from 'apexcharts';
import {OnboardingMerchantComponent} from "./admin/merchant-management/onboarding-merchant/onboarding-merchant.component";
import {ModifyMerchantComponent} from "./admin/merchant-management/modify-merchant/modify-merchant.component";
import {MerchantListComponent} from "./admin/merchant-management/merchant-list/merchant-list.component";
import {MerchantManagementComponent} from "./admin/merchant-management/merchant-management.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {SettingsComponent} from "./admin/settings/settings.component";
import {UserManagementComponent} from "./admin/user-management/user-management.component";
import {ContractCreationComponent} from "./admin/contract-creation/contract-creation.component";
import {ContractListComponent} from "./admin/contract-creation/contract-list/contract-list.component";
import {AddContractComponent} from "./admin/contract-creation/add-contract/add-contract.component";
import {ModifyContractComponent} from "./admin/contract-creation/modify-contract/modify-contract.component";
import {AuthenticationModule} from "./authentication/authentication.module";
import {FooterComponent} from "./shared/footer/footer.component";
import {MerchantService} from "./admin/merchant-management/merchant.service";
import { NgToastModule } from 'ng-angular-popup' // to be added
import { ToasterPosition } from 'ng-angular-popup';
import {SidebarComponent} from "./shared/sidebar/sidebar.component";
import {SidebarService} from "./shared/sidebar/sidebar.service";
import { MatTooltipModule } from '@angular/material/tooltip';
import {CdfTypesComponent} from "./admin/settings/business-settings/cdf-types/cdf-types.component";
import {FeesTypesComponent} from "./admin/settings/business-settings/fees-types/fees-types.component";
import {SettlementTypesComponent} from "./admin/settings/business-settings/settlement-types/settlement-types.component";
import {CurrenciesComponent} from "./admin/settings/business-settings/currencies/currencies.component";
import {FeesPercentagesComponent} from "./admin/settings/business-settings/fees-percentages/fees-percentages.component";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  annotations?: ApexAnnotations;  // Add annotations to the options
};



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthenticationModule,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SettingsComponent,
    OnboardingMerchantComponent,
    ModifyMerchantComponent,
    MerchantListComponent,
    MerchantManagementComponent,
    UserManagementComponent,
    ContractCreationComponent,
    ContractListComponent,
    AddContractComponent,
    ModifyContractComponent,
    PreloaderComponent,
    NgIf,
    AsyncPipe,
    SharedModule,
    NgxChartsModule,
    FooterComponent,
    NgToastModule,
    SidebarComponent,
    MatTooltipModule,
    FeesPercentagesComponent,
    CurrenciesComponent,
    FeesTypesComponent,
    SettlementTypesComponent,
    CdfTypesComponent
  ],
  providers: [SidebarService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cash-business-solution';
  showPreloader = true;
  showNavbar= true;
  ToasterPosition = ToasterPosition;
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
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
    private merchantService: MerchantService,
    private contractService: ContractService,
    @Inject(PLATFORM_ID) private platformId: Object
) {
    // const token = localStorage.getItem('token');
    //
    // if (typeof localStorage !== 'undefined'  && isPlatformBrowser(this.platformId) ) {
    //   if (token && !this.authService.jwtHelper.isTokenExpired(token)) {
    //     this.authService.setToken(token);
    //     this.authService.isLoggedInSubject.next(true);
    //   }

      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('token');
        if (token && !this.authService.jwtHelper.isTokenExpired(token)) {
          this.authService.setToken(token);
          this.authService.isLoggedInSubject.next(true);
        }
    }
  }

  ngOnInit() {

    this.showPreloader = true;
    this.preloaderService.setLoading(true);
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token && !this.authService.jwtHelper.isTokenExpired(token)) {
        this.authService.setToken(token);
        this.authService.isLoggedInSubject.next(true);
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.preloaderService.setLoading(false);
        this.showPreloader = false;
      }
    });
  this.themeprovider.isDarkMode$.subscribe(isDarkMode => {
    const appRootElement = this.document.querySelector('app-root');
    if (isDarkMode) {
      this.renderer.addClass(appRootElement, 'dark:bg-gray-900');
      this.renderer.addClass(this.document.documentElement, 'dark');
      this.renderer.addClass(this.document.body, 'dark:bg-gray-900');
    } else {
      this.renderer.removeClass(appRootElement, 'dark:bg-gray-900');
      this.renderer.removeClass(this.document.documentElement, 'dark');
      this.renderer.removeClass(this.document.body, 'dark:bg-gray-900');
    }
  });

  }

}

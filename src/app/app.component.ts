import {NavigationEnd, RouterOutlet} from '@angular/router';
import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInitStatus } from '@angular/core';
import { Inject } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import {PreloaderComponent} from "./preloader/preloader.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {AsyncPipe, DOCUMENT, NgIf} from "@angular/common";
import {PreloaderService} from "./preloader/preloader.service";
import {LoginComponent} from "./authentication/login/login.component";
import {ThemeService} from "./shared/navbar/ThemeService";
import {SharedModule} from "./shared/shared.module";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ContractService} from "./admin/contract-creation/contract.service";
import {MerchantService} from "./admin/merchant-management/merchant.service";
import {
  ChartComponent,
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
import {AddMerchantComponent} from "./admin/merchant-management/add-merchant/add-merchant.component";
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
    AddMerchantComponent,
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
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cash-business-solution';
  showPreloader = true;
  showNavbar= true;
  isLoginPage(): boolean {
    return this.router.url === '/login'; // Adjust '/login' to your actual login route
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
    private contractService: ContractService
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

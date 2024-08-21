import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../authentication/auth.service";
import {MerchantService} from "../../admin/merchant-management/merchant.service";
import {ContractService} from "../../admin/contract-creation/contract.service";
import {BehaviorSubject} from "rxjs";
import {ThemeService} from "./ThemeService";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, NgClass, FormsModule, NgIf, RouterLink, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(private authService: AuthService,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              private themeService: ThemeService
  ) {}

  userRole: string | null = null;
  sidebarToggle= false;
  darkMode = false;
  openDropdown: string | null = null;
  @ViewChild('notificationMenu') notificationMenu!: ElementRef;
  @ViewChild('chatMenu') chatMenu!: ElementRef;
  @ViewChild('settingsMenu') settingsMenu!: ElementRef;


  toggleSidebar() {
    this.sidebarToggle = !this.sidebarToggle;
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  toggleDropdown(dropdownName: string) {
    this.openDropdown = (this.openDropdown === dropdownName) ? null : dropdownName;
  }

  isDropdownOpen(dropdownName: string): boolean {
    return this.openDropdown === dropdownName;
  }
  performSearch() {
    // TODO: Implement merchant search logic here
    console.log("Search functionality not yet implemented.");
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    console.log("User Role:", this.userRole);
    this.renderer.listen('window', 'click', (event: Event) => {
      if (this.openDropdown &&
        !this.notificationMenu.nativeElement.contains(event.target) &&
        !this.chatMenu.nativeElement.contains(event.target) &&
        !this.settingsMenu.nativeElement.contains(event.target) // Include settingsMenu
      ) {
        this.openDropdown = null;
      }
    });

  }
  hasAccess(feature: string): boolean {
    switch (feature) {
      case 'merchant-management':
      case 'cases-exceptions':
      case 'contract-creation':
      case 'settings':
        return this.userRole === 'ROLE_casual' || this.userRole === 'ROLE_admin' || this.userRole === 'ROLE_adminSystem';
      case 'user-management':
        return this.userRole === 'ROLE_adminSystem';
      default:
        return false; // Deny access for unknown features
    }
  }

  private darkModeSubject = new BehaviorSubject<boolean>(false);


}

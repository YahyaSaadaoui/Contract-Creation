import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CommonModule, DOCUMENT, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../../authentication/auth.service";
import {BehaviorSubject} from "rxjs";
import {ThemeService} from "./ThemeService";
import { SidebarService } from '../sidebar/sidebar.service';
import { HostListener } from '@angular/core';
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
              private themeService: ThemeService,
              private sidebarService: SidebarService

  ) {}
  username: string | null = null;
  role: string | null = null;
  userRole: string | null = null;
  isSidebarMenuOpen= true;
  profileImageUrl: string | null = null;
  isSidebarOpen = false;
  darkMode = false;
  openDropdown: string | null = null;
  @ViewChild('notificationMenu') notificationMenu!: ElementRef;
  @ViewChild('settingsMenu') settingsMenu!: ElementRef;
  dropdowns: { [key: string]: boolean } = {};
  accordions: { [key: string]: boolean } = {};
  notifying = false;


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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

  toggleSideMenu() {
    this.sidebarService.toggleSidebar();
  }

  performSearch() {
    // TODO: Implement merchant search logic here
    console.log("Search functionality not yet implemented.");
  }

  toggleAccordion(accordion: string) {
    this.accordions[accordion] = !this.accordions[accordion];
  }

  isAccordionOpen(accordion: string): boolean {
    return !!this.accordions[accordion];
  }

  private isClickInsideDropdown(event: Event): boolean {
    const sidebar = this.document.querySelector('.fixed.right-0.top-0.z-40');
    return sidebar ? sidebar.contains(event.target as Node) : false;
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    console.log("User Role:", this.userRole);

// Listen for clicks on the window
    this.renderer.listen('window', 'click', (event: Event) => {
      // Check if the click was outside of the notification and settings menus
      if (this.openDropdown &&
        !this.notificationMenu.nativeElement.contains(event.target) &&
        !this.settingsMenu.nativeElement.contains(event.target) &&
        !this.isClickInsideDropdown(event) // check sidebar
      ) {
        console.log('Hiding dropdown');
        this.openDropdown = null; // Close the dropdown
      }
    });

    this.username = this.authService.getUsernameFromToken();
    this.role = this.authService.getUserRolebrute();
    this.authService.getUserDetailsByUsername().subscribe(user => {
      this.profileImageUrl = user.imageUrl;
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
      case 'device-management':
        return this.userRole === 'ROLE_adminSystem' || this.userRole === 'ROLE_admin';
      default:
        return false;
    }
  }



}

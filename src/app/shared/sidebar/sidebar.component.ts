import { Component, ElementRef, Inject, Renderer2, ViewChild, OnInit } from '@angular/core';
import {DOCUMENT, NgClass, NgIf} from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { SidebarService } from './sidebar.service'; // Import the service
import { ThemeService } from '../navbar/ThemeService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterLink
  ],
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isSidebarMenuOpen = true;

  constructor(private authService: AuthService,
              private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisibility$.subscribe(isVisible => {
      this.isSidebarMenuOpen = isVisible;
    });
  }

  hasAccess(feature: string): boolean {
    const userRole = this.authService.getUserRole();
    switch (feature) {
      case 'merchant-management':
      case 'cases-exceptions':
      case 'contract-creation':
      case 'settings':
        return userRole === 'ROLE_casual' || userRole === 'ROLE_admin' || userRole === 'ROLE_adminSystem';
      case 'user-management':
      case 'device-management':
        return userRole === 'ROLE_adminSystem' || userRole === 'ROLE_admin';
      default:
        return false;
    }
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}

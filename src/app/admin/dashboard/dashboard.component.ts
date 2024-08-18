import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import {RouterLink, RouterModule} from '@angular/router';
import { routes } from '../../app.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Or use Tailwind CSS classes directly
})
export class DashboardComponent implements OnInit {
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    console.log("User Role:", this.userRole);
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
}


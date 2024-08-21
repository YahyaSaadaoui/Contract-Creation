import { Component } from '@angular/core';
import {Router, ActivatedRoute, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-merchant-management',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './merchant-management.component.html',
  styleUrl: './merchant-management.component.css'
})
export class MerchantManagementComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

}

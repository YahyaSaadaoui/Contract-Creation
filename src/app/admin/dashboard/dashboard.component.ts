
import { AuthService } from '../../authentication/auth.service';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import { Component, ElementRef, OnInit, Renderer2, ViewChild , Inject} from '@angular/core';
import {NgClass, DOCUMENT, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";

import {MerchantService} from "../merchant-management/merchant.service";
import {ContractService} from "../contract-creation/contract.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, NgClass, FormsModule, NgIf, RouterLink, NgOptimizedImage],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Or use Tailwind CSS classes directly
})
export class DashboardComponent implements OnInit {

  totalMerchants = 0;
  totalContracts = 0;



  constructor(
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document,
              private merchantService: MerchantService,
              private contractService: ContractService
  ) {}

  ngOnInit(): void {

    this.merchantService.getMerchants().subscribe(merchants => {
      this.totalMerchants = merchants.length;
    });

    this.contractService.getContracts().subscribe(contracts => {
      this.totalContracts = contracts.length;
    });
  }




}


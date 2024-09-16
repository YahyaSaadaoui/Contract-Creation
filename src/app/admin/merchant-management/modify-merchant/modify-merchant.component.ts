import {Component, EventEmitter, Output, Input, OnInit, inject, Inject} from '@angular/core';
import { MerchantService } from '../merchant.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../../../authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { MSSDTO } from '../../../dto/MerchantMSSDTO';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-modify-merchant',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './modify-merchant.component.html',
  styleUrls: ['./modify-merchant.component.css']
})
export class ModifyMerchantComponent implements OnInit {
  @Input() merchantId: number | undefined = 0;
  @Output() closeEdit = new EventEmitter<void>();
  @Output() updateComplete = new EventEmitter<void>();
  private = inject(NgToastService);
  merchant: MSSDTO = {
    id: 0,
    merchantName: '',
    merchantNumber: '',
    status: '',
    taxRate: 0,
    bankAccountDetails: '',
    contractStatus: '',
    accountBalance: 0,
    updated_by: '',
    activities: [],
    addresses: []
  };
  username: string | null = null;
  steps = ['Merchant', 'Addresses', 'Activities'];
  currentStepIndex = 0;
  completedSteps: Set<number> = new Set();

  constructor(private authService: AuthService, private merchantService: MerchantService, private router: Router , private route: ActivatedRoute,@Inject(NgToastService) private toast : NgToastService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
    this.route.paramMap.subscribe(params => {
      const merchantId = params.get('id');
      if (merchantId) {
        this.merchantId = +merchantId;
        this.loadMerchantData(this.merchantId);
      }
    });
  }

  loadMerchantData(id: number): void {
    this.merchantService.getMerchantMapperToMSS(id).subscribe(data => {
      this.merchant = data;
    });
  }

  get currentStep() {
    return this.steps[this.currentStepIndex];
  }

  nextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.completedSteps.add(this.currentStepIndex);
      this.currentStepIndex++;
    }
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.completedSteps.delete(this.currentStepIndex);
      this.currentStepIndex--;
    }
  }

  isStepDone(index: number): boolean {
    return this.completedSteps.has(index);
  }

  addAddress() {
    if (this.merchant) {
      this.merchant.addresses.push({
        street: '',
        isPrimary: false,
        city: '',
        state: '',
        country: '',
        zipCode: '',
        email: '',
        phoneNumber: '',
        faxNumber: ''
      });
    }
  }

  updateMerchant() {
    if (this.merchantId && this.merchant) {
      this.merchantService.updateMerchant(this.merchantId, this.merchant).subscribe({
        next: () => {
          // TODO : Change the alert to popup
          this.toast.success("Merchant updated successfully.", "SUCCESS", 5000)
         this.closeAddModal()
        }
      });
    }
  }

  closeAddModal(): void {
    this.router.navigate(['/dashboard/merchant-management/list']);
    this.resetForm();
  }

  removeActivity(index: number) {
    if (confirm('Are you sure you want to remove this activity?')) {
      this.merchant?.activities.splice(index, 1);
    }
  }

  removeAddress(index: number) {
    if (confirm('Are you sure you want to remove this address?')) {
      this.merchant?.addresses.splice(index, 1);
    }
  }

  resetForm() {
    this.merchant = {
      id: 0,
      merchantName: '',
      merchantNumber: '',
      status: '',
      taxRate: 0,
      accountBalance: 0,
      bankAccountDetails: '',
      contractStatus: '',
      updated_by: '',
      activities: [],
      addresses: []
    };
    this.currentStepIndex = 0;
    this.completedSteps.clear();
  }
}


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MerchantService } from "../merchant.service";
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { ModalService } from '../modal.service';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../authentication/auth.service";
import {MerchantDTO} from "../../../dto/merchant-dto";

@Component({
  selector: 'app-onboarding-merchant',
  templateUrl: './onboarding-merchant.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink,
    NgClass
  ],
  styleUrls: ['./onboarding-merchant.component.css'],
  providers: [ModalService]
})
export class OnboardingMerchantComponent implements OnInit {
  username: string | null = null;
  steps = ['Merchant', 'Addresses', 'Activities'];
  currentStepIndex = 0;
  completedSteps: Set<number> = new Set();
  merchant: MerchantDTO = {
    merchantName: '',
    merchantNumber: '',
    status: '',
    taxRate: 0,
    accountBalance: 0,
    bankAccountDetails: '',
    contractStatus: '',
    created_by: '',
    feeStructure: "",
    settlementOption: "",
    activities: [],
    addresses: []
  };

  @Input() isAddModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Input() isVisible = false;
  @Input() title = 'Confirm Deletion';
  @Input() message = 'Are you sure you want to proceed?';
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  constructor(private authService: AuthService, private merchantService: MerchantService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
    this.addAddress(); // Trigger the add address function on component initialization
    this.addActivity();
  }
  addActivity(): void {
    this.merchant.activities.push({ activityName: '' });
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
      this.completedSteps.delete(this.currentStepIndex); // Remove current step from completedSteps
      this.currentStepIndex--;
    }
  }

  isStepDone(index: number): boolean {
    return this.completedSteps.has(index);
  }

  addAddress() {
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

  saveMerchant() {
    this.merchantService.createMerchant(this.merchant).subscribe(() => {
        this.router.navigate(['/dashboard/merchant-management/list']);
      });
  }

  closeAddModal(): void {
    this.router.navigate(['/dashboard/merchant-management/list']);
    this.resetForm();
  }
  removeAddress(index: number) {
    this.merchant.addresses.splice(index, 1);
    this.isVisible = false;
  }
  removeActivity(index: number) {
    this.merchant.activities.splice(index, 1);
    this.isVisible = false;
  }

  showConfirmationModalActivity() {
    this.isVisible = true;
  }
  showConfirmationModalAddresses() {
    this.isVisible = true;
  }
  cancel() {
    this.isVisible = false;
  }


  resetForm() {
    this.merchant = {
      merchantName: '',
      merchantNumber: '',
      status: '',
      taxRate: 0,
      accountBalance: 0,
      bankAccountDetails: '',
      contractStatus: '',
      created_by: '',
      feeStructure: "",
      settlementOption: "",
      activities: [],
      addresses: []
    };
    this.currentStepIndex = 0;
    this.completedSteps.clear();
  }

}

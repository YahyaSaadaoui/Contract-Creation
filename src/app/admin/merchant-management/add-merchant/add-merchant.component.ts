import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MerchantDTO } from "../../../dto/merchant-dto";
import { MerchantService } from "../merchant.service";
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { ModalService } from '../modal.service';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../authentication/auth.service";

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink,
    NgClass
  ],
  styleUrls: ['./add-merchant.component.css'],
  providers: [ModalService]
})
export class AddMerchantComponent implements OnInit {
  username: string | null = null;
  steps = ['Merchant', 'Addresses', 'Activities'];
  currentStepIndex = 0;
  completedSteps: Set<number> = new Set();
  merchant: MerchantDTO = {
    merchantNumber: '',
    merchantName: '',
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

  constructor(private authService: AuthService, private merchantService: MerchantService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
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
    if (this.merchant.id) {
      this.merchantService.updateMerchant(this.merchant.id, this.merchant).subscribe(() => {
        this.closeModal.emit();
        this.router.navigate(['./merchant-management/list']);
      });
    } else {
      this.merchantService.createMerchant(this.merchant).subscribe(() => {
        this.router.navigate(['./merchant-management/list']);
      });
    }
  }

  closeAddModal() {
    this.closeModal.emit();
    this.router.navigate(['./merchant-management/list']);
  }

  removeActivity(index: number) {
    if (confirm('Are you sure you want to remove this activity?')) {
      this.merchant.activities.splice(index, 1);
    }
  }

  removeAddress(index: number) {
    if (confirm('Are you sure you want to remove this address?')) {
      this.merchant.addresses.splice(index, 1);
    }
  }
  resetForm() {
    this.merchant = {
      merchantNumber: '',
      merchantName: '',
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

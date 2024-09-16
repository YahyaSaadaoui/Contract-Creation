import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";

import {AuthService} from "../../../authentication/auth.service";
import {Router} from "@angular/router";
import {ContractDTO} from "../../../dto/contract-dto";
import {ContractService} from "../contract.service";

@Component({
  selector: 'app-add-contract',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './add-contract.component.html',
  styleUrl: './add-contract.component.css'
})
export class AddContractComponent implements OnInit {
  MerchantNumbers: string[] = [];
  username: string | null = null;
  steps = ['Merchant', 'Addresses', 'Activities'];
  currentStepIndex = 0;
  completedSteps: Set<number> = new Set();
  contract: ContractDTO = {
    contractID:0,
    merchantNumber: '',
    merchantDDA: '',
    contractStarts: new Date(),
    contractEnds: new Date(),
    settlementOption: '',
    feeStructure: ''
  };
  @Input() isAddModalOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private authService: AuthService, private contractService: ContractService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
    this.contractService.getMerchantNumbers().subscribe(
      (numbers) => {
        this.MerchantNumbers = numbers;
      },
      (error) => {
        console.error('Error fetching merchant numbers', error);
      }
    );
  }

  get currentStep() {
    return this.steps[this.currentStepIndex];
  }

  saveContract() {
    this.contractService.createContract(this.contract).subscribe(() => {
      this.router.navigate(['/dashboard/contract-creation/list']);
    });
  }

  closeAddModal(): void {
    this.router.navigate(['/dashboard/contract-creation/list']); // Correct path based on your routing
    this.resetForm();
  }


  resetForm() {
    this.contract = {
      contractID:0,
      merchantNumber: '',
      merchantDDA: '',
      contractStarts: new Date(),
      contractEnds: new Date(),
      settlementOption: '',
      feeStructure: ''
    };
    this.currentStepIndex = 0;
    this.completedSteps.clear();
  }

}

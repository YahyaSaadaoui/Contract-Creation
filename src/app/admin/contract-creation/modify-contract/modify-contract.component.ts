import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ContractDTO} from "../../../dto/contract-dto";
import {AuthService} from "../../../authentication/auth.service";
import {ContractService} from "../contract.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MerchantService} from "../../merchant-management/merchant.service";

@Component({
  selector: 'app-modify-contract',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './modify-contract.component.html',
  styleUrl: './modify-contract.component.css'
})
export class ModifyContractComponent implements OnInit {
  MerchantNumbers: string[] = [];
  @Input() contractID: number = 0;
  @Output() closeEdit = new EventEmitter<void>();
  @Output() updateComplete = new EventEmitter<void>();
  contract: ContractDTO = {
    contractID:0,
    merchantNumber: '',
    merchantDDA: '',
    contractStarts: new Date(),
    contractEnds: new Date(),
    settlementOption: '',
    feeStructure: ''
  };
  username: string | null = null;
  steps = ['Merchant', 'Addresses', 'Activities'];
  currentStepIndex = 0;
  completedSteps: Set<number> = new Set();
  constructor(private authService: AuthService, private contractService: ContractService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
    this.route.paramMap.subscribe(params => {
      const contractId = params.get('id');
      if (contractId) {
        this.contractID = +contractId;
        this.loadMerchantData(this.contractID);
      }
    });
    this.contractService.getMerchantNumbers().subscribe(
      (numbers) => {
        this.MerchantNumbers = numbers;
      },
      (error) => {
        console.error('Error fetching merchant numbers', error);
      }
    );
  }
  loadMerchantData(id: number): void {
    this.contractService.getContract(id).subscribe(data => {
      this.contract = data;
    });
  }
  saveContract() {
    if (this.contractID && this.contract) {
      this.contractService.updateContract(this.contractID, this.contract).subscribe({
        next: () => {
          alert('Merchant updated successfully.');
          this.updateComplete.emit();
          this.closeEdit.emit();
          this.router.navigate(['/dashboard/contract-creation/list']);
        }
      });
    }
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

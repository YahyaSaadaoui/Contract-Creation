import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MerchantService } from "../merchant.service";
import { NgForOf, NgIf } from "@angular/common";
import { AddressDTO } from "../../../dto/address-dto";
import { OnboardingMerchantComponent } from "../onboarding-merchant/onboarding-merchant.component";
import { ModifyMerchantComponent } from "../modify-merchant/modify-merchant.component";
import { ModalService } from '../modal.service';
import { RouterLink } from "@angular/router";
import { MSSDTO } from "../../../dto/MerchantMSSDTO";
import { AuthService } from "../../../authentication/auth.service";
import {MerchantDTO} from "../../../dto/merchant-dto";

@Component({
  selector: 'app-merchant-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    OnboardingMerchantComponent,
    ModifyMerchantComponent,
    RouterLink,
  ],
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
  providers: [ModalService]
})
export class MerchantListComponent implements OnInit {
  merchants: MerchantDTO[] = [];
  selectedMerchantId: number | undefined = 0;
  isAddModalOpen: boolean = false;
  username: string | null = null;
  @Input() isVisible = false;
  @Input() title = 'Confirm Deletion';
  @Input() message = 'Are you sure you want to proceed?';

  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();


  deleteMerchant(id: number | undefined) {
      this.merchantService.deleteMerchant(id).subscribe(() => {
        this.loadMerchants();
      });
    this.isVisible = false;
  }

   showConfirmationModal() {
      this.isVisible = true;
    }

    cancel() {
      this.isVisible = false;
    }

  constructor(private authService: AuthService, private merchantService: MerchantService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.loadMerchants();
  }

  selectMerchant(id: number | undefined): void {
    this.selectedMerchantId = id;
  }

  hasPrimaryAddress(addresses: AddressDTO[]): boolean {
    return addresses.some(address => address.isPrimary);
  }

  loadMerchants() {
    this.merchantService.getMerchants().subscribe((data) => {
      this.merchants = data;
    });
  }

  private getCurrentUser(): string {
    this.username = this.authService.getUsernameFromToken();
    return this.username ? this.username : '';
  }

  deselectMerchant(): void {
    this.selectedMerchantId = 0;
  }

  refreshMerchants(): void {
    this.loadMerchants();
    this.deselectMerchant();
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }


}

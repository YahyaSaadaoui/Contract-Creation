import { Component, OnInit } from '@angular/core';
import { MerchantDTO } from "../../../dto/merchant-dto";
import { MerchantService } from "../merchant.service";
import { NgForOf, NgIf } from "@angular/common";
import { AddressDTO } from "../../../dto/address-dto";
import {AddMerchantComponent} from "../add-merchant/add-merchant.component";
import {ModifyMerchantComponent} from "../modify-merchant/modify-merchant.component";
import { ModalService } from '../modal.service';
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-merchant-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AddMerchantComponent,
    ModifyMerchantComponent,
    RouterLink,
  ],
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css'],
  providers: [ModalService]
})
export class MerchantListComponent implements OnInit {
  merchants: MerchantDTO[] = [];
  selectedMerchant: MerchantDTO | null = null;
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;

  constructor(private merchantService: MerchantService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.loadMerchants();
  }

  hasPrimaryAddress(addresses: AddressDTO[]): boolean {
    return addresses.some(address => address.isPrimary);
  }

  loadMerchants() {
    this.merchantService.getMerchants().subscribe((data) => {
      this.merchants = data;
    });
  }

  openAddModal(): void {
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }

  openEditModal(merchant: MerchantDTO): void {
    this.selectedMerchant = merchant;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.selectedMerchant = null;
    this.isEditModalOpen = false;
  }

  deleteMerchant(id: number | undefined) {
    if (confirm('Are you sure you want to delete this merchant?')) {
      this.merchantService.deleteMerchant(id).subscribe(() => {
        this.loadMerchants();
      });
    }
  }
}

import { Component, EventEmitter, Output, Input } from '@angular/core';
import {MerchantDTO} from "../../../dto/merchant-dto";
import {MerchantService} from "../merchant.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-modify-merchant',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './modify-merchant.component.html',
  styleUrl: './modify-merchant.component.css'
})
export class ModifyMerchantComponent {
  @Input() merchant!: MerchantDTO;
  @Output() closeModal = new EventEmitter<void>();
  constructor(private merchantService: MerchantService) {}

  saveMerchant() {
    if (this.merchant.id) {
      this.merchantService.updateMerchant(this.merchant.id, this.merchant).subscribe(() => {
        this.closeModal.emit();
      });
    } else {
      this.merchantService.createMerchant(this.merchant).subscribe(() => {
        this.closeModal.emit();
      });
    }
  }

  close() {
    this.closeModal.emit();
  }
}

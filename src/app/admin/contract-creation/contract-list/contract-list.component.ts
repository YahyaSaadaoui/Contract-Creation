import {Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {OnboardingMerchantComponent} from "../../merchant-management/onboarding-merchant/onboarding-merchant.component";
import {ModifyMerchantComponent} from "../../merchant-management/modify-merchant/modify-merchant.component";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../authentication/auth.service";

import {ModalService} from "../../merchant-management/modal.service";
import {ContractDTO} from "../../../dto/contract-dto";
import {RouterLink} from "@angular/router";
import {ContractService} from "../contract.service";
import jsPDF from 'jspdf';
import {HttpClient} from "@angular/common/http";
import {MerchantService} from "../../merchant-management/merchant.service";
import {AddressDTO} from "../../../dto/address-dto";
import {MerchantDTO} from "../../../dto/merchant-dto";
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [
    OnboardingMerchantComponent,
    ModifyMerchantComponent,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.css'
})
export class ContractListComponent implements OnInit {
  contract: ContractDTO[] = [];
  selectedContractId: number = 0;
  isAddModalOpen: boolean = false;
  username: string | null = null;
  role: string | null = null;
  userRole: string | null = null;
  pdfSrc: string | ArrayBuffer | null = null;
  @Input() isVisible = false;
  @Input() title = 'Confirm Deletion';
  @Input() message = 'Are you sure you want to proceed?';
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  constructor(
    private merchantService: MerchantService,
    private authService: AuthService,
    private contractService: ContractService,
    private modalService: ModalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadContracts();
    this.userRole = this.authService.getUserRole();
    this.username = this.authService.getUsernameFromToken();
    this.role = this.authService.getUserRolebrute();
  }

  selectContract(id: number): void {
    this.selectedContractId = id;
  }

  loadContracts() {
    this.contractService.getContracts().subscribe((data) => {
      this.contract = data;
    });
  }

  private getCurrentUser(): string {
    this.username = this.authService.getUsernameFromToken();
    return this.username ? this.username : '';
  }

  deselectContract(): void {
    this.selectedContractId = 0;
  }

  refreshContracts(): void {
    this.loadContracts();
    this.deselectContract();
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
  }

  deleteContract(id: number) {

      this.contractService.deleteContract(id).subscribe(() => {
        this.loadContracts();
      });
      this.isVisible = false;
  }
  showConfirmationModal() {
    this.isVisible = true;
  }
  cancel() {
    this.isVisible = false;
  }

  ViewContractPDF(contractID: number) {
    this.selectedContractId = contractID;

    this.contractService.getContract(this.selectedContractId).subscribe((contract: ContractDTO) => {
      if (!contract) {
        alert('Contract not found');
        return;
      }

      this.merchantService.getMerchantByNumber(contract.merchantNumber).subscribe((merchant: MerchantDTO) => {
        if (!merchant) {
          alert('Merchant not found');
          return;
        }
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.setFont('times', 'bold');
        doc.text('CONTRACT AGREEMENT', 105, 40, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('times', 'normal');

        doc.text(`This Contract Agreement ("Agreement") is made and entered into as of ${this.formatDate(contract.contractStarts)} by and between:`, 10, 60);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text('1. CBS (Central Business Services)', 10, 80);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text('Address: Casablanca, Nershor', 10, 90);
        doc.text('Contact Person: yahyasaadaoui2019@gmail.com', 10, 100);
        doc.text('Phone: 0606060606', 10, 110);
        doc.text('Email: cash.business.solotion@cbs.com', 10, 120);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text(`2. ${merchant.merchantName}`, 10, 140);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text(`Address: ${this.formatAddress(merchant.addresses)}`, 10, 150);
        doc.text(`Phone: ${merchant.bankAccountDetails}`, 10, 160);
        doc.text(`Tax Rate: ${merchant.taxRate}%`, 10, 170);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text('RECITALS', 10, 190);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text('CBS is engaged in [............]; and', 10, 200);
        doc.text('Merchant desires to engage CBS for Transaction Monitoring and management and Smartboxes Management; and', 10, 210);
        doc.text('CBS agrees to provide such services under the terms and conditions set forth herein.', 10, 220);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text('AGREEMENT TERMS', 10, 240);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text('1. Term and Termination', 10, 250);
        doc.text('The contract will start on the Effective Date and will end on the date mentioned in the contract.', 10, 260);
        doc.text('2. Fees and Payment', 10, 270);
        doc.text(`Merchant agrees to pay the fees as per the agreed fee structure: ${contract.feeStructure}.`, 10, 280);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text('SIGNATURES', 10, 300);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text(`_________________________ CBS Representative\n ${this.username} \n `, 10, 320);

        // Save the PDF
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open PDF in a new window
        window.open(pdfUrl);
      });
    });
  }


  generateContractPDF(contractID: number) {
    this.selectedContractId = contractID;

    this.contractService.getContract(this.selectedContractId).subscribe((contract: ContractDTO) => {
      if (!contract) {
        alert('Contract not found');
        return;
      }

      this.merchantService.getMerchantByNumber(contract.merchantNumber).subscribe((merchant: MerchantDTO) => {
        if (!merchant) {
          alert('Merchant not found');
          return;
        }

        // Initialize jsPDF
        const doc = new jsPDF();

        // Add Logo

        // Add Content
        doc.setFontSize(22);
        doc.setFont('times', 'bold');
        doc.text('CONTRACT AGREEMENT', 105, 40, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('times', 'normal');

        doc.text(`This Contract Agreement ("Agreement") is made and entered into as of ${this.formatDate(contract.contractStarts)} by and between:`, 10, 60);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text('1. CBS (Central Business Services)', 10, 80);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text('Address: Casablanca, Nershor', 10, 90);
        doc.text('Contact Person: yahyasaadaoui2019@gmail.com', 10, 100);
        doc.text('Phone: 0606060606', 10, 110);
        doc.text('Email: cash.business.solotion@cbs.com', 10, 120);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text(`2. ${merchant.merchantName}`, 10, 140);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text(`Address: ${this.formatAddress(merchant.addresses)}`, 10, 150);
        doc.text(`Phone: ${merchant.bankAccountDetails}`, 10, 160);
        doc.text(`Tax Rate: ${merchant.taxRate}%`, 10, 170);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text('RECITALS', 10, 190);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text('CBS is engaged in [............]; and', 10, 200);
        doc.text('Merchant desires to engage CBS for Transaction Monitoring and management and Smartboxes Management; and', 10, 210);
        doc.text('CBS agrees to provide such services under the terms and conditions set forth herein.', 10, 220);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text('AGREEMENT TERMS', 10, 240);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text('1. Term and Termination', 10, 250);
        doc.text('The contract will start on the Effective Date and will end on the date mentioned in the contract.', 10, 260);
        doc.text('2. Fees and Payment', 10, 270);
        doc.text(`Merchant agrees to pay the fees as per the agreed fee structure: ${contract.feeStructure}.`, 10, 280);

        doc.setFontSize(14);
        doc.setFont('times', 'bold');
        doc.text('SIGNATURES', 10, 300);
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text(`_________________________ CBS Representative\n ${this.username} \n `, 10, 320);

        // Save the PDF
        doc.save(`Contract_${contractID}.pdf`);
      });
    });
  }
  formatDate(date?: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  formatAddress(addresses: AddressDTO[]): string {
    const primaryAddress = addresses.find(address => address.isPrimary);
    return primaryAddress ? `${primaryAddress.street}, ${primaryAddress.city}, ${primaryAddress.state}, ${primaryAddress.country}, ${primaryAddress.zipCode}` : '';
  }

}

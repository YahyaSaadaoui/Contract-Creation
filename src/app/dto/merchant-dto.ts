import {AddressDTO} from "./address-dto";
import {ActivityDTO} from "./activity-dto";

export interface MerchantDTO {
  id?: number; // Optional for new merchants
  merchantNumber: string;
  merchantName: string;
  status: string;
  taxRate: number;
  accountBalance: number;
  contactInfo: string;
  bankAccountDetails: string;
  contractStatus: string;
  updatedAt?: Date;
  deletedAt?: Date;
  deletedBy?: Date;
  createdBy?: Date;
  updatedBy?: Date;
  settlementOption: string;
  feeStructure: string;
  addresses: AddressDTO[];
  activities: ActivityDTO[];
}

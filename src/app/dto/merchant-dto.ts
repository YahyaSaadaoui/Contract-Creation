import {AddressDTO} from "./address-dto";
import {ActivityDTO} from "./activity-dto";

export interface MerchantDTO {
  id?: number;
  merchantNumber: string;
  merchantName: string;
  status: string;
  taxRate: number;
  accountBalance: number;
  bankAccountDetails: string;
  contractStatus: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  deleted_by?: string;
  created_by?: string;
  updated_by?: string;
  settlementOption: string;
  feeStructure: string;
  addresses: AddressDTO[];
  activities: ActivityDTO[];
}

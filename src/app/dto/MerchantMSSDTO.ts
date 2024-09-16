import {AddressDTO} from "./address-dto";
import {ActivityDTO} from "./activity-dto";

export interface MSSDTO {
  id?: number;
  merchantName: string;
  merchantNumber: string;
  status: string;
  taxRate: number;
  bankAccountDetails: string;
  contractStatus: string;
  accountBalance: number;
  updated_at?: Date;
  updated_by: string;
  addresses: AddressDTO[];
  activities: ActivityDTO[];
}

export interface ContractDTO {
  contractID: number;
  merchantNumber: string;
  merchantDDA: string;
  contractStarts?: Date;
  contractEnds?: Date;
  settlementOption: string;
  feeStructure: string;
}

export interface ContractDTO {
  merchantId: number;
  contractId?: number; // Optional for new contracts
  merchantDDA: string;
  contractStarts: Date;
  contractEnds: Date;
  settlementOption: string;
  feeStructure: string;
}

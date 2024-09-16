import {FeePercentageDTO} from "./FeePercentageDTO";
import {CurrencyDTO} from "./CurrencyDTO";
import {FeeTypeDTO} from "./FeeTypeDTO";
import {SettlementTypeDTO} from "./SettlementTypeDTO";
import {CdfTypesDTO} from "./CdfTypesDTO";


export interface SettingsDTO {
  id: number;
  feePercentages: FeePercentageDTO[];
  currencies: CurrencyDTO[];
  feeTypes: FeeTypeDTO[];
  settlementTypes: SettlementTypeDTO[];
  cdfTypes: CdfTypesDTO[];
}

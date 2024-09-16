import {HttpClient} from "@angular/common/http";
import {ContractDTO} from "../../dto/contract-dto";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  private gatway = 'http://localhost:8083/api/merchants/onboarding';

  constructor(private http: HttpClient) { }

  createContract(contract: ContractDTO): Observable<ContractDTO> {
    return this.http.post<ContractDTO>(`${this.gatway}/contracts`, contract);
  }

  getContracts(): Observable<ContractDTO[]> {
    return this.http.get<ContractDTO[]>(`${this.gatway}/allContracts`);
  }

  getMerchantNumbers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.gatway}/merchantNumbers`);
  }
  getContract(id: number): Observable<ContractDTO> {
    return this.http.get<ContractDTO>(`${this.gatway}/contract/${id}`);
  }

  updateContract(id: number, contract: ContractDTO): Observable<ContractDTO> {
    return this.http.put<ContractDTO>(`${this.gatway}/contractUpdated/${id}`, contract);
  }

  deleteContract(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.gatway}/contracts/${id}`);
  }
}

import {HttpClient} from "@angular/common/http";
import {ContractDTO} from "../../dto/contract-dto";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  private apiUrl = 'http://localhost:8083/api/merchants/onboarding';
  constructor(private http: HttpClient) { }

  createContract(contract: ContractDTO): Observable<ContractDTO> {
    return this.http.post<ContractDTO>(`${this.apiUrl}/contracts`, contract);
  }

  getContracts(): Observable<ContractDTO[]> {
    return this.http.get<ContractDTO[]>(`${this.apiUrl}/allContracts`); // Assuming an endpoint to get all contracts
  }

  getContract(id: number): Observable<ContractDTO> {
    return this.http.get<ContractDTO>(`${this.apiUrl}/contracts/${id}`);
  }

  updateContract(id: number, contract: ContractDTO): Observable<ContractDTO> {
    return this.http.put<ContractDTO>(`${this.apiUrl}/contracts/${id}`, contract);
  }

  deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contracts/${id}`);
  }
}

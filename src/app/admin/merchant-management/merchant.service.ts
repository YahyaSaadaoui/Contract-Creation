import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MerchantDTO} from "../../dto/merchant-dto";


@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private apiUrl = 'http://localhost:8083/api/merchants/onboarding';

  constructor(private http: HttpClient) {
  }


  createMerchant(merchant: MerchantDTO): Observable<MerchantDTO> {
    return this.http.post<MerchantDTO>(`${this.apiUrl}/merchants`, merchant);
  }

  getMerchants(): Observable<MerchantDTO[]> {
    return this.http.get<MerchantDTO[]>(`${this.apiUrl}/allMerchants`);
  }

  getMerchant(id: number): Observable<MerchantDTO> {
    return this.http.get<MerchantDTO>(`${this.apiUrl}/merchants/${id}`);
  }

  updateMerchant(id: number, merchant: MerchantDTO): Observable<MerchantDTO> {
    return this.http.put<MerchantDTO>(`${this.apiUrl}/merchants/${id}`, merchant);
  }

  deleteMerchant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/merchants/${id}`);
  }
}

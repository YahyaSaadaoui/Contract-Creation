import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { MSSDTO } from '../../dto/MerchantMSSDTO';
import {catchError, map} from "rxjs/operators";
import {strings} from "@material/dialog/constants";
import {MerchantDTO} from "../../dto/merchant-dto";

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private gatwayToMOB = 'http://localhost:8083/api/merchants/onboarding';
  private gatewayToMSS = 'http://localhost:8084/api/merchants/servicing';

  constructor(private http: HttpClient) {}

  createMerchant(merchant: MerchantDTO): Observable<MerchantDTO> {
    return this.http.post<MerchantDTO>(`${this.gatwayToMOB}/merchants`, merchant);
  }

  getMerchants(): Observable<MerchantDTO[]> {
    return this.http.get<MerchantDTO[]>(`${this.gatwayToMOB}/allMerchants`);
  }
  updateMerchant(id: number | undefined, merchant: MSSDTO): Observable<MSSDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.put<MSSDTO>(`${this.gatewayToMSS}/merchantUpdatedMMS/${id}`, merchant, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getLast7DaysMerchantData(): Observable<number[]> {
    return this.http.get<MerchantDTO[]>(`${this.gatwayToMOB}/allMerchants`)
      .pipe(
        map(merchants => {
          const last7Days = new Array(7).fill(0);
          const today = new Date();
          merchants.forEach(merchant => {
            if (merchant.created_at) {
              const createdDate = new Date(merchant.created_at);
              const dayDiff = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));
              if (dayDiff < 7) {
                last7Days[6 - dayDiff]++;
              }
            }
          });
          return last7Days;
        })
      );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  deleteMerchant(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.gatwayToMOB}/merchants/${id}`);
  }

  getMerchantById(id: number , merchant : MerchantDTO): Observable<MerchantDTO> {
    return this.http.post<MerchantDTO>(`${this.gatwayToMOB}/${id}`, merchant);
  }

  getMerchantMapperToMSS(id: number | undefined): Observable<MSSDTO> {
    return this.http.get<MerchantDTO>(`${this.gatwayToMOB}/${id}`)
      .pipe(
        map((merchant: MerchantDTO) => {
          return this.mapToMSSDTO(merchant);
        })
      );
  }

  getMerchantByNumber(merchantNumber: string): Observable<MerchantDTO> {
    return this.http.get<MerchantDTO>(`${this.gatwayToMOB}/merchant/${merchantNumber}`);
  }
  private mapToMSSDTO(merchant: MerchantDTO): {
    taxRate: number;
    merchantNumber: string;
    addresses: {
      country: string;
      zipCode: string;
      phoneNumber: string;
      city: string;
      street: string;
      isPrimary: boolean;
      faxNumber: string;
      state: string;
      email: string
    }[];
    bankAccountDetails: string;
    contractStatus: string;
    updated_at: Date | undefined;
    activities: { activityId: number | undefined; activityName: string }[];
    updated_by: string;
    id: number | undefined;
    accountBalance: number;
    merchantName: string;
    status: string
  } {
    return {
      id: merchant.id,
      merchantName: merchant.merchantName,
      merchantNumber:merchant.merchantNumber,
      status: merchant.status,
      taxRate: merchant.taxRate,
      accountBalance: merchant.accountBalance,
      bankAccountDetails: merchant.bankAccountDetails,
      contractStatus: merchant.contractStatus,
      updated_at: merchant.updated_at,
      updated_by: merchant.updated_by ?? '',
      addresses: merchant.addresses.map(address => ({
        street: address.street,
        isPrimary: address.isPrimary,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
        email: address.email,
        phoneNumber: address.phoneNumber,
        faxNumber: address.faxNumber
      })),
      activities: merchant.activities.map(activity => ({
        activityId: activity.activityId,
        activityName: activity.activityName,
      }))
    };
  }
}

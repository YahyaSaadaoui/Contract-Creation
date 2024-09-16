import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MerchantDTO} from "../../../dto/merchant-dto";
import {Observable} from "rxjs";
import {userDTO} from "../../../dto/useDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private MOBapiUrl = 'http://localhost:8082/api/user';

  constructor(private http: HttpClient) {}

  createuser(user: userDTO): Observable<userDTO> {
    return this.http.post<userDTO>(`${this.MOBapiUrl}/`, user);
  }
  uploadProfilePicture(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.MOBapiUrl}/${userId}/upload-profile-picture`, formData, { responseType: 'text' });
  }
}

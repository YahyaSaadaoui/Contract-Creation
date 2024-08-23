import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openAddMerchantModalSubject = new Subject<void>();
  public openAddMerchantModal$ = this.openAddMerchantModalSubject.asObservable();

  openAddMerchantModal() {
    this.openAddMerchantModalSubject.next();
  }
}

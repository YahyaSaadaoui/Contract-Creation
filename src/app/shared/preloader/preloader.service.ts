import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private showPreloaderSubject = new BehaviorSubject<boolean>(true); // Initially show
  showPreloader$ = this.showPreloaderSubject.asObservable();

  setLoading(isLoading: boolean) {
    this.showPreloaderSubject.next(isLoading);
  }
}

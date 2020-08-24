import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  constructor() { }

  private valueData: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private value : BehaviorSubject<any> = new BehaviorSubject<any>('');
  valueToast: Observable<any> = this.value.asObservable();
  valueFromSearch: Observable<any> = this.valueData.asObservable();

  sendValue(data: any) {
    this.valueData.next(data);
  }

  sendToastr(data: any) {
    this.value.next(data);
  }
}

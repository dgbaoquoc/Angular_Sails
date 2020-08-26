import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  constructor() { }

  private valueData: BehaviorSubject<any> = new BehaviorSubject<any>('');
  valueFromSearch$: Observable<any> = this.valueData.asObservable();

  sendValue(data: any) {
    this.valueData.next(data);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SendDataService {


  constructor() { }

  private valueData: BehaviorSubject<any> = new BehaviorSubject<any>("");
  valueFromSearch$: Observable<any> = this.valueData.asObservable();

  private value: BehaviorSubject<any> = new BehaviorSubject<any>("");
  valueFrom: Observable<any> = this.value.asObservable();

  private valueUser: BehaviorSubject<any> = new BehaviorSubject<any>("");
  valueFromUser: Observable<any> = this.valueUser.asObservable();

  sendValue(data: any) {
    this.valueData.next(data);
  }

  sendDataArticle(data: any) {
    this.value.next(data);
  }

  sendDataUser(data: any) {
    this.valueUser.next(data);
  }


}

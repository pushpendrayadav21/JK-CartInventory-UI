import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient:HttpClient) { }

  placeOrder(purchase:Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(AppSettings.PURCHASE_URL,purchase);
  }
}

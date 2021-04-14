import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { OrderDetails } from '../common/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private httpClient:HttpClient) { }

  public getOrderDetails():Observable<GetOrderDetailsResponse>{
    return this.httpClient.get<GetOrderDetailsResponse>(AppSettings.ORDER_DETAILS_URL);
  }
}
interface GetOrderDetailsResponse{
  _embedded:{
    orders: OrderDetails[];
  }
}

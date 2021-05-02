import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { Customer } from '../common/customer';
import { OrderDetails } from '../common/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private httpClient:HttpClient) { }

  public getOrderDetails():Observable<GetOrderDetailsResponse>{
    return this.httpClient.get<GetOrderDetailsResponse>(AppSettings.ORDER_DETAILS_URL);
  }

  public getCustumerDetails(orderId:number):Observable<Customer>{
    return this.httpClient.get<Customer>(`${AppSettings.ORDER_DETAILS_URL}/${orderId}/customer`);
  }
}
interface GetOrderDetailsResponse{
  _embedded:{
    orders: OrderDetails[];
  }
}

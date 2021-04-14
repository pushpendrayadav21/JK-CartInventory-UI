import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/common/order-details';
import { OrderDetailsService } from 'src/app/service/order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private orderDetailsService:OrderDetailsService) { }
  orderDetailsList: OrderDetails[] = [];
  ngOnInit(): void {
    this.getOrderDetails();
  }

  public getOrderDetails(){
    this.orderDetailsService.getOrderDetails().subscribe(
      data => {
        this.orderDetailsList = data._embedded.orders;
        //console.log("Order Details: "+JSON.stringify(data));
        //console.log("Order Details: "+JSON.stringify(this.orderDetailsList));
        for(let order of this.orderDetailsList){
          console.log(order.orderTrackingNumber);
        }
      }
    )
  }

}

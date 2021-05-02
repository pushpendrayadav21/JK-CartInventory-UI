import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { Customer } from 'src/app/common/customer';
import { OrderDetails } from 'src/app/common/order-details';
import { OrderDetailsService } from 'src/app/service/order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private orderDetailsService:OrderDetailsService,private router:Router) { }
  orderDetailsList: OrderDetails[] = [];
  customer:Customer = new Customer();
  
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
          this.getCustumerDetails(Number(order.id));
          this.customer.firstName = order.firstName;
          
        }
      },
      err=>{
        console.log('Erro status: '+err.status);
        if(err.status == 403){
          this.router.navigateByUrl('/login-user');
        }
        
      }
    )
  }

  public getCustumerDetails(orderId:number){
    this.orderDetailsService.getCustumerDetails(orderId).subscribe(
      data =>{
        console.log(data);
        
      
      }
    )
  }

}

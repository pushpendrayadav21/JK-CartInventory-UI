import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item/cart-item.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[] = [];
  totalPrice:number = 0.0;
  totalQuantity:number = 0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    // get the cart item
    this.cartItems = this.cartService.cartItems;

    //subscribe to total price
    this.cartService.totalPrice.subscribe(
      data => {this.totalPrice = data}
    );

    //subscribe to total quantity
    this.cartService.totalQuantity.subscribe(
      data =>{
        this.totalQuantity = data;
      }
    );
    // compute total price and quantity

    this.cartService.computeCartTotal();
  }

}

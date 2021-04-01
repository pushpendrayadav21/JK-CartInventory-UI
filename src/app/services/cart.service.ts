import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item/cart-item.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(theCartItems: CartItem) {
    // check if item already exists in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      // for (let tempCartItem of this.cartItems) {
      //   if (theCartItems.id == tempCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItems.id);
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(theCartItems);
    }

    this.computeCartTotal();
  }

  computeCartTotal() {
    let totalPriceValue:number = 0;
    let totalQuantityValue:number = 0;
    for(let currentItems of this.cartItems){
      totalPriceValue += currentItems.quantity*currentItems.unitPrice;
      totalQuantityValue += currentItems.quantity; 
    }
    // publish the new values.. all subscriber will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue,totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    // console.log(`Total Quantity: ${totalQuantityValue} Total Price: ${totalPriceValue}`);
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, 
      unitPrice: ${tempCartItem.unitPrice}, Subtotal: ${subTotalPrice} `); 
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('-------------------')
  }
}

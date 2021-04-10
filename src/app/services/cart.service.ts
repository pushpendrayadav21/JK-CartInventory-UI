import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item/cart-item.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  
  //storage:Storage = sessionStorage;
  storage:Storage = localStorage;
  
  constructor() { 
    // read the data from storage
    let data = JSON.parse(this.storage.getItem('cartItems'));
    if(data != null){
      this.cartItems = data;
    }
    //compute the totals based on the data that is read from the storage
    this.computeCartTotal();
  }

  addToCart(theCartItems: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    if (this.cartItems.length > 0) {
      // check if item already exists in cart
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItems.id);
      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if(alreadyExistsInCart) {
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
    
    // persist the cart data;
    this.persistCartItems();
  }

  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
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

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotal();
    }
  }

  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );
    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotal();
    }
  }
}

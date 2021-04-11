import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ItValleyFormService } from 'src/app/services/it-valley-form.service';
import { ITValleyValidators } from 'src/app/validators/itvalley-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  countries:Country[] = [];
  states:State[] = [];
  creditCardYears:number[] = [];
  creditCardMonths:number[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  checkoutFormGroup:FormGroup; 
  shippingAddressStates:State[] = [];
  billingAddressStates: State[] =[];

  constructor(private formBuilder:FormBuilder,private formService:ItValleyFormService,
              private cartService:CartService,private checkoutService:CheckoutService,
              private router:Router) { }

  ngOnInit(): void {
    this.reviewCartDetails();
    this.getCountryList();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName : new FormControl('',[Validators.required,Validators.minLength(2),ITValleyValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2),ITValleyValidators.notOnlyWhiteSpace]),
        email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        mobile: new FormControl('',[Validators.required,Validators.required,Validators.pattern('[0-9]{10}')]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),
                                   ITValleyValidators.notOnlyWhiteSpace]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),
                                  ITValleyValidators.notOnlyWhiteSpace]),
        state:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required,Validators.minLength(2),
                                    ITValleyValidators.notOnlyWhiteSpace]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),
                                    ITValleyValidators.notOnlyWhiteSpace]),
         city: new FormControl('',[Validators.required,Validators.minLength(2),
                                  ITValleyValidators.notOnlyWhiteSpace]),
         state:new FormControl('',[Validators.required]),
         country:new FormControl('',[Validators.required]),
         zipCode:new FormControl('',[Validators.required,Validators.minLength(2),
                                    ITValleyValidators.notOnlyWhiteSpace]),
      }),
      creditCard: this.formBuilder.group(
        {
          cardType: new FormControl('',[Validators.required]),
          nameOnCard:new FormControl('',[Validators.required,Validators.minLength(2),
            ITValleyValidators.notOnlyWhiteSpace]),
          cardNumber:new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
          securityCode:new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
          expirationMonth:[''],
          expirationYear:['']
        }
      )
    });
    // populate credit card months
    const startMonth:number = new Date().getMonth()+1;
    console.log('startMonth: '+startMonth);
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        console.log("Retrieved credit card months: "+JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
    // populate credit card year
    this.formService.getCreditCardYears().subscribe(
      data =>{
        console.log(JSON.stringify(data));
        this.creditCardYears = data;
      }
    )
  }
  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(
      data =>{
        this.totalPrice = data;
      }
    );
    this.cartService.totalQuantity.subscribe(
      data =>{
        this.totalQuantity = data;
      }
    );
  }

  onSubmit(){
    console.log('handeling form submission')
    if(this.checkoutFormGroup.invalid){
        this.checkoutFormGroup.markAllAsTouched();
        return;
    }
    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart item
    const cartItems = this.cartService.cartItems;

    // create orderitem from cart  items
    // - long way
    // let orderItems:OrderItem[] = [];
    // for(let i = 0; i<cartItems.length; i++){
    //   orderItems[i] = new OrderItem(cartItems[i]);
    // }


    // short way
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    //setup purchase
    let purchase = new Purchase();

    //populate purchase-customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //populate shippingAddress

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState:State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry:State = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate billing address

    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState:State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry:Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase order and order items
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call the Rest API via checkout service

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next:response =>{
          alert(`your order has been received.\nOrder Tracking number is ${response.trackingOrderNumber}`);
          // reset the cart
          this.resetCart();
        },
        error:error =>{
          alert(`There was an error: ${error.message}`);
        }
      }
    )

  }
  resetCart() {
    // reset the cartItems
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    
    // reset the form
    this.checkoutFormGroup.reset();

    //navigate back to the product page
    this.router.navigateByUrl("/products");

  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
        this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
        this.billingAddressStates = this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }

  }
  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear:number = new Date().getFullYear();
    const sselectedYear:number = Number(creditCardFormGroup.value.expirationYear);
    //if the current year is equal to selected year then start with the current month
    let startMonth:number;
    if(currentYear == sselectedYear){
      startMonth = new Date().getMonth()+1;
  }
  else{
    startMonth = 1;
  }
  this.formService.getCreditCardMonths(startMonth).subscribe(
    data => {this.creditCardMonths = data}
  )
}

getCountryList(){
  this.formService.getCountries().subscribe(
    data => {
      console.log("country List: "+data)
      this.countries = data
    }
  );
}

get firstName(){
  return this.checkoutFormGroup.get('customer.firstName');
}

get lastName(){
  return this.checkoutFormGroup.get('customer.lastName');
}

get email(){
  return this.checkoutFormGroup.get('customer.email');
}

get mobile(){
  return this.checkoutFormGroup.get('customer.mobile');
}

get shippingAddressStreet(){
  return this.checkoutFormGroup.get('shippingAddress.street');
}
get shippingAddressCity(){
  return this.checkoutFormGroup.get('shippingAddress.city');
}
get shippingAddressState(){
  return this.checkoutFormGroup.get('shippingAddress.state');
}
get shippingAddressZipCode(){
  return this.checkoutFormGroup.get('shippingAddress.zipCode');
}
get shippingAddressCountry(){
  return this.checkoutFormGroup.get('shippingAddress.country');
}

// getter for billing address

get billingAddressStreet(){
  return this.checkoutFormGroup.get('billingAddress.street');
}
get billingAddressCity(){
  return this.checkoutFormGroup.get('billingAddress.city');
}
get billingAddressState(){
  return this.checkoutFormGroup.get('billingAddress.state');
}
get billingAddressZipCode(){
  return this.checkoutFormGroup.get('billingAddress.zipCode');
}
get billingAddressCountry(){
  return this.checkoutFormGroup.get('billingAddress.country');
}

// credit card
get creditCardType(){
  return this.checkoutFormGroup.get('creditCard.cardType');
}

get creditCardNameOnCard(){
  return this.checkoutFormGroup.get('creditCard.nameOnCard');
}

get creditCardNumber(){
  return this.checkoutFormGroup.get('creditCard.cardNumber');
}

get creditCardSecurityCode(){
  return this.checkoutFormGroup.get('creditCard.securityCode');
}

getStates(formGroupName:string  ){
  console.log('in get states')
  const formGroup = this.checkoutFormGroup.get(formGroupName);
  const countryCode = formGroup.value.country.code;
  this.formService.getStatesByCountryCode(countryCode).subscribe(
    data =>{
      console.log(`states: ${data}`)
      if(formGroupName == 'shippingAddress'){
        this.shippingAddressStates = data;
      }
      else{
        this.billingAddressStates = data;
      }
      formGroup.get('state').setValue(data[0]);
    }
  )
}

}

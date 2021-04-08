import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
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

  constructor(private formBuilder:FormBuilder,private formService:ItValleyFormService) { }

  ngOnInit(): void {
    
    this.getCountryList();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName : new FormControl('',[Validators.required,Validators.minLength(2),ITValleyValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2),ITValleyValidators.notOnlyWhiteSpace]),
        email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
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
          cardType:[''],
          nameOnCard:[''],
          cardNumber:[''],
          securityCode:[''],
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

  onSubmit(){
    console.log('handeling form submission')
    if(this.checkoutFormGroup.invalid){
        this.checkoutFormGroup.markAllAsTouched();
    }
    console.log('<onSubmit');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { ItValleyFormService } from 'src/app/services/it-valley-form.service';

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
        firstName :[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
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
    console.log(this.checkoutFormGroup.get('customer').value);
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

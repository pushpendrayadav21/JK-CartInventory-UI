import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSettings } from '../app-settings';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ItValleyFormService {

  constructor(private htttpClient:HttpClient) { }
  getCreditCardMonths(startMonth:number):Observable<number[]>{
    let data:number[] = [];
    // build an array for "Month" drop down list
    for(let theMonth = startMonth; theMonth<=12; theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears():Observable<number[]>{
    let data:number[] = [];
    const startYear:number = new Date().getFullYear();
    const endYear:number = startYear+10;
    for(let theYear =startYear; theYear <=endYear; theYear++){
      data.push(theYear);
    }
    return of(data);
  }

  getCountries():Observable<Country[]>{
    return this.htttpClient.get<Country[]>(AppSettings.COUNTRIES_URL)
  }

  getStatesByCountryCode(code:string):Observable<State[]>{
    const searchUrl = `${AppSettings.STATESBYCOUNTRYCODE_URL}?code=${code}`;
    return this.htttpClient.get<State[]>(searchUrl);

  }
}

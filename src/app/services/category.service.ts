import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategoryModel } from '../common/product-category-model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private categoryUrl = "http://localhost:2244/api/jk-cart-inventory/product-category";
  constructor(private httpClient: HttpClient) { }

  addCategory(category: ProductCategoryModel):Observable<any> {
    console.log("in CategoryService.addCategory");
    console.log("Category: " + JSON.stringify(category));
    return this.httpClient.post<any>(this.categoryUrl, category)
  }

}

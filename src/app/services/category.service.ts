import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { ProductCategoryModel } from '../common/product-category-model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private categoryUrl = "http://localhost:2245/api/jk-cart-inventory/product-category";
  constructor(private httpClient: HttpClient) { }

  // addCategory(category: ProductCategoryModel): Observable<any> {
  //   console.log("in CategoryService.addCategory");
  //   console.log("Category: " + JSON.stringify(category));
  //   var response = this.httpClient.post<any>(this.categoryUrl, category)
  //   console.log(`response from addCategory: ${JSON.stringify(response)}`);
  //   return response;
  // }

  addCategory(category: ProductCategoryModel): Observable<AddCategoryResponse> {
    
    return this.httpClient.post<AddCategoryResponse>(this.categoryUrl, category).pipe(
      map( response => response)
    )
    
  }
  

  getProductCategoriesPaginate(thePage: number, thePageSize: number): Observable<GetResponseProductCategory> {
    const searchUrl = `${this.categoryUrl}?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response.content)
    );
  }

  deleteProductCategory(categoryId: number): Observable<any> {
    return this.httpClient.delete(`${this.categoryUrl}/${categoryId}`)
  }

  getProductCategoryById(id: number): Observable<ProductCategory> {
    return this.httpClient.get<GetResponseProductCategory>(`${this.categoryUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  updateCategory(category: ProductCategory, id: number): Observable<any> {
    return this.httpClient.put(`${this.categoryUrl}/${id}`, category)
  }

  searchCategory(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProductCategory> {
    console.log('> searchCategory')
    const searchUrl = `${this.categoryUrl}/search/findByName?page=${thePage}&size=${thePageSize}&name=${theKeyword}`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl);
  }
}

interface GetResponseProductCategory {
  content: ProductCategory[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  data: ProductCategory;
}

interface AddCategoryResponse{
   successMessage:string;
   failureMessage:string;
}

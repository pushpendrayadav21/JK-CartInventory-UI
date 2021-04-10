import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private httpClient: HttpClient) { }

  getProductsPaginate(thePage: number, thePageSize: number): Observable<any> {
    console.log('> getProductsPaginate')
    const searchUrl = `${AppSettings.PRODUCT_API_BASE_URL}?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<any>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetProductCategoryResponse>(AppSettings.PRODUCTCATEGORY_API_BASE_URL).pipe(
      map(response => response.dataList)
    );
  }

  searchProduct(thePage: number, thePageSize: number, theKeyword: string): Observable<any> {
    console.log('> searchProduct')
    const searchUrl = `${AppSettings.PRODUCT_API_BASE_URL}/searchByNameContaining?page=${thePage}&size=${thePageSize}&name=${theKeyword}`;
    return this.httpClient.get<any>(searchUrl);
  }

  saveProduct(product: Product):Observable<any> {
    return this.httpClient.post(AppSettings.PRODUCT_API_BASE_URL,product);
  }

  getProductById(id:number):Observable<Product>{
    console.log(`${AppSettings.PRODUCT_API_BASE_URL}/${id}`);
    return this.httpClient.get<GetResponseProduct>(`${AppSettings.PRODUCT_API_BASE_URL}/${id}`).pipe(
      map(response => response.data));
  }

  updateProduct(product: Product,id:string):Observable<any> {
    return this.httpClient.put<any>(`${AppSettings.PRODUCT_API_BASE_URL}/${id}`,product)
  }

  deleteProduct(id: number):Observable<any> {
    return this.httpClient.delete(`${AppSettings.PRODUCT_API_BASE_URL}/${id}`)
  }
}

interface GetProductCategoryResponse {
  dataList: ProductCategory[];
}

interface GetResponseProduct {
  data: Product;
}

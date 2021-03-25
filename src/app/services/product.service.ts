import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = "http://localhost:2245/api/jk-cart-inventory/product";
  private categoryUrl = "http://localhost:2245/api/jk-cart-inventory/product-category"

  constructor(private httpClient: HttpClient) { }


  // getProductList(theCategoryId: number): Observable<Product[]> {

  //   // need to build URL based on category id 
  //   //const searchUrl = `${this.baseUrl}/searchProductByCategoryId?id=${theCategoryId}`;

  //   return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
  //     map(response => response.dataList)
  //   );
  // }

  getProductsPaginate(thePage: number, thePageSize: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response.dataList)
    );
  }

  searchProduct(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts> {
    console.log('> searchProduct')
    const searchUrl = `${this.baseUrl}/searchByNameContaining?page=${thePage}&size=${thePageSize}&name=${theKeyword}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  save(product: Product):Observable<any> {
    return this.httpClient.post(this.baseUrl,product);
  }

  getProductById(id:number):Observable<Product>{
    console.log(`${this.baseUrl}/${id}`);
    return this.httpClient.get<GetResponseProduct>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data));
  }

  updateProduct(product: Product,id:number):Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`,product)
  }

  deleteProduct(id: number):Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }
}



interface GetResponseProducts {
  dataList: Product[];
}

interface GetResponseProductCategory {
  dataList: ProductCategory[];
}

interface GetResponseProduct {
  data: Product;
}

import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item/cart-item.component';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  searchMode: boolean;
  products: Product[] = [];

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, 
              private route: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
        this.handleSearchProduct();
    }
    else {
      this.productService.getProductsPaginate(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult())
    }

  }
  handleSearchProduct() {
    console.log('in handleSearchProduct..')
    const theKeyword: string = this.activatedRoute.snapshot.paramMap.get('keyword')
    console.log('theKeyword: '+theKeyword)
    // now search for the product using keyword
    this.productService.searchProduct(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.products = data.content,
      this.thePageNumber = data.number + 1,
      this.thePageSize = data.size,
      this.theTotalElements = data.totalElements,
      console.log("The PageNumber: " + data.totalPages);
      console.log("The Total Elements: " + this.theTotalElements)

    }
  }
  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  deleteProduct(id:number){
    console.log('in delete product..'+id);
    var isConfirmed = confirm(`are you sure to delete this product?`)
    if(isConfirmed == true){
      this.productService.deleteProduct(id).subscribe(
        data =>{
          console.log(`product deleted..`);
          alert(`product deleted successfully!`);
          this.listProducts();
          this.route.navigateByUrl("/productList");
  
        },
        error =>{
          console.log(`error while deleting the product`);
          this.route.navigateByUrl('/productList');
        }
      )
    }
    else{
      alert(`you have canceled the deleted product operation..`)
      this.route.navigate(["/productList"]);
    }
    
  }

  addToCart(product:Product){
    const theCartItem = new CartItem(product);
    console.log(`Adding To cart Product Name: ${product.name} Product Price: ${product.unitPrice}`);
    this.cartService.addToCart(theCartItem);
  } 
}





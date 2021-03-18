import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    //check if id parameter is available
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // convert the given id string to number using '+' operator
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
      console.log("current category id: " + this.currentCategoryId);

    } else {
      // not category id available ...default to category id = 1
      this.currentCategoryId = 11;
    }
    // now get the category for the given categoryid

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data
      }
    )
  }

}

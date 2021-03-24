import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productId: number;
  category: ProductCategory;
  product: Product;
  productCategory: ProductCategory;
  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {

    this.product = new Product();
    //this.categoryService.
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId).subscribe(
      data => {
        this.product = data;
        console.log('Product Details: ' + JSON.stringify(data));
      }
    );

  }

  onSubmit() {
    console.log('in update onsubmit..');
    this.updateProduct();
  }

  updateProduct() {
    console.log(`request: ${JSON.stringify(this.product)}`)

    this.productService.updateProduct(this.product, this.product.id).subscribe(
      data => {
        alert(`Porduct updated successfully`);
      },
      error => {
        alert(`An eeror occured while trying to update the product..`)
      }
    )
  }
}

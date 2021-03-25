import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private productService: ProductService,
    private categoryService: CategoryService, private router: Router) { }

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
    var isConfirmed = confirm(`You are Submitting the below details for update \r\n Product Name: ${this.product.name}
    \r\n Manufacturer: ${this.product.brandName}
    \r\n Locatin to Store: ${this.product.itemStoredLocation}
    \r\n Product Description: ${this.product.description}
    \r\n Unit Price: ${this.product.unitPrice}
    \r\n No of Product: ${this.product.unitsInStock}`
    )
    if (isConfirmed == true) {
      this.productService.updateProduct(this.product, this.product.id).subscribe(
        data => {
          alert(`Porduct updated successfully`);
          this.router.navigateByUrl('/productList');
        },
        error => {
          alert(`An errror occured while trying to update the product..`)
        }
      )
    }
    else {
      alert(`You have canceled the update request`);
      this.router.navigateByUrl('/productList');
    }
  }

}

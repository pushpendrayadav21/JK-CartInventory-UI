import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private router: Router, private categoryService: CategoryService) { }

  categoryList: ProductCategory[] = [];
  ngOnInit(): void {
    this.getProductCategoryList();
  }

  onSubmit() {
    console.log(`${JSON.stringify(this.product)}`);
    this.saveProduct();
  }

  saveProduct() {
    let categoryId: number = this.getCategoryId(this.product.categoryName);
    console.log('categoryId: ' + categoryId);
    this.product.categoryId = categoryId;
    console.log(JSON.stringify(this.product))
    this.productService.save(this.product).subscribe(
       data =>{
         alert("product added successfully");
         this.router.navigateByUrl('/productList')
       }
    );
  }

  getProductCategoryList() {
    this.categoryService.getProductCategories().subscribe(
      data => {
        this.categoryList = data;
        console.log(data)
      }
    )
  }


  getCategoryId(categoryName: string): number {
    console.log('Category Name: ' + categoryName);
    let id: number;
    for (var tempCategory of this.categoryList) {

      if (categoryName == tempCategory.categoryName) {
        id = tempCategory.id;
        break;
      }
    }
    return id;
  }

}



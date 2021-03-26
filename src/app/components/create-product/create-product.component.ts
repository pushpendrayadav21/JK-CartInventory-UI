import { HttpClient } from '@angular/common/http';
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

  completeImagePath:string = 'assets/images/products';
  product: Product = new Product();
  selectedFile:File = null;

  constructor(private productService: ProductService, private router: Router, 
    private categoryService: CategoryService,private httpClient:HttpClient) { }

  categoryList: ProductCategory[] = [];
  ngOnInit(): void {
    this.getProductCategoryList();
  }

  onSubmit() {
    console.log(`${JSON.stringify(this.product)}`);
    this.saveProduct();
  }

  saveProduct() {
    this.product.imageUrl = this.completeImagePath;
    this.productService.save(this.product).subscribe(
      data => {
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

  onFileSelect(event){
    let imagePath:string = 'assets/images/products-image';
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    this.completeImagePath = `${imagePath}/${this.selectedFile,this.selectedFile.name}`;
    // fd.append('image',this.selectedFile,this.selectedFile.name)
    console.log(`in file seletct: `+this.completeImagePath)
    
    
  }
}



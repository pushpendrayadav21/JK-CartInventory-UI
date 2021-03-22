import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product:Product = new Product();
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(`${JSON.stringify(this.product)}`);
    this.saveProduct();
  }

  saveProduct(){
    this.product.isActive = true;
    this.product.categoryId = 11;
    this.productService.save(this.product).subscribe(
      data =>{
        alert("product added successfully");
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.css']
})
export class UpdateProductCategoryComponent implements OnInit {

  id: number;
  category: ProductCategory;

  constructor(private router: ActivatedRoute, private categoryService: CategoryService,private rout:Router) { }

  ngOnInit(): void {
    this.category = new ProductCategory();
    this.id = +this.router.snapshot.paramMap.get('id');
    this.categoryService.getProductCategoryById(this.id).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.category = data;
      },
      error => {
        console.log(error);
      }
    );

  }

  updateEmployee() {
    this.categoryService.updateCategory(this.category, this.id).subscribe(
      data =>{
        console.log(data);
        alert(`product category ${this.category.categoryName} updated successfully! `);
        this.rout.navigateByUrl('/categoryList');

      },
      error =>{
        console.log(error)
        alert("An error occured while trying to update product category: "+this.category.categoryName)
      }
      
    );
  }
  onSubmit() {
    this.updateEmployee();
    console.log('handling form data..');

  }
}

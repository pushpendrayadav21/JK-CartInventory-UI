import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryModel } from 'src/app/common/product-category-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  failureMessage:string;
  category:ProductCategoryModel = new ProductCategoryModel();
  submitted = false;
  ngOnInit(): void {
  
  }

  constructor(private categoryService: CategoryService,private router: Router) { }
  
  onSubmit() {
    this.submitted = true;
    this.save();    
  }
  save() {
    this.categoryService.addCategory(this.category).subscribe(
      data =>{
        alert(`${this.category.name} created successfully!`);
        this.router.navigateByUrl('/categoryList');
      },
      error=>{
        console.log("Http Status"+error.status)
        if(error.status == '409'){
          alert(`The category ${this.category.name} already exists please try with different name`);
          this.router.navigateByUrl('/categoryList');
        }
        else if(error.status == '406'){
          alert(`Category Name is a required field`);
          this.router.navigateByUrl('/categoryList');
        }
        else{
          alert(`An error occurred while trying to create a category`);
          this.router.navigateByUrl('/categoryList');
        }
        
      }
    );
  }
}

  // resetProductCategory() {
  //   // reset the form
  //   this.categoryFormGroup.reset();
  //   // navigate back to the products page
  //   this.router.navigateByUrl("/categoryList");

  // }

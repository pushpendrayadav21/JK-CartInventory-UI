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
        console.log(data);
        alert(`${this.category.name} created successfully!`);
        this.router.navigateByUrl('/categoryList');
      },
      error=>{
        alert(`An error occured while tryinng to create an category`);
        this.router.navigateByUrl('/categoryList');
      }
    )
  }
 
  }

  // resetProductCategory() {
  //   // reset the form
  //   this.categoryFormGroup.reset();
  //   // navigate back to the products page
  //   this.router.navigateByUrl("/categoryList");

  // }

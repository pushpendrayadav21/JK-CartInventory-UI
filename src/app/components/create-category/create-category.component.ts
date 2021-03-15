import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategoryModel } from 'src/app/common/product-category-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryFormGroup: FormGroup;
  
  constructor(private formBuilder:FormBuilder,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryFormGroup = this.formBuilder.group({
      category: this.formBuilder.group({
        categoryName: new FormControl('', [])
        
      })
    });
  }

  onSubmit(){
    let category  = new ProductCategoryModel();  
    console.log("Handaling form data");
    const categoryName = this.categoryFormGroup.controls['category'].get('categoryName').value;
    console.log("in coming CategoryName: "+categoryName);
    category.name = categoryName;
    console.log("product category model"+category.name);
    this.categoryService.addCategory(category).subscribe({
      next: response => {
        alert(`Category ${category.name} has been created successfully !`);
        this.resetProductCategory();
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
    );
  }

  resetProductCategory() {
    // reset the form
    this.categoryFormGroup.reset();
  }
}
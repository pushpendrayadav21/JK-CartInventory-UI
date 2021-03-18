import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productcategoryList: ProductCategory[] = [];
  searchMode: boolean

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private productCategoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProductCategory();
    });
    console.log("Total Elements:" + this.theTotalElements);
  }

  listProductCategory() {
    console.log("in list product category");
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      console.log('in serch mode..')
      this.handleSearchProduct();
    }
    else {
      this.handleListProductCategory();
    }

  }

  handleSearchProduct() {
    console.log('in handleSearchProduct..')
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')
    // now search for the product category using keyword
    this.productCategoryService.searchCategory(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(this.processResult());
  }
  processResult() {
    return data => {
      this.productcategoryList = data.content,
        this.thePageNumber = data.number + 1,
        this.thePageSize = data.size,
        this.theTotalElements = data.totalElements,
        console.log('productcategoryList: ' + this.productcategoryList)
      console.log("The PageNumber: " + data.totalPages);
      console.log("The Total Elements: " + this.theTotalElements)

    }
  }
  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProductCategory();
  }

  deleteProductCategory(categoryId: number) {

    var retVal = confirm("Do you want to delete this category: ?");
    if (retVal == true) {
      this.productCategoryService.deleteProductCategory(categoryId).subscribe(
        data => {
          console.log(data);
          alert('category deleted successfully');
          this.listProductCategory();
          this.router.navigateByUrl("/categoryList");
        });

    }
    else {
      this.listProductCategory();
      this.router.navigateByUrl("/categoryList");
    }

  }

  handleListProductCategory() {
    this.productCategoryService.getProductCategoriesPaginate(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }
}

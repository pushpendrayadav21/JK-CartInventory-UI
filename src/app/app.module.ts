import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProductCategoryComponent } from './components/update-product-category/update-product-category.component';
import { SearchCategryComponent } from './components/search-categry/search-categry.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
const routes: Routes = [
  { path: 'category/:id', component: ProductListComponent },
  { path: 'searchByCategory/:keyword', component: ProductCategoryListComponent },
  { path: 'searchByProduct/:keyword', component: ProductListComponent },
  { path: 'categoryList', component: ProductCategoryListComponent },
  { path: 'updateCategory/:id', component: UpdateProductCategoryComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'addCategory', component: CreateCategoryComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    CreateCategoryComponent,
    ProductCategoryListComponent,
    UpdateProductCategoryComponent,
    SearchCategryComponent,
    SearchProductComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

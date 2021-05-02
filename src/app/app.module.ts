import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProductCategoryComponent } from './components/update-product-category/update-product-category.component';
import { SearchCategryComponent } from './components/search-categry/search-categry.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login-user/login.component';
import { RegisterComponent } from './register-users/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserComponent } from './user/user.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './all-service/notification.service';
import { AuthenticationService } from './all-service/authentication.service';
import { UserService } from './all-service/user.service';
import { DashboardService } from './all-service/dashboard.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  { path: 'login-user', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changepassword', component: ResetPasswordComponent },
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/login-user', pathMatch: 'full' },
  { path: 'order-details', component: OrderDetailsComponent},
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'searchByCategory/:keyword', component: ProductCategoryListComponent },
  { path: 'searchByProduct/:keyword', component: ProductListComponent },
  { path: 'categoryList', component: ProductCategoryListComponent },
  { path: 'updateCategory/:id', component: UpdateProductCategoryComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'addCategory', component: CreateCategoryComponent },
  { path: 'updateProduct/:id', component: UpdateProductComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'viewProduct/:id', component: ViewProductComponent },
  { path: 'addProduct', component: CreateProductComponent },
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
    SearchProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ViewProductComponent,
    CartStatusComponent,
    CartDetailsComponent,
    LeftMenuComponent,
    CheckoutComponent,
    OrderDetailsComponent,
    LoginComponent,
    UserComponent,
    ResetPasswordComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    NotificationModule
  ],
  providers: [ProductService,NotificationService, AuthenticationGuard, AuthenticationService, UserService, DashboardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

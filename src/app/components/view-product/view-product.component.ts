import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item/cart-item.component';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private cartService:CartService) { }

  product: Product = new Product();
  ngOnInit(): void {
    let id: number;
    id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.viewProduct(id);

  }

  viewProduct(id: number) {
    this.productService.getProductById(id).subscribe(
      data => {
        this.product = data;
        console.log(JSON.stringify(data))

      }
    )
  }

  addToCart(tempProduct:Product){
    console.log(`adding product to cart: ${JSON.stringify(tempProduct)}`);
    let cartItem = new CartItem(tempProduct);
    this.cartService.addToCart(cartItem);
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

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
}


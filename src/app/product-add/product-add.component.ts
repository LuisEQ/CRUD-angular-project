import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
    
    @Input() product?: Product;
    products : Product[] = [];
    constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
      private location: Location
    ) { }
    

    ngOnInit(): void {
    }
    goBack(): void {
      this.location.back();
    }
    add(name: string, baseprice :string, publicprice : string, stock: string): void {
    name = name.trim();
    baseprice = baseprice.trim();
    publicprice = publicprice.trim();
    stock = stock.trim();
    if (!name || !baseprice || !publicprice || !stock ) { return; }
    this.productService.addProduct({ name, baseprice, publicprice, stock } as Product)
      .subscribe(product => {
        this.products.push(product);
      });
  }
  }



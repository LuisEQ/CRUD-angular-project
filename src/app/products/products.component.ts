import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../services/product.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
  ];

  
  constructor(private productService:ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productService.getProducts()
        .subscribe((products: Product[]) => {
          this.products = products;
          console.log(this.products);
        });
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
  delete(product: Product): void {
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product.id).subscribe();
  }
}

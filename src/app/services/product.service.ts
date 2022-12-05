import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Product } from '../product';

import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'http://localhost';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
    
  getProducts(): Observable <Product[]>{
    return this.http.get<Product[]>(`${this.productsUrl}/getall.php`)
    .pipe(
      tap(_ => this.log('Actualizado productos')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/get.php?idProduct=${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }
  updateProduct(product: Product){
    return this.http.put(`${this.productsUrl}/update.php`, product).pipe(
      tap(_ => this.log(`updated id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  addProduct(product: Product){
    return this.http.post<Product>(`${this.productsUrl}/post.php`, product).pipe(
      tap((newProduct: Product) => this.log(`added Product w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }
  deleteProduct(id: number){
    const url = `${this.productsUrl}/delete.php?idProduct=${id}`;

    return this.http.delete<Product>(url).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {


    console.error(error);


    this.log(`${operation} failed: ${error.message}`);


    return of(result as T);
  };
}
}

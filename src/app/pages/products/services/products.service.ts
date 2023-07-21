import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //private apiURL = 'http://localhost:3000/products';
  //Esta URL obtiene el listado de todos los productos en el backend
  private baseURL = "http://localhost:8080/compras/products";

  constructor(private http: HttpClient) { }

  //Metodo para obtener productos
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseURL}`);
  }

  updateStock(productId: Number, product: Product): Observable<Product> {
    console.log('updateStock/productsService =>', productId, product);
    console.log(`${this.baseURL}/${productId}`);
    return this.http.put<Product>(`${this.baseURL}/${productId}`, product);
  }
}



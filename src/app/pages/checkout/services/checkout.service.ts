import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from 'src/app/pages/checkout/interfaces/store.interface';
import { Order, DetailOne} from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  //private apiURL = 'http://localhost:3000/products';
  //Esta URL obtiene el listado de todos las tiendas en el backend
  private baseURL = "http://localhost:8080/compras";

  constructor(private http: HttpClient) { }

  //Metodo para obtener tiendas
  getStores():Observable<Store[]>{
    return this.http.get<Store[]>(`${this.baseURL}/stores`);
  }

  saveOrder(order: Order):Observable<Order>{
    console.log('Order in service =>',order);
    return this.http.post<any>(`${this.baseURL}/saveorder`,order);
  }

  saveDetails(details: DetailOne):Observable<DetailOne>{  //Interfase
    console.log('detailsOrder in service =>',details);
    return this.http.post<DetailOne>(`${this.baseURL}/savedetails`,details);
  }
}

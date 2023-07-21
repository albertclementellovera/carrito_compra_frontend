import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from 'src/app/shared/services/order.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart-service'
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/pages/products/product/product.component';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss'],
})

export class ThankYouPageComponent implements OnInit {

  order: any = {
    id: 0,
    name: '',
    date: null,
    shippingAddress: '',
    city: '',
    delivery: false,
    store_id: 0,
    store_name: '',
  }
  orderId :number =0;

  //utilizar estructura form DetailsComponent
  cart: Product[] = [];

  constructor(
    private orderSVC: OrderService,
    private http: HttpClient,
    private shoppingCartSvc: ShoppingCartService,
    ) {}

  private baseURL = "http://localhost:8080/compras";
  total$ = this.shoppingCartSvc.totalAction$;
  cart$ = this.shoppingCartSvc.cartAction$;

  ngOnInit(): void {
    // Realiza la solicitud GET al backend
    // El ID de la orden que deseas obtener
    const orderId = this.orderSVC.getOrderId();
    this.http.get(`${this.baseURL}/orders/${orderId}`).subscribe(
      (response) => {
        // La respuesta del backend
        console.log(response);
        this.order = response;
      },
      (error) => {}
    );
    const products = this.getDataCart()
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => {this.cart = products;
          console.log('Carrito de compra =>', products);
        })
      )
    .subscribe()
  }

  ResetShoppingCart(): void{
    this.shoppingCartSvc.resetCart();
  }
}

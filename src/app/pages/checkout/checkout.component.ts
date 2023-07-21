import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from 'src/app/pages/checkout/interfaces/store.interface';
import { CheckoutService } from 'src/app/pages/checkout/services/checkout.service';
import { NgForm } from '@angular/forms';
import { Product } from '../products/interfaces/product.interface';
import { Order, DetailOne } from 'src/app/pages/checkout/interfaces/order.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart-service'
import { delay, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as cloneDeep from 'lodash/cloneDeep';
import { OrderService } from 'src/app/shared/services/order.service';
import { DetailsComponent } from 'src/app/pages/checkout/details/details.component'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  //@Output('update') orderId$: EventEmitter<number> = new EventEmitter();
  model = {
    name: 'Albert',
    store: '',
    shippingAddress: '',
    city: ''
  };
  delivery: boolean = true;
  cart: Product[] = [];
  stores: Store[] = [];
  private orderIdSubject = new BehaviorSubject<number>(0);
  orderId$ = new BehaviorSubject<number>(0);
  order$ = BehaviorSubject<Order>;


  constructor(private dataSvc: CheckoutService,
    private shoppingCartSvc: ShoppingCartService,
    private orderSVC: OrderService,
    private router: Router,
    private productsSvc: ProductsService
  ) { this.checkIfCartIsEmpty(); }

  ngOnInit(): void {
    this.getStores();  //lista las tiedas en array
    this.getDataCart(); //lista de productos en carrito
  }

  onPickupOrDelivery(value: boolean): void {
    this.delivery = value;
  }
  //Guardar orden - renombramos value como formData
  onsubmit({ value: formData }: NgForm): void {
    console.log('Guardar', formData);
    //formData.store.id = 0;
    if (!this.delivery) {
      console.log('pickup true');
      formData.shippingAddress = formData.store.address;
      formData.city = formData.store.city;
    }
    const data: Order = {
      ...formData,
      store_id: this.getStoreIdSelected(formData),//number
      store_name: this.getStoreNameSelected(formData),//string
      date: new Date(),
      delivery: this.delivery,
    }
    console.log('Data', data);
    this.dataSvc.saveOrder(data)  //Guardar la orden
      // como es observable utilizamoe el metodo pipe con suscribe
      .pipe(
        // El tap operador devuelve un nuevo observable que
        // es una copia espejo del observable de origen
        tap(res => console.log('Order ->', res)),
        switchMap((order) => {                    //Obtener el Id de la orden
          const orderId = order.id;

            this.orderSVC.setOrderId(order.id);
            this.orderId$ = new BehaviorSubject<number>(orderId);
            this.order$ = cloneDeep(order);
            //console.log('Order$ ->', this.order$);
            //console.log('OrderId$ ->', this.orderId$);
          const details = this.prepareDetails(orderId);  //Guardar el detail
          return ('');
        }),
      )
      .subscribe();
    delay(2000);
    this.router.navigate(['/payment']);
  }

  private prepareDetails(orderId: number): void {  //3:51:16
    console.log('cart =>', this.cart);
    this.cart.forEach((product: Product) => {
      console.log('product =>', product);
      const detailOne: DetailOne = {
        productId: product.id,
        productName: product.name,
        quantity: product.qty,
        orderId: orderId
      }
      console.log('detailOne =>', detailOne);
      this.dataSvc.saveDetails(detailOne).subscribe(dato => {
        console.log(dato);
      }, error => console.log(error));
    })
  }

  private getStores(): void {
    this.dataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores)
      )
      .subscribe()
  }

  private getStoreIdSelected(formdata: any): number {

    var idOrder = 0;
    if (!this.delivery) { idOrder = formdata.store.id; }
    return (idOrder);
  }

  getStoreNameSelected(formdata: any): string {
    var name: string = '';
    if (!this.delivery) { name = formdata.store.name; }
    return (name)
  }

  //Nos proporciona los productos del carrito
  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
      )
      .subscribe()
  }

  private checkIfCartIsEmpty(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => {
          if (Array.isArray(products) && !products.length) {
            this.router.navigate(['/products']);
          }
        })
      )
      .subscribe()
  }
}
export { DetailsComponent };


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart-service';
import { Order } from 'src/app/pages/checkout/interfaces/order.interface';

@Component({
  selector: 'app-header',
  template:   `
  <mat-toolbar color="primary">
    <a [routerLink]="['/']"><span>My Store</span></a>
    <a class="order" [hidden]="true">{{ order$ }}</a>
    <span class="spacer"></span>
   <app-cart class="mouseHover" (click)="goToCheckout()"></app-cart>
  </mat-toolbar>
`,
styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(private router: Router,
    private shoppingCartSvc: ShoppingCartService){}
  //orderId: number=0;
  order$:Observable<Order> = this.shoppingCartSvc.orderAction$;

  goToCheckout(): void{
    this.router.navigate(['/checkout']);
  }
}


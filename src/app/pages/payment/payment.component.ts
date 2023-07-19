import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart-service';
import { Observable, map, throwError } from 'rxjs';
import { PaymentService } from 'src/app/pages/payment/payment.service';
import { PurchaseDto } from 'src/app/purchase-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  constructor(private shoppingCartSvc: ShoppingCartService,
              private paymentService: PaymentService,
              private router: Router) {}

  total$:Observable<number> = this.shoppingCartSvc.totalAction$;
  amount: number;

  //backendTokenUrl = environment.backendUrl;
  creditDebitCard: boolean=false;


  ngOnInit(): void {
    this.total$.subscribe(value => {
      // Asignar el valor del observable a la variable amount
      this.amount = value;
    });
  };

  onCashCreditCard(value: boolean): void{
    this.creditDebitCard = value;
  }

  onPaymentStatus(event:any): void {}

  getClientToken(): Observable<any> {
    return this.paymentService.getToken().pipe(map(
      data => {
        return data.token;
      },
      err => {
        return throwError(err);
      }
    ));
  }

  checkout(nonce: string, amount: number): Observable<any> {
    console.log('Nonce: ' + nonce);
    console.log('Amount: ' + amount);
    const dto= new PurchaseDto(nonce,amount);
    return this.paymentService.checkout(dto)
      .pipe(map(
        data => {
          this.router.navigate(['/success']);
          return data;
        },
        err =>{
          return throwError(err);
        }
      ));
  }
  /*
  tankYou(){
    console.log('tankYou');
    this.router.navigate(['/checkout/thank-you-page']);
  }*/
}


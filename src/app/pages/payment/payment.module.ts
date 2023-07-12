import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { PaymentRoutingModule } from 'src/app/pages/payment/payment-routing.module'
import { PaymentComponent } from './payment.component';
import { NgxBraintreeModule} from 'ngx-braintree';

@NgModule({
  declarations: [
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    MaterialModule,
    NgxBraintreeModule,
  ]
})
export class PaymentModule { }

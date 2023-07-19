import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';

const routes: Routes = [{ path: '', component: PaymentComponent },
{ path: 'payment', component: PaymentComponent },
{ path: 'thank-you-page', loadChildren: () => import('src/app/pages/checkout/thank-you-page/thank-you-page.module').then(m => m.ThankYouPageModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }

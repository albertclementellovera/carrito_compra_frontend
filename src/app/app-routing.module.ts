import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').
      then(module => module.ProductsModule)
  },
  {
    path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').
      then(m => m.CheckoutModule)
  },
  { path: 'payment', loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule) },
  { path: 'success', loadChildren: () => import('./pages/success/success.module').then(m => m.SuccessModule) },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

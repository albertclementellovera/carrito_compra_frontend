import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './shared/components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './shared/components/cart/cart.component';
import { SuccessModule } from './pages/success/success.module';
//external
import { NgxBraintreeModule } from 'ngx-braintree';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    SuccessModule,
    NgxBraintreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

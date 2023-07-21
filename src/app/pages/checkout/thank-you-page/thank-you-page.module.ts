import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ThankYouPageRoutingModule } from './thank-you-page-routing.module';
import { ThankYouPageComponent } from './thank-you-page.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
//import { DetailsComponent } from 'src/app/pages/checkout/details/details.component'

@NgModule({
  declarations: [
    ThankYouPageComponent,

  ],
  imports: [
    CommonModule,
    ThankYouPageRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,

  ]
})
export class ThankYouPageModule { }

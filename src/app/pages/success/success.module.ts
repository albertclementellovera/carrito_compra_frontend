import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './success.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SuccessRoutingModule } from 'src/app/pages/success/success-routing.module'


@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    CommonModule,
    SuccessRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class SuccessModule { }

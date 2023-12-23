import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaiementRoutingModule } from './paiement-routing.module';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaymentFormComponent,
    PaymentListComponent
  ],
  imports: [
    CommonModule,
    PaiementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaiementModule { }

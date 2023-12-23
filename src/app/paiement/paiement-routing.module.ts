import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

const routes: Routes = [
  { path: 'paiement/payment-form', component: PaymentFormComponent },

  { path: 'paiement/payment-form/:id', component: PaymentFormComponent },
  { path: 'paiement/payment-list', component: PaymentListComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaiementRoutingModule { }

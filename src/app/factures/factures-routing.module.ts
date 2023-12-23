import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactureComponent } from './facture/facture.component';
import { authGuard } from '../authentification/auth.guard';
import { PaymentFormComponent } from '../paiement/payment-form/payment-form.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  { path: 'facture/details/:id', component: DetailsComponent },
  {path: 'factures', component:FactureComponent, canActivate: [authGuard]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturesRoutingModule { }

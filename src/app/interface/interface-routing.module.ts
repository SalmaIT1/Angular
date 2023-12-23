import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcomComponent } from './ecom/ecom.component';
import { CardsComponent } from './cards/cards.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
  { path: '', component: EcomComponent },
  { path: 'ecom', component: EcomComponent },

  { path: 'cards', component: CardsComponent },
  { path: 'panier', component: PanierComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterfaceRoutingModule {}

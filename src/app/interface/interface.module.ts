import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterfaceRoutingModule } from './interface-routing.module';
import { CardsComponent } from './cards/cards.component';
import { EcomComponent } from './ecom/ecom.component';
import { PanierComponent } from './panier/panier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardsComponent,
    EcomComponent,
    PanierComponent
  ],
  imports: [
    CommonModule,
    InterfaceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InterfaceModule { }

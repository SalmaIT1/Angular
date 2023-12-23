import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturesRoutingModule } from './factures-routing.module';
import { FactureComponent } from './facture/facture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
  
  
    FactureComponent,
          DetailsComponent,
  ],
  imports: [
    CommonModule,
    FacturesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FacturesModule { }

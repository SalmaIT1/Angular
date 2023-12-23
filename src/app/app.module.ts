import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './products/products.module';
import { FacturesModule } from './factures/factures.module';
import { InterfaceModule } from './interface/interface.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { PaiementModule } from './paiement/paiement.module';
import { SharedModule } from './shared/shared.module';
import { AuthentificationModule } from './authentification/authentification.module';

@NgModule({
declarations: [
AppComponent,
],
imports: [
BrowserModule,
AppRoutingModule,
HttpClientModule,
ReactiveFormsModule,
RouterModule,
MatPaginatorModule,
FacturesModule,
InterfaceModule,
PaiementModule,
ProductsModule,
SharedModule,
AuthentificationModule

],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
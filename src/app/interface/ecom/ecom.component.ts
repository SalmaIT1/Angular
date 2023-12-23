import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';
import { PanierComponent } from '../panier/panier.component';
import { AuthService } from 'src/app/authentification/auth.service';
import { Router } from '@angular/router';
@Component({
selector: 'app-ecommerce',
templateUrl: './ecom.component.html',
styleUrls: ['./ecom.component.css']
})
export class EcomComponent {
  constructor(public authService: AuthService, public router: Router) { }
public collapsed = false;
orderFinished = false;
@ViewChild('productsC')
productsC: CardsComponent;
@ViewChild('shoppingCartC')
shoppingCartC: PanierComponent;
toggleCollapsed(): void {
this.collapsed = !this.collapsed;
}
finishOrder(orderFinished: any) {
this.orderFinished = orderFinished;
if (this.orderFinished===false){
    this.productAdded.map((p)=>{
    p.quantity=0;
    })
    this.productAdded =[]
    }
}
reset() {
this.orderFinished = false;
}
logout() {
  this.authService.doLogout()
}
login() {
  this.router.navigate(['/login']); // Navigate to the login route
}



productAdded: any[] = [];

addProductToCart(product: any) {
  let productExists = false;

  this.productAdded.forEach((p) => {
    if (p.product === product.product) {
      // If the product already exists, increase the quantity
      p.quantity++;
      productExists = true;
    }
  });

  if (!productExists) {
    // If the product does not exist in the cart, add it
    this.productAdded.push({ product: product.product, quantity: 1 });
  }

  console.log('Updated productAdded:', this.productAdded);
}

  showCart: boolean = false;

  toggleCart() {
    this.showCart = !this.showCart;
  }

  // Additional properties and methods for the modal
  showMainCart = false;

  openMainCart() {
    this.showMainCart = true;
  }

  closeMainCart() {
    this.showMainCart = false;
  }
  
}

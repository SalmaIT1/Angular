import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EcommService } from '../ecom.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { User } from 'src/app/authentification/user';
import { AuthService } from 'src/app/authentification/auth.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  @Input() productAdded: any[] = [];
  @Output() onOrderFinished: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onIdfacture: EventEmitter<number> = new EventEmitter<number>();

  total = 0;

  constructor(private ecommService: EcommService, private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.calculateTotal();
  }

  addTotal(prix: number, quantity: number) {
    if (!isNaN(prix) && !isNaN(quantity)) {
      this.calculateTotal();
    } else {
      console.error('Invalid values for prix or quantity. Please provide valid numbers.');
    }
  }

  calculateTotal() {
    this.total = this.productAdded.reduce((acc, order) => acc + order.product.prix * order.quantity, 0);
  }

  removeProduct(index: number) {
    if (index >= 0 && index < this.productAdded.length) {
      const removedOrder = this.productAdded.splice(index, 1)[0];
      this.total -= removedOrder.product.prix * removedOrder.quantity;
      this.calculateTotal();
    }
  }

  checkoutProduct() {
    const userId = sessionStorage.getItem('user_id');
  
    if (!userId) {
      throw new Error('User ID not found in session storage');
    }
  
    const userIdAsNumber = parseInt(userId, 10); // Convert userId to a number
  
    const currentDate = new Date();
    const randomReference = 'RF-' + uuidv4();
  
    if (this.productAdded.length > 0) {
      const prod_qte = this.productAdded.reduce((total, order) => {
        return total + (order.quantity || 0); // Assuming quantity is stored in each order object
      }, 0);
  
      const factureData = {
        reference: randomReference,
        references: this.productAdded
          .filter(order => order.product && order.product.reference)
          .map(order => order.product.reference),
        qteArticle: this.productAdded.length,
        listeArticlesAchetes: this.productAdded.map(order => ({
          idArticle: order.product ? order.product._id : null,
          // Include other necessary fields
        })),
        total: this.total,
        dateFacture: currentDate.toISOString(),
        statut: 'NonPayee',
        // Include total product quantity
  
        user: { id: userIdAsNumber }, // Include the userId as an object with an 'id' field
      };
  
      this.ecommService.createFacture(factureData, userId).subscribe(
        (response: any) => {
          // Your existing logic for successful facture creation
    
          // Reload the current page
          window.location.reload();
        },
        (error) => {
          console.error('Error creating facture:', error);
        }
      );
    } else {
      console.error('No items in the cart to checkout.');
    }
  }
  
  
  openPDF() {
    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 100;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 20;
      PDF.addImage(FILEURI, 'PNG', 50, position, fileWidth, fileHeight);
      PDF.save('cart.pdf');
    });
  }
}

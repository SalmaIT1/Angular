import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../paiement.service';
import { Paiement } from '../paiement';
import { ActivatedRoute } from '@angular/router';
import { Facture } from 'src/app/factures/facture';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  factureId: number;
  total: number;
  infocart: string; // Define 'infocart' property
  methodePaiement: string; // Define 'methodePaiement' property

  constructor(
    private paiementService: PaiementService,
    private route: ActivatedRoute
  ) {
    this.total = 0;
    this.infocart = ''; // Initialize 'infocart'
    this.methodePaiement = ''; // Initialize 'methodePaiement'
  }

  ngOnInit(): void {
    // Retrieve factureId from route parameters
    this.route.params.subscribe(params => {
      this.factureId = +params['id']; // Update the parameter name to match the route configuration
      
      // Fetch facture details based on factureId
      this.paiementService.getFactureDetails(this.factureId).subscribe(
        (factureDetails: Facture) => {
          // Use factureDetails to initialize form fields or perform other actions
          this.total = factureDetails.total;
          // You can set other fields as needed
          console.log('Facture Details:', factureDetails);
        },
        (error: any) => {
          console.error('Error fetching facture details:', error);
        }
      );
    });
  }

  onSubmit(): void {
    const datePaiement = new Date(); // Get the current date and time
  
    // Fetch factureId from route parameters
    this.route.params.subscribe(params => {
      this.factureId = +params['id'];
  
      const newPaiement: Paiement = {
        paiementId: null,
        facture: { id: this.factureId } as Facture, // Pass the factureId as a Facture object
        total: this.total,
        infocart: this.infocart,
        methodePaiement: this.methodePaiement,
        datePaiement
      };
  
      this.paiementService.createPaiement(newPaiement).subscribe(
        (response: any) => {
          console.log('Payment created:', response);
          // Handle success, e.g., show a success message
        },
        (error: any) => {
          console.error('Error creating payment:', error);
          // Handle error, e.g., show an error message
        }
      );
    });
  }
  

}  

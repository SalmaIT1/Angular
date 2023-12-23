import { Component, OnInit } from '@angular/core';
import { FactureService } from '../facture.service';
import { Facture } from '../facture'; // Replace with the actual path
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture-component',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

 factures: Facture[] = [];

  constructor(private factureService: FactureService , private router: Router) {}

  ngOnInit() {
    this.fetchFacturesByUserId();
  }
  calculateTotal(): number {
    let total = 0;
    for (const facture of this.factures) {
      if (facture.statut === 'NonPayee') {
        total += facture.total;
      }
    }
    return total;
  }
  

  fetchFacturesByUserId() {
    this.factureService.getFacturesByUserIdFromStorage()
      .subscribe(
        (factures: Facture[]) => {
          this.factures = factures;
          console.log('Factures:', this.factures);
          
          if (this.factures.length > 0) {
            console.log('Example Facture ID:', this.factures[0].id); // Log the ID of the first facture
          }
        },
        (error) => {
          console.error('Error fetching factures:', error);
        }
      );
  }
  
  consulterFacture(idFacture: any) {
    if (idFacture !== undefined && idFacture !== null) {
      const stringID: string = String(idFacture).trim();
  
      if (stringID !== '') {
        const numericID: number = Number(stringID);
  
        if (!isNaN(numericID)) {
          // Navigate to the 'details' route with the facture ID as a parameter
          this.router.navigate(['/facture/details', numericID]);
        } else {
          console.error('Invalid facture ID:', stringID);
        }
      } else {
        console.error('Empty facture ID');
      }
    } else {
      console.error('Undefined or null facture ID');
    }
  }
  payerFacture(idFacture: any) {
    if (idFacture !== undefined && idFacture !== null) {
      const stringID: string = String(idFacture).trim();
  
      if (stringID !== '') {
        const numericID: number = Number(stringID);
  
        if (!isNaN(numericID)) {
          // Navigate to the 'payment-form' route with the facture ID as a parameter
          this.router.navigate(['/paiement/payment-form', numericID]);
        } else {
          console.error('Invalid facture ID:', stringID);
        }
      } else {
        console.error('Empty facture ID');
      }
    } else {
      console.error('Undefined or null facture ID');
    }
  }
  
  
  payAllFactures() {
    const unpaidFactures = this.factures.filter((facture) => facture.statut === 'NonPayee');
    
    this.factureService.createMultiplePaiements(unpaidFactures)
      .subscribe(
        (createdPaiements: Facture[]) => {
          console.log('Multiple paiements created:', createdPaiements);
          this.updateFactureStatus(createdPaiements);
        },
        (error) => {
          console.error('Error creating multiple paiements:', error);
        }
      );
  }

  updateFactureStatus(paiements: Facture[]) {
    for (const paiement of paiements) {
      // Update the facture status for each created paiement
      this.factureService.updateFactureStatus(paiement.id)
        .subscribe(
          (updatedFacture: Facture) => {
            console.log('Facture status updated:', updatedFacture);
          },
          (error) => {
            console.error('Error updating facture status:', error);
          }
        );
    }
  }
}

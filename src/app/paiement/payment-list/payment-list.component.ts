import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../paiement.service'; // Update the path
import { Paiement } from '../paiement'; // Update the path

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
[x: string]: any;
  payments: Paiement[] = [];

  constructor(private paiementService: PaiementService) {}

  ngOnInit(): void {
    this.paiementService.getPayments().subscribe(
      (response: Paiement[]) => {
        this.payments = response;
        console.log('Payments fetched:', this.payments);
      },
      (error: any) => {
        console.error('Error fetching payments:', error);
      }
    );
  }
  
}

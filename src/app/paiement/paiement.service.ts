import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from './paiement'; // Update the path
import { Facture } from '../factures/facture';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8080/paiements'; // Update the URL

  constructor(private http: HttpClient) {}

  createPaiement(paiement: Paiement): Observable<any> {
    const url = `${this.apiUrl}/create`;
    return this.http.post(url, paiement);
  }

  getPayments(): Observable<Paiement[]> {
    const url = `${this.apiUrl}/paiements`;
    return this.http.get<Paiement[]>(url);
  }
  getFactureDetails(factureId: number): Observable<Facture> {
    const url = `${this.apiUrl}/factures/${factureId}`;
    return this.http.get<Facture>(url);
  }
  
  
}

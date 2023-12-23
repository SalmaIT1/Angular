import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../factures/facture';

@Injectable({
  providedIn: 'root'
})
export class EcommService {
  private apiUrl = 'http://localhost:8080/api/factures';

  constructor(private http: HttpClient) {}

  createFacture(factureData: any, userId: string): Observable<any> {
    const url = `${this.apiUrl}?userId=${userId}`; // Modify the URL to include userId as a query parameter
    return this.http.post(url, factureData);
  }
  

  getFactureById(idfacture: number): Observable<any> {
    const url = `${this.apiUrl}/${idfacture}`;
    return this.http.get<any>(url);
  }

 // ecomm.service.ts

getAllFactures(): Observable<Facture[]> {
  const url = `${this.apiUrl}`; // Adjust the API endpoint
  return this.http.get<Facture[]>(url);
}

  // Add other methods for handling products, etc.
}

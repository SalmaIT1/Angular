import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EcommService } from '../interface/ecom.service';
import { Facture } from './facture';


@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private baseurl = 'http://localhost:8080/api/factures'; // Mettez ici l'URL de votre backend

  constructor(private http: HttpClient, private router: Router,private ecommService:EcommService) { }

  getFacturesByUserIdFromStorage(): Observable<Facture[]> {
    const userId = sessionStorage.getItem('user_id');
    if (!userId) {
      throw new Error('User ID not found in session storage');
    }

    const url = `${this.baseurl}/user/${userId}`;
    return this.http.get<Facture[]>(url);
  }
  getFactureParID(id: number): Observable<Facture> {
    const url = `${this.baseurl}/${id}`;
    return this.http.get<Facture>(url);
  }
 
  createMultiplePaiements(paiements: Facture[]): Observable<Facture[]> {
    const url = `${this.baseurl}/paiements/create-multiple`;
    return this.http.post<Facture[]>(url, paiements);
  }
  updateFactureStatus(factureId: number): Observable<Facture> {
    const url = `${this.baseurl}/updateStatus/${factureId}`; // Modify the URL based on your backend endpoint
    return this.http.put<Facture>(url, null); // Pass any required payload or data in the request body if needed
  }
  
}

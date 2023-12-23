import { Facture } from "../factures/facture";

export class Paiement {
    paiementId?: number|null;
    facture: Facture;
    total: number;
    infocart: string;
    methodePaiement: string;
    datePaiement: Date; 
    constructor() {
      this.facture = new Facture();
  }
  }
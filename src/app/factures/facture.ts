import { Products } from "src/app/products/products";
import { Paiement } from "../paiement/paiement";

export class Facture {
    id: number;
    reference: string;
    qteArticle: number;
    idArticle: number;
    listeArticlesAchetes:Products[];
    total: number;
    dateFacture: Date;
    statut: string;
    paiements: Paiement[]; 
    constructor() {
      this.paiements = [];
  }
  }
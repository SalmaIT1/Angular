import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactureService } from '../facture.service';
import { Facture } from '../facture';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  facture: Facture | undefined;

  constructor(private route: ActivatedRoute, private factureService: FactureService) { }

  ngOnInit(): void {
    this.getFactureDetails();
  }

  getFactureDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.factureService.getFactureParID(id)
        .subscribe(facture => this.facture = facture);
    }
  }
}

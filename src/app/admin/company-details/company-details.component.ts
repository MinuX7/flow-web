import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

   reservations: Array<any>;
  constructor(private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.reservationsService.getCompanyReservations('primaria-telesti').subscribe(data =>
      this.reservations = data as Array<any>
      )
  }

}

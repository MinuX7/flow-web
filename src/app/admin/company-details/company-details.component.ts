import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  selectedDate= new Date();
   reservations: Array<any>;
  constructor(private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.reservationsService.getCompanyReservations('primaria-telesti').subscribe(data =>
      this.reservations = data as Array<any>
      )

  }

  onSelect(event) {
    this.selectedDate=event;
  }

  // dateClass() {
  //   return (date: Date): MatCalendarCellCssClasses => {
  //     if (date.getDate() === this.selectedDate.getDate() && date.getMonth() === this.selectedDate.getMonth()) {
  //       return 'special-date';
  //     } else {
  //       return '';
  //     }
  //   };
  // }

  filterDates = (date: Date): boolean => {
    if (date.getDate()==24) {
      return false;
    } else {
      return true;
    }
  }

}

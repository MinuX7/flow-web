import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsService } from './reservations.service';
import { MatDatepickerModule } from '@angular/material/datepicker';


const routes: Routes = [
  {
    path: '',
    component: CompanyDetailsComponent
  }
];

@NgModule({
  declarations: [CompanyDetailsComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    RouterModule.forChild(routes)
  ],
  providers: [ReservationsService],

})
export class AdminModule { }

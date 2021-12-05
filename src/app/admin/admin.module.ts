import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsService } from './reservations.service';

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
    RouterModule.forChild(routes)
  ],
  providers: [ReservationsService],

})
export class AdminModule { }

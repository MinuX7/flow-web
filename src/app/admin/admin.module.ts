import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { RouterModule, Routes } from '@angular/router';

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

})
export class AdminModule { }

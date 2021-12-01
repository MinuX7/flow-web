import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from './model/company';
// import  * as data  from './data/companies.json'

@Injectable({
  providedIn: 'root'
})
export class FlowService {

   backendUrl = environment.backendUrl;
  constructor(private htppClient: HttpClient) { }


  public getHttpCompanies(): Observable<any> {
    return this.htppClient.get(this.backendUrl +'/companies');
  }

  public getCompanyFlows(company: Company):Observable<any> {
    let flowsUrl = this.backendUrl + '/companies/' +  company.companyId + '/flows';
    return this.htppClient.get(flowsUrl);
  }

  public getReservations():Observable<any> {
    return this.htppClient.get('assets/data/reservations.json');
  }

  public getBookingOffice():Observable<any> {
    return this.htppClient.get('assets/data/booking-office.json');
  }

  // public getCompanies(): Observable<any> {
  //   return of(data);
  // }
}

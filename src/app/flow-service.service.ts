import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
// import  * as data  from './data/companies.json'

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private htppClient: HttpClient) { }


  public getHttpCompanies(): Observable<any> {
    return this.htppClient.get('assets/data/companies.json');
  }

  public getCompanyFlows():Observable<any> {
    return this.htppClient.get('assets/data/flows.json');
  }

  public getReservations():Observable<any> {
    return this.htppClient.get('assets/data/reservations.json');
  }

  // public getCompanies(): Observable<any> {
  //   return of(data);
  // }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from './model/company';
import { Flow } from './model/flow';
import { FlowModel } from './model/flowmodel';
import * as moment from 'moment';
import {formatDate} from '@angular/common';

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

  getFlowBookingOffices(company:Company, flow:Flow) {
    let boUrl = this.backendUrl + '/companies/' +  company.companyId + '/bookingOffice?flowId='+flow.flowId;
    return this.htppClient.get(boUrl);
  }


  public getBookingOfficeBusySlots(company: Company, bookingOffice: any) {
    let url = this.backendUrl+`/companies/${company.companyId}/bookingOffices/${bookingOffice.id}/reservedSlots`;
    return this.htppClient.get(url);
  }

  public createReservetionEvent(flowModel: FlowModel) {
    let requestBody = {
      companyId: flowModel.company.companyId,
      flowId: flowModel.flow.flowId,
      bookingOfficeId: flowModel.bookingOffice.id,
      reservationStartTime: this.formatD(flowModel.flowDate),
      firstName: flowModel.user.firstName,
      lastName: flowModel.user.lastName,
      email: flowModel.user.email,
      comment: flowModel.user.comment,
      creationTime: this.formatMoment(moment())
    }
    let reservationEventUrl = this.backendUrl + '/companies/' +  flowModel.company.companyId + '/reservations';
    return this.htppClient.post(reservationEventUrl, requestBody);
  }

  private formatMoment(date: moment.Moment) {
    return date.format('YYYY-MM-DDTHH:mm:ss');
  }

  private formatD(date:Date): string {
    return formatDate(date, "yyyy-MM-dd'T'HH:mm:ss", 'en');
  }

}

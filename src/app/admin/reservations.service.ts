import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  backendUrl = environment.backendUrl;
  constructor(private htppClient: HttpClient) { }

  getCompanyReservations(companyId: string) {
    let url = this.backendUrl +'/companies/' + companyId+'/reservations'
    return this.htppClient.get(url);
  }
}

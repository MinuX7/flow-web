import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowService } from '../flow-service.service';
import { Company } from '../model/company';
import { FlowModel } from '../model/flowmodel';

@Component({
  selector: 'flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {
  stepActive= 1;
  flowModel: FlowModel = new FlowModel();
  companyParam: string;
  constructor(activatedRoute: ActivatedRoute) {
     activatedRoute.paramMap.subscribe(paramMap => {
        this.companyParam = paramMap.get('company');
     });
   }

  ngOnInit(): void {
  }

  toStep(step) {
    this.stepActive = step;
  }

  onCompanyChanged(event) {
    this.flowModel.company = event.company;
  }

  onFlowChanged(event) {
    this.flowModel.flow = event.selectedflow;
  }

  onBookingOfficeChanged(event) {
    this.flowModel.bookingOffice= event;
  }

  onDateChanged(event) {
    this.flowModel.flowDate= event;
  }

  onPersonGroupChanged(event) {
    this.flowModel.user = event;
  }

}

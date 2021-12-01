import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FlowService } from '../flow-service.service';
import { Company } from '../model/company';

@Component({
  selector: 'step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  @Output()
  toStepEvent = new EventEmitter<number>();

  @Output()
  companyChangeEmitter = new EventEmitter<any>();

  companies: Array<Company> = new Array();

  @Input()
  selectedCompany: Company;

  @Input()
  companyParam: string;

  constructor(private _flowService: FlowService) { }

  ngOnInit(): void {
    this._flowService.getHttpCompanies().subscribe( data => {
      this.companies = data;
      let paramCompany = this.companies.find(c => c.companyId === this.companyParam)
      if (paramCompany){
        this.selectedCompany = paramCompany;
      }
    },
    error => {
      console.error(error);
    });
  }

  choseCompany(company) {
  this.selectedCompany = company;
  this.companyChangeEmitter.emit({company: this.selectedCompany});
  }

  nextStep() {
    this.toStepEvent.emit(2);
  }
}

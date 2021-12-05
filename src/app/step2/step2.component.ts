import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowService } from '../flow-service.service';
import { Company } from '../model/company';

@Component({
  selector: 'step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  companyFlows: Array<any>;

  @Input()
  selectedCompany: Company;

  @Output()
  toStepEvent = new EventEmitter<number>();

  @Output()
  flowChangedEvent = new EventEmitter<any>();

  @Input()
  selectedFlow: any;

  constructor(private _flowService: FlowService ) {
   }

  ngOnInit(): void {
    this._flowService.getCompanyFlows(this.selectedCompany).subscribe (
      data=> {
        this.companyFlows = data;
        this.companyFlows.forEach(flow => {
          if (flow.flowId === this.selectedFlow?.flowId) {
            flow.selected = true;
          }
        })
      },
      error => {
        console.error(error);
      }
    )
  }

  downloadFile(fileName) {
    alert('Downlaoding file ' + fileName);
  }

  toStep(number) {
    this.toStepEvent.emit(number);
  }

  clickFlow(flow) {
    flow.selected=!flow.selected;
    if (flow.selected) {
      this.selectedFlow = flow;
      this.companyFlows.filter(f=>f.selected !==  null && f.flowId !== flow.flowId ).forEach(
        f => f.selected = null
      );
    } else {
      this.selectedFlow = null;
    }
    this.flowChangedEvent.emit ({selectedflow: this.selectedFlow});
  }

}

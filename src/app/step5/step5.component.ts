import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { FlowModel } from '../model/flowmodel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

  @Input()
  flowModel: FlowModel;

  @Output()
  toBegining = new EventEmitter<number>();
  datepipe: DatePipe = new DatePipe('en-US')
  constructor() { }

  ngOnInit(): void {
  }

  doneFlow() {
    this.toBegining.emit(1);
  }
  formatDate(date: Date) {
    return this.datepipe.transform(date, 'dd-MM-yyyy HH:mm:ss');
  }

}

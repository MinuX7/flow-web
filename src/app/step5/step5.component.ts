import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { FlowModel } from '../model/flowmodel';

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

  constructor() { }

  ngOnInit(): void {
  }

  doneFlow() {
    this.toBegining.emit(1);
  }
  formatDate(date: moment.Moment) {
    return date.format('DD-MM-YYYY HH:mm:ss');
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FlowModel } from '../model/flowmodel';

@Component({
  selector: 'step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

  @Input()
  flowModel: FlowModel;

  constructor() { }

  ngOnInit(): void {
  }

}

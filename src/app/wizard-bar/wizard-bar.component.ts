import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wizard-bar',
  templateUrl: './wizard-bar.component.html',
  styleUrls: ['./wizard-bar.component.css']
})
export class WizardBar implements OnInit {

  @Input()
  stepActive;

  constructor() { }

  ngOnInit(): void {
  }

}

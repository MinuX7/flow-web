import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  
  
  @Output()
  toStepEvent = new EventEmitter<number>();

  @Output()
  dateChanged = new EventEmitter<any>();
  
  @Input()
  selectedDate;
  dpConfig: any;

  dayTimeSlots: Array<any> = new Array();
  
  constructor() {
    
    this.dpConfig = {
      firstDayOfWeek: 'tu',
      monthFormat: 'MMM, YYYY',
      disableKeypress: false,
      allowMultiSelect: false,
      closeOnSelect: undefined,
      closeOnSelectDelay: 100,
      onOpenDelay: 0,
      weekDayFormat: 'ddd',
      appendTo: document.body,
      drops: 'down',
      opens: 'right',
      showNearMonthDays: true,
      showWeekNumbers: false,
      enableMonthSelector: true,
      format: "YYYY-MM-DD",
      yearFormat: 'YYYY',
      showGoToCurrent: true,
      dayBtnFormat: 'DD',
      monthBtnFormat: 'MMM',
      hours12Format: 'hh',
      hours24Format: 'HH',
      meridiemFormat: 'A',
      minutesFormat: 'mm',
      minutesInterval: 1,
      secondsFormat: 'ss',
      secondsInterval: 1,
      showSeconds: false,
      showTwentyFourHours: true,
      timeSeparator: ':',
      multipleYearsNavigateBy: 10,
      showMultipleYearsNavigation: false,
      locale: 'ro-RO',
      min: '2021-10-20',
      max: '2022-01-22'
      // min:'2017-08-29 15:50',
      // minTime:'2017-08-29 15:50'
    };
   }

  ngOnInit(): void {
  }
  
  toStep(number) {
    this.toStepEvent.emit(number);
  }

  dateSelected(event) {
    this.getHourSelectors(moment(event.date));
    this.dateChanged.emit(null);
  }

  getHourSelectors(date: moment.Moment) {
    this.dayTimeSlots = new Array();
    let startDate = moment(this.selectedDate);
    startDate.set({hour:8,minute:0,second:0});
    let endDate = moment(this.selectedDate);
    endDate.set({hour:16,minute:0,second:0});
    
    let tempDate = startDate;
    while (tempDate.isBefore(endDate)) {
      this.dayTimeSlots.push(
        { busy: false,
          selected: false,
          time: moment(tempDate)
        });
      tempDate.add(15, 'minutes')
    }

  }

  clickSlot(timeSlot) {
    if (timeSlot.selected) {
      timeSlot.selected = false;
      this.dateChanged.emit(null);
    } else {
      this.dayTimeSlots.filter(s => s.selected).forEach(s => s.selected= false);
      timeSlot.selected = true;
      this.dateChanged.emit(timeSlot.time);
    }
  }
}

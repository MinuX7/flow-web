import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import * as moment from 'moment';
import { FlowService } from '../flow-service.service';

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

  @Output()
  bookingOfficeChanged = new EventEmitter<any>();
  
  @Input()
  selectedDate;
  
  @Input()
  selectedBookingOffice: any;
  dpConfig: any;

  reservations: Array<any>;

  bookingOffices: Array<any>= new Array();

  dayTimeSlots: Array<any> = new Array();
  startDate = new Date(2021, 0, 2);
  minDate = new Date();
  maxDate = new Date(2022,0,1);
  dateFilter = (date: Date) => {
    let momentDate = moment(date);
    return momentDate.get('day') !==6 && momentDate.get('day') !== 0 && !this.isFullyBooked(momentDate);
  }
  selecteDate: moment.Moment;
  constructor(private _flowService: FlowService) {
    
  }

  ngOnInit(): void {
    this._flowService.getReservations().subscribe(
      data => this.reservations = data
    );
    this._flowService.getBookingOffice().subscribe(
      data=> this.bookingOffices = data
    )
  }
  
  toStep(number) {
    this.toStepEvent.emit(number);
  }

  choseBookingOffice(bo) {
    this.selectedBookingOffice = bo;
    this.bookingOfficeChanged.emit(bo);
  }

  isFullyBooked(date: moment.Moment) {
    return date.isSame(moment('2021-11-29'),'date') || date.isSame(moment('2021-11-30'),'date') || date.isSame(moment('2021-12-7'),'date');
  }

  onDateChanged(event) {
    let daySelected: moment.Moment =  event;
    this.getHourSelectors(daySelected);
    this.selecteDate = null;
    this.dateChanged.emit(null);
  }

  getHourSelectors(date: moment.Moment) {
    this.dayTimeSlots = new Array();
    let startDate = moment(date);
    startDate.set({hour:8,minute:0,second:0});
    let endDate = moment(date);
    endDate.set({hour:16,minute:0,second:0});
    
    let tempDate = startDate;
    while (tempDate.isBefore(endDate)) {
      this.dayTimeSlots.push(
        { busy: this.isSlotBusy(tempDate),
          selected: false,
          time: moment(tempDate)
        });
      tempDate.add(15, 'minutes')
    }
  }

  private isSlotBusy(slotMoment) {
    let momentString = slotMoment.format('DD-MM-YYYY hh:mm:ss');
    let isBusy = false;
    this.reservations.forEach(r=> {
      let rDate = r.date;
      let resM:moment.Moment = moment(rDate,'DD.MM.YYYY hh:mm');
      if (resM.isSame(slotMoment, 'minute')) { 
        isBusy = true;
      }
    });
    return isBusy;
  }

  clickSlot(timeSlot) {
    if (timeSlot.selected) {
      timeSlot.selected = false;
      this.dateChanged.emit(null);
    } else {
      this.dayTimeSlots.filter(s => s.selected).forEach(s => s.selected= false);
      timeSlot.selected = true;
      this.selecteDate = timeSlot.time;
      this.dateChanged.emit(timeSlot.time);
    }
  }

}

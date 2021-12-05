
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment-timezone';
import { FlowService } from '../flow-service.service';
import { BookingOffice } from '../model/bookingOffice';
import { FlowModel } from '../model/flowmodel';

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

  @Input()
  flowModel: FlowModel;
  busySlots: Array<any>= new Array();
  busyDates: Array<any> = new Array();
  bookingOffices: Array<BookingOffice>= new Array();
  dayTimeSlots: Array<any> = new Array();
  minDate = new Date();
  maxDate = new Date(2022,0,1);
  
  dateFilter = (date: Date) => {
    let momentDate = moment(date);
    return momentDate.get('day') !==6 && momentDate.get('day') !== 0 && !this.isFullyBooked(momentDate);
  }
  selecteDate: moment.Moment;
  constructor(private _flowService: FlowService) {
    this.busyDates.push(moment('2021-12-09'));
    this.busyDates.push(moment('2021-12-15'));
  }

  ngOnInit(): void {
    this._flowService.getFlowBookingOffices(this.flowModel.company, this.flowModel.flow).subscribe(
      data=> this.bookingOffices = data as Array<any>
    )
  }
  
  toStep(number) {
    this.toStepEvent.emit(number);
  }

  choseBookingOffice(bo:BookingOffice) {
    this.selectedBookingOffice = bo;
    this.bookingOfficeChanged.emit(bo);
    this._flowService.getBookingOfficeBusySlots(this.flowModel.company, this.flowModel.bookingOffice).subscribe(
      data => {
        this.busySlots =(data as Array<any>).map(d => { 
         let temp = {date: moment(d).tz('Europe/Bucharest')}
        return temp;
        });
        this.dateFilter = (date: Date) => {
          let momentDate = moment(date);
          return momentDate.get('day') !==6 && momentDate.get('day') !== 0 && !this.isFullyBooked(momentDate);
        };
      });

    }

  isFullyBooked(date: moment.Moment): boolean {
    for (let busyDate of this.busyDates) {
      if (busyDate.isSame(date, 'date')) {
        return true;
      }
    }
    return false;
  }

  onDateChanged(event) {
    let daySelected: moment.Moment =  event;
    this.getHourSelectors(daySelected);
    this.selecteDate = null;
    this.dateChanged.emit(null);
  }

  getHourSelectors(date: moment.Moment) {
    this.dayTimeSlots = new Array();
    let startDate = moment(date).tz('Europe/Bucharest');
    startDate.set({hour:8,minute:0,second:0});
    let endDate = moment(date).tz('Europe/Bucharest');
    endDate.set({hour:16,minute:0,second:0});
    
    let tempDate = startDate;
    while (tempDate.isBefore(endDate)) {
      this.dayTimeSlots.push(
        { busy: this.isSlotBusy(tempDate),
          selected: false,
          time: moment(tempDate).tz('Europe/Bucharest')
        });
      tempDate.add(15, 'minutes')
    }
  }

  private isSlotBusy(slotMoment) {
    let isBusy = false;
    this.busySlots.forEach(bSlot=> {
      let tempSlot = bSlot.date;
      let resM:moment.Moment = moment(tempSlot).tz('Europe/Bucharest');
      if (resM.isSame(slotMoment, 'minute')) { 
        isBusy = true;
      }
    });
    return isBusy;
  }

  clickSlot(timeSlot) {
    if (timeSlot.selected) {
      timeSlot.selected = false;
      this.selecteDate = null;
      this.dateChanged.emit(null);
    } else {
      this.dayTimeSlots.filter(s => s.selected).forEach(s => s.selected= false);
      timeSlot.selected = true;
      this.selecteDate = timeSlot.time;
      this.dateChanged.emit(timeSlot.time);
    }
  }

}

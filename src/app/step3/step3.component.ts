
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
  selectedDate: Date;
  
  @Input()
  selectedBookingOffice: any;

  @Input()
  flowModel: FlowModel;
  busySlots: Array<any>= new Array();
  busyDates: Map<string, number> = new Map();
  bookingOffices: Array<BookingOffice>= new Array();
  dayTimeSlots: Array<any> = new Array();
  minDate = new Date();
  maxDate;

  isSlotSelected: boolean = false;
  
  dateFilter = (date: Date) => {
    let momentDate = moment(date);
    return momentDate.get('day') !==6 && momentDate.get('day') !== 0 && !this.isFullyBooked(momentDate);
  }
  
  constructor(private _flowService: FlowService) {
    var year = this.minDate.getFullYear();
    var month = this.minDate.getMonth();
    var day = this.minDate.getDate();
    this.maxDate = new Date(year + 1, month, day);
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
         let temp = {date: moment(d)}
        return temp;
        });
        this.buildBusyDaysMap();
        this.dateFilter = (date: Date) => {
          let momentDate = moment(date);
          return momentDate.get('day') !==6 && momentDate.get('day') !== 0 && !this.isFullyBooked(momentDate);
        }
      });

    }

  isFullyBooked(date: moment.Moment): boolean {

    let key = date.format('DD-MM-YYYY');
    let value = this.busyDates.get(key);
    value = value? value: 0;
    let officeEndTimeMoment: moment.Moment = moment(this.flowModel.bookingOffice.officeEndTime, 'HH:mm:ss');
    let officeStartTimeMoment: moment.Moment = moment(this.flowModel.bookingOffice.officeStartTime, 'HH:mm:ss');
    let duration = moment.duration(officeEndTimeMoment.diff(officeStartTimeMoment));
    let diffMinutes = duration.asMinutes();
    let maxReservations = diffMinutes/ this.flowModel.bookingOffice.slotDuration;
    return value >=maxReservations;
  }

  private buildBusyDaysMap() {
    this.busyDates = new Map();
    for (let busySlot of this.busySlots) {
      let slotDay: moment.Moment = busySlot.date;
      let key = slotDay.format('DD-MM-YYYY');
      let nr = this.busyDates.get(key);
      let value = nr? nr+1: 1;
      this.busyDates.set(key, value);
    }
  }


  onSelect(event) {
    this.selectedDate=event;
    this.getHourSelectors(this.selectedDate);
    this.dateChanged.emit(this.selectedDate);
  }

  getHourSelectors(date: Date) {
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
    let isBusy = false;
    this.busySlots.forEach(bSlot=> {
      let tempSlot = bSlot.date;
      let resM:moment.Moment = moment(tempSlot);
      if (resM.isSame(slotMoment, 'minute')) { 
        isBusy = true;
      }
    });
    return isBusy;
  }

  clickSlot(timeSlot) {
    if (timeSlot.selected) {
      timeSlot.selected = false;
      this.isSlotSelected =false;
    } else {
      this.dayTimeSlots.filter(s => s.selected).forEach(s => s.selected= false);
      timeSlot.selected = true;
      this.selectedDate.setHours(timeSlot.time.get('hours'));
      this.selectedDate.setMinutes(timeSlot.time.get('minutes'));
      this.isSlotSelected =true;
      this.dateChanged.emit(this.selectedDate);
      alert(this.selectedDate);
    }
  }

}

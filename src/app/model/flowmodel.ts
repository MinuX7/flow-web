import * as moment from "moment";
import { BookingOffice } from "./bookingOffice";
import { Company } from "./company";
import { Flow } from "./flow";

export class FlowModel {
    
public company: Company;
public flow: Flow;
public flowDate: moment.Moment;
public bookingOffice: BookingOffice;
public user: any;


}
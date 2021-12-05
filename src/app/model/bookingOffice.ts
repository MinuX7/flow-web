import * as moment from "moment";

export class BookingOffice {
    constructor(public id: number,
        public companyId: string,
        public name: string,
        public description: string,
        public slotDuration: number,
        public officeStartTime: string,
        public officeEndTime: string
        ) { 
    }
}
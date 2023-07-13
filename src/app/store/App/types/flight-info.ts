import { Record } from 'immutable';

export interface IFlightInfo {
    airline: string;
    arrivalDate: string;
    arrivalTime: string;
    flightNumber: string;
    numOfGuests: number;
    comments?: string;
}

export const FLIGHT_INFO_PAYLOAD: any = Record({
    airline: '',
    arrivalDate: '',
    arrivalTime: '',
    flightNumber: '',
    numOfGuests: '',
    comments: '',
});

export class FlightInfo extends FLIGHT_INFO_PAYLOAD {
    constructor(values?: Partial<IFlightInfo>) {
        super(values);
    }

    airline: string;
    arrivalDate: string;
    arrivalTime: string;
    flightNumber: string;
    numOfGuests: number;
    comments?: string;
}

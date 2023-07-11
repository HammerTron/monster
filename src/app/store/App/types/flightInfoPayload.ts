import { Record } from 'immutable';

export interface IFlightInfoPayload {
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

export class FlightInfoPayload extends FLIGHT_INFO_PAYLOAD {
    constructor(values?: Partial<IFlightInfoPayload>) {
        super(values);
    }

    airline: string;
    arrivalDate: string;
    arrivalTime: string;
    flightNumber: string;
    numOfGuests: number;
    comments?: string;
}

import { fromJS, Record } from 'immutable';

import { ILogin, Login } from './login.model'
import { IFlightInfo, FlightInfo } from './flight-info'

export interface IAppState {
    isBusy: boolean;
    busyCount: number;
    authenticated: boolean;
    authToken: string;
    login: ILogin;
    flightInfo: IFlightInfo;
}

export const APP_STATE: any = Record({
    isBusy: false,
    busyCount: 0,
    authenticated: false,
    authToken: 'SGV5IHRoZXJlIFBydWRodmkhICBMb29rcyBsaWtlIHlvdSBmb3VuZCBteSBsaXR0bGUgZWFzdGVyIGVnZy4gQnJpbmcgdGhpcyB1cCBpbiB0aGUgaW50ZXJ2aWV3IGZvciBib251cyBwb2ludHMh',
    login: new Login(),
    flightInfo: new FlightInfo(),
});

/**
 * type definition for Redux Store app state
 */
export class AppState extends APP_STATE {
    constructor(values?: Partial<IAppState>) {
        super(values);
    }

    isBusy: boolean;
    busyCount: number;
    authenticated: boolean;
    authToken: string;
    login: Login;
    flightInfo: FlightInfo;
}

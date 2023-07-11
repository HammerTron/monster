import { fromJS, Record } from 'immutable';

export interface IAppState {
    isBusy: boolean;
    busyCount: number;
    authToken: string;
}

export const APP_STATE: any = Record({
    isBusy: false,
    busyCount: 0,
    authToken: 'SGV5IHRoZXJlIFBydWRodmkhICBMb29rcyBsaWtlIHlvdSBmb3VuZCBteSBsaXR0bGUgZWFzdGVyIGVnZy4gQnJpbmcgdGhpcyB1cCBpbiB0aGUgaW50ZXJ2aWV3IGZvciBib251cyBwb2ludHMh',
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
    authToken: string;
}

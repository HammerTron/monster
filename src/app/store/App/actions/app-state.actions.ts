import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createAction, props, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { IAppStore } from '../../app-store';
import { AppStateSelectors } from '../selectors/app-state.selectors';
import { IFlightInfoPayload, FlightInfoPayload } from '../types/flightInfoPayload';
import { FlightService } from '../../../areas/Flights/services/Flight/flight.service';

export const AppBusy: any = createAction('[App] Busy');
export const AppIdle: any = createAction('[App] Idle');
export const AppKillLoading: any = createAction('[App] Kill Loading');
export const submitFlightInfo: any = createAction('[App: Flight] Submit Flight Info', props<{ FlightInfoPayload: IFlightInfoPayload }>());
// export const UpdatePasswordText: any = createAction('[App: Login] Update Password', props<{ password: string }>());


@Injectable()
export class AppStateActions {
    constructor(
        private readonly store: Store<IAppStore>,
        private readonly appStateSelectors: AppStateSelectors,
        private readonly flightService: FlightService,
        private readonly toastr: ToastrService,
        private readonly router: Router,
    ) {}

    // region PRIVATE MEMBERS
    private clearTimeoutHandle: any;

    private readonly killLoading: () => void = () => this.store.dispatch(AppKillLoading());

    private readonly idleTimeout: () => void = () => {
        // clear existing timeout
        clearTimeout(this.clearTimeoutHandle);

        // start new timeout
        this.clearTimeoutHandle = setTimeout(() => {
            // console.error('KILLING LOADING!');
            this.killLoading();
        }, 15000 * 60); // 15 minutes
    };
    // endregion

    /**
     * store the active subscription to
     * the current file upload operation here
     * for possible cancellation
     */
    private readonly activeFileUploadRequest: any;

    idle: () => void = () => this.store.dispatch(AppIdle());

    busy: () => void = () => {
        this.store.dispatch(AppBusy());

        // set timeout
        this.idleTimeout();
    };

    // updatePasswordText: (password: string) => void = (password: string) =>
    //     this.store.dispatch(UpdatePasswordText({ password }));

    /**
     * @description Connects to the login service and communicates a login event.
     * @param {FlightInfoPayload} flightInfoPayload
     */
    submitFlightInfo(flightInfoPayload: FlightInfoPayload) {

        this.flightService.submitFlightInfo(flightInfoPayload).subscribe(
            (response: any) => {
                this.toastr.success(response);
            },
            () => {
                this.toastr.error('Failure');
            },
        );
    }
}

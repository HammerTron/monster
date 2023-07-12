import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createAction, props, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { IAppStore } from '../../app-store';
import { AppStateSelectors } from '../selectors/app-state.selectors';
import { Login } from '../types/login.model';
import { LoginService } from '../../../areas/Login/services/Login/login.service';
import { IFlightInfoPayload, FlightInfoPayload } from '../types/flightInfoPayload';
import { FlightService } from '../../../areas/Flights/services/Flight/flight.service';

export const AppBusy: any = createAction('[App] Busy');
export const AppIdle: any = createAction('[App] Idle');
export const AppKillLoading: any = createAction('[App] Kill Loading');
export const submitFlightInfo: any = createAction('[App: Flight] Submit Flight Info', props<{ FlightInfoPayload: IFlightInfoPayload }>());

export const UpdateUsernameText: any = createAction('[App: Login] Update Username', props<{ username: string }>());
export const UpdatePasswordText: any = createAction('[App: Login] Update Password', props<{ password: string }>());


@Injectable()
export class AppStateActions {
    constructor(
        private readonly store: Store<IAppStore>,
        private readonly appStateSelectors: AppStateSelectors,
        private readonly loginService: LoginService,
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

    /**
     * @description sets idle state.
     */
    idle: () => void = () => this.store.dispatch(AppIdle());

    /**
     * @description sets busy state.
     */
    busy: () => void = () => {
        this.store.dispatch(AppBusy());

        // set timeout
        this.idleTimeout();
    };

    /**
     * @description updates state for username.
     * @param {username} string
     */
    updateUsernameText: (username: string) => void = (username: string) =>
        this.store.dispatch(UpdateUsernameText({ username }));

    /**
     * @description updates state for password.
     * @param {password} string
     */
    updatePasswordText: (password: string) => void = (password: string) =>
        this.store.dispatch(UpdatePasswordText({ password }));

    /**
     * @description Connects to the login service and communicates a login event.
     * @param {string} username
     * @param {string} password
     */
    submitLoginInfo(username: string, password: string) {
        const login: Login = new Login({
            username,
            password,
        });

        this.loginService.doLogin(login).subscribe(
            (response: any) => {
                // this.store.dispatch(AppSetAuthToken({ response })); // comment out for actual auth/auth2 or SOAP
                this.router.navigate(['/Dashboard']);
            },
            () => {
                this.toastr.error('Failure');
            },
        );
    }

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

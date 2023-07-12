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

@Injectable()
export class AppStateActions {
    static APP_BUSY: string = 'APPLICATION_BUSY';
    static APP_IDLE: string = 'APPLICATION_IDLE';
    static APP_DISABLE_BUSY: string = 'APP_DISABLE_BUSY';
    static APP_TOGGLE_IS_POPPED: string = 'APP_TOGGLE_IS_POPPED';
    static APP_KILL_LOADING: string = 'APP_KILL_LOADING';
    static APP_UPDATE_USERNAME: string = 'APP_UPDATE_USERNAME';
    static APP_UPDATE_PASSWORD: string = 'APP_UPDATE_PASSWORD';
    static APP_SET_AUTHENTICATED: string = 'APP_SET_AUTHENTICATED';

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
    updateUsernameText(username: string) : void {
        this.store.dispatch({
            type: AppStateActions.APP_UPDATE_USERNAME,
            payload: username
        });
    }

    /**
     * @description updates state for password.
     * @param {password} string
     */
    updatePasswordText(password: string) : void {
        this.store.dispatch({
            type: AppStateActions.APP_UPDATE_PASSWORD,
            payload: password
        });
    }

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

        if (username === 'test' && password === '1234') {
            this.store.dispatch({
                type: AppStateActions.APP_SET_AUTHENTICATED,
                payload: true
            });
            this.toastr.success('Success');
            this.router.navigate(['/Flights']);
        } else {
            this.toastr.error('Failure');
        }

        // comment out for now until real login service is available
        // this.loginService.doLogin(login).subscribe(
        //     (response: any) => {
        //         // this.store.dispatch(AppSetAuthToken({ response })); // comment out for actual auth/auth2 or SOAP
        //         this.router.navigate(['/Dashboard']);
        //     },
        //     () => {
        //         this.toastr.error('Failure');
        //     },
        // );
    }

    /**
     * @description Connects to the login service and communicates a login event.
     * @param {FlightInfoPayload} flightInfoPayload
     */
    submitFlightInfo(flightInfoPayload: FlightInfoPayload) {

        this.flightService.submitFlightInfo(flightInfoPayload).subscribe(
            (response: any) => {
                this.store.dispatch({
                    type: AppStateActions.APP_UPDATE_PASSWORD,
                    payload: true
                });
                this.toastr.success(response);
            },
            () => {
                this.toastr.error('Failure');
            },
        );
    }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createAction, props, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { IAppStore } from '../../app-store';
import { AppStateSelectors } from '../selectors/app-state.selectors';
import { Login } from '../types/login.model';
import { LoginService } from '../../../areas/Login/services/Login/login.service';
import { IFlightInfo, FlightInfo } from '../types/flight-info';
import { FlightService } from '../../../areas/Flights/services/Flight/flight.service';

export const AppBusy: any = createAction('[App] Busy');
export const AppIdle: any = createAction('[App] Idle');
export const AppKillLoading: any = createAction('[App] Kill Loading');
export const submitFlightInfo: any = createAction('[App: Flight] Submit Flight Info', props<{ FlightInfo: IFlightInfo }>());

@Injectable()
export class AppStateActions {
    static APP_BUSY: string = 'APPLICATION_BUSY';
    static APP_IDLE: string = 'APPLICATION_IDLE';
    static APP_DISABLE_BUSY: string = 'APP_DISABLE_BUSY';
    static APP_TOGGLE_IS_POPPED: string = 'APP_TOGGLE_IS_POPPED';
    static APP_KILL_LOADING: string = 'APP_KILL_LOADING';
    static APP_UPDATE_USERNAME: string = 'APP_UPDATE_USERNAME';
    static APP_UPDATE_PASSWORD: string = 'APP_UPDATE_PASSWORD';
    static APP_SET_AUTH: string = 'APP_SET_AUTH';
    static APP_SET_AUTHENTICATED: string = 'APP_SET_AUTHENTICATED';
    static APP_UPDATE_AIRLINE: string = 'APP_UPDATE_AIRLINE';
    static APP_UPDATE_ARRIVAL_DATE: string = 'APP_UPDATE_ARRIVAL_DATE';
    static APP_UPDATE_ARRIVAL_TIME: string = 'APP_UPDATE_ARRIVAL_TIME';
    static APP_UPDATE_FLIGHT: string = 'APP_UPDATE_FLIGHT';
    static APP_UPDATE_GUESTS: string = 'APP_UPDATE_GUESTS';
    static APP_UPDATE_COMMENTS: string = 'APP_UPDATE_COMMENTS';

    constructor(
        private readonly store: Store<IAppStore>,
        private readonly appStateSelectors: AppStateSelectors,
        private readonly loginService: LoginService,
        private readonly flightService: FlightService,
        private readonly toastr: ToastrService,
        private readonly router: Router,
    ) {
        this.appStateSelectors.isBusy$.subscribe((value: boolean) => {
            if (!value) {
                // clear existing timeout
                clearTimeout(this.clearTimeoutHandle);
            }
        });
    }

    /**
     * @description store ID value of time that was set
     */
    private clearTimeoutHandle: any;

    /**
     * @description sets up an idle timer on pending async activity
     */
    private idleTimeout(): void {
        // clear existing timeout
        clearTimeout(this.clearTimeoutHandle);

        // start new timeout
        this.clearTimeoutHandle = setTimeout(() => {
            this.killLoading();
        }, 15000 * 60);
    }

    /**
     * @description force loading animation to just go away
     */
    private killLoading(): void {
        this.store.dispatch({ type: AppStateActions.APP_KILL_LOADING });
    }

    /**
     * @description the app is tied up doing stuff
     */
    busy(): void {
        this.store.dispatch({ type: AppStateActions.APP_BUSY });

        // set timeout
        this.idleTimeout();
    }

    /**
     * @description app is free to process more stuff.
     */
    idle(): void {
        this.store.dispatch({ type: AppStateActions.APP_IDLE });
    }

    /**
     * @description used to enable or disable the universal page loading overlay located in AppComponent template
     * whenever we have some component level loading animation that should take precedence over
     * the global, universal loading a(nimation), we use this method to drive that
     * @param {boolean} payload
     */
    disableBusy(payload: boolean): void {
        this.store.dispatch({
            type: AppStateActions.APP_DISABLE_BUSY,
            payload,
        });
    }

    /**
     * dispatches TOGGLE_IS_POPPED Redux action to toggle expanded state
     * @param isPoppedToggle visible state of lightbox styling
     */
    toggleIsPopped(isPoppedToggle: boolean): void {
        this.store.dispatch({
            type: AppStateActions.APP_TOGGLE_IS_POPPED,
            payload: isPoppedToggle,
        });
    }

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

        this.loginService.doLogin(login).subscribe(
            (response: any) => {
                this.store.dispatch({
                    type: AppStateActions.APP_SET_AUTH,
                    payload: response.token
                });

                this.store.dispatch({
                    type: AppStateActions.APP_SET_AUTHENTICATED,
                    payload: true
                });

                this.router.navigate(['/FlightSubmission']);
            },
            () => {
                this.toastr.error('Failure');
            },
        );
    }

    /**
     * @description updates state for airline.
     * @param {airline} string
     */
    updateAirlineInput(airline: string) : void {
        this.store.dispatch({
            type: AppStateActions.APP_UPDATE_AIRLINE,
            payload: airline
        });
    }

    /**
     * @description updates state for arrival date.
     * @param {arrivalDate} string
     */
    updateArrivalDate(arrivalDate: string) : void {
        this.store.dispatch({
            type: AppStateActions.APP_UPDATE_ARRIVAL_DATE,
            payload: arrivalDate
        });
    }

    /**
     * @description updates state for arrival time.
     * @param {arrivalTime} string
     */
    updateArrivalTime(arrivalTime: string) : void {
        this.store.dispatch({
            type: AppStateActions.APP_UPDATE_ARRIVAL_TIME,
            payload: arrivalTime
        });
    }

    /**
     * @description updates state for flight number.
     * @param {flightNumber} string
     */
    updateFlightNumber(flightNumber: string) : void {
        this.store.dispatch({
            type: AppStateActions.APP_UPDATE_FLIGHT,
            payload: flightNumber
        });
    }

    /**
     * @description updates state for number of guests.
     * @param {guests} string
     */
    updateGuests(guests: string) : void {
        this.store.dispatch({
            type: AppStateActions.APP_UPDATE_GUESTS,
            payload: guests
        });
    }

    /**
     * @description updates state for comments.
     * @param {comments} string
     */
    updateComments(comments: string) : void {
        this.store.dispatch({
            type: AppStateActions.APP_UPDATE_COMMENTS,
            payload: comments
        });
    }

    /**
     * @description Connects to the flight service and communicates a flight info event.
     */
    submitFlightInfo() {
        this.appStateSelectors.flightInfo$.pipe(first()).subscribe((flightInfo: any) => {
            this.flightService.submitFlightInfo(flightInfo).subscribe(
                (response: any) => {
                    // this.store.dispatch({
                    //     type: AppStateActions.APP_UPDATE_PASSWORD,
                    //     payload: true
                    // });
                    this.router.navigate(['/Flights'])
                },
                () => {
                    this.toastr.error('Failure');
                },
            );            
        });

    }
}

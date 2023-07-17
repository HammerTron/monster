import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';

import { AppStateActions } from '../../../../../store/App/actions/app-state.actions';
import { filterUndefined } from '../../../../../utils/filter-undefined.util';

@Component({
    selector: 'flight-content',
    templateUrl: './flight-submission.component.html',
    styleUrls: ['./flight-submission.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSubmissionComponent {
    constructor(private readonly appActions: AppStateActions) {
        this.airlineInput = new FormControl('', Validators.required);
        this.arrivalDate = new FormControl('', Validators.required);
        this.arrivalTime = new FormControl('', Validators.required);
        this.flightNumber = new FormControl('', Validators.required);
        this.guests = new FormControl('', Validators.required);
        this.comments = new FormControl('', undefined);

        // build Flights Information FormControl group
        this.flightsForm = new FormGroup({
            airlineInput: this.airlineInput,
            arrivalDate: this.arrivalDate,
            arrivalTime: this.arrivalTime,
            flightNumber: this.flightNumber,
            guests: this.guests,
            comments: this.comments,
        });

        // subscribe to any form changes
        this.airlineInput.valueChanges.pipe(filterUndefined, distinctUntilChanged()).subscribe((value: string) => {
            // emit updated username value event
            this.appActions.updateAirlineInput(value.trim());
        });

        // subscribe to any form changes
        this.arrivalDate.valueChanges.pipe(filterUndefined, distinctUntilChanged()).subscribe((value: string) => {
            // emit updated password value event
            this.appActions.updateArrivalDate(moment(value).format('YYYY-MM-DDTHH:mm:ssZ'));
        });

        // subscribe to any form changes
        this.arrivalTime.valueChanges.pipe(filterUndefined, distinctUntilChanged()).subscribe((value: any) => {
            // emit updated password value event
            this.appActions.updateArrivalTime(value);
        });

        // subscribe to any form changes
        this.flightNumber.valueChanges.pipe(filterUndefined, distinctUntilChanged()).subscribe((value: string) => {
            // emit updated password value event
            this.appActions.updateFlightNumber(value.trim());
        });

        // subscribe to any form changes
        this.guests.valueChanges.pipe(filterUndefined, distinctUntilChanged()).subscribe((value: string) => {
            // emit updated password value event
            this.appActions.updateGuests(value.trim());
        });

        // subscribe to any form changes
        this.comments.valueChanges.pipe(filterUndefined, distinctUntilChanged()).subscribe((value: string) => {
            // emit updated password value event
            this.appActions.updateComments(value.trim());
        });
    }

    /**
     * Object contains form group
     */
    flightsForm: FormGroup;

    /**
     * username input field
     */
    airlineInput: FormControl;

    /**
     * arrivalDate input field
     */
    arrivalDate: FormControl;

    /**
     * arrivalTime input field
     */
    arrivalTime: FormControl;

    /**
     * flightNumber input field
     */
    flightNumber: FormControl;

    /**
     * guests input field
     */
    guests: FormControl;

    /**
     * comments input field
     */
    comments: FormControl;

    /**
     * event handler for submit user flights info event
     */
    onSubmitFlightInfo() {
        this.appActions.submitFlightInfo();
    }
}

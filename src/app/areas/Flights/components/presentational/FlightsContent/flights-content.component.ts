import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

import { AppStateActions } from '../../../../../store/App/actions/app-state.actions';
import { filterUndefined } from '../../../../../utils/filter-undefined.util';

@Component({
    selector: 'flights-content',
    templateUrl: './flights-content.component.html',
    styleUrls: ['./flights-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsContentComponent {
    constructor(private readonly appActions: AppStateActions) {
        this.usernameInput = new FormControl('', Validators.minLength(1));
        this.passwordInput = new FormControl('', Validators.minLength(1));

        // build Flights Information FormControl group
        this.flightsForm = new FormGroup({
            usernameInput: this.usernameInput,
            passwordInput: this.passwordInput,
        });

        // subscribe to any form changes
        this.usernameInput.valueChanges.pipe(filterUndefined, distinctUntilChanged()).subscribe((value: string) => {
            // emit updated username value event
            this.appActions.updateUsernameText(value.trim());
        });

        // subscribe to any form changes
        this.passwordInput.valueChanges.pipe(filterUndefined, distinctUntilChanged()).subscribe((value: string) => {
            // emit updated password value event
            this.appActions.updatePasswordText(value.trim());
        });
    }

    /**
     * Object contains form group
     */
    flightsForm: FormGroup;

    /**
     * username input field
     */
    usernameInput: FormControl;

    /**
     * password input field
     */
    passwordInput: FormControl;

    /**
     * event handler for submit user flights info event
     */
    onSubmitFlightInfo() {
        // this.appActions.submitFlightInfo(this.usernameInput.value, this.passwordInput.value);
    }
}

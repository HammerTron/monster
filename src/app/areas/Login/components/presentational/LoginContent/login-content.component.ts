import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

import { AppStateActions } from '../../../../../store/App/actions/app-state.actions';
import { filterUndefined } from '../../../../../utils/filter-undefined.util';

@Component({
    selector: 'login-content',
    templateUrl: './login-content.component.html',
    styleUrls: ['./login-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContentComponent {
    constructor(private readonly appActions: AppStateActions) {
        this.usernameInput = new FormControl('', Validators.minLength(1));
        this.passwordInput = new FormControl('', Validators.minLength(1));

        // build Login Information FormControl group
        this.loginForm = new FormGroup({
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
     * @type {FormGroup}
     */
    loginForm: FormGroup;

    /**
     * username input field
     * @type {FormControl}
     */
    usernameInput: FormControl;

    /**
     * password input field
     * @type {FormControl}
     */
    passwordInput: FormControl;

    /**
     * event handler for submit user login info event
     */
    onSubmitLoginInfo() {
        this.appActions.submitLoginInfo(this.usernameInput.value, this.passwordInput.value);
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    templateUrl: 'login-entry.component.html',
    styleUrls: ['login-entry.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * implementation for LoginEntryComponent: responsible for login page layout
 */
export class LoginEntryComponent {
    /**
     * loginEntryComponent constructor
     */
    constructor() {}
}

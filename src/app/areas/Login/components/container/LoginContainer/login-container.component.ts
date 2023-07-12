import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'login-container',
    templateUrl: './login-container.component.html',
    styleUrls: ['./login-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
    constructor() {}
}

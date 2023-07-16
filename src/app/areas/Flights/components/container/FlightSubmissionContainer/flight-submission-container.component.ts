import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'flight-submission',
    templateUrl: './flight-submission-container.component.html',
    styleUrls: ['./flight-submission-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSubmissionContainer {
    constructor() {}
}

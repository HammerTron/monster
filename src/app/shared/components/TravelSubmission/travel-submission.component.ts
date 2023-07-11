import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'travel-submission',
    templateUrl: 'travel-submission.component.html',
    styleUrls: ['travel-submission.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * TravelSubmission component : Shared component used for travel submission
 */
 export class TravelSubmissionComponent {
     constructor() {}
 }

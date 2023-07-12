import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'flights-container',
    templateUrl: './flights-container.component.html',
    styleUrls: ['./flights-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsContainerComponent {
    constructor() {}
}

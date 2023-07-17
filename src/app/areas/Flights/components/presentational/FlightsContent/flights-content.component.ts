import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';

import { AppStateActions } from '../../../../../store/App/actions/app-state.actions';
import { filterUndefined } from '../../../../../utils/filter-undefined.util';
import { FlightInfo } from '../../../../../store/App/types/flight-info';

@Component({
    selector: 'flights-content',
    templateUrl: './flights-content.component.html',
    styleUrls: ['./flights-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsContentComponent {
    constructor(private readonly appActions: AppStateActions) {}

    /**
     * Object contains form group
     */
    @Input() flightInfo: FlightInfo;

    /**
     * @description method used to format date string
     * @param {string} date
     * @return {string}
     */
    formatDate(date: string): string {
        return moment(date).format('MMM DD, YYYY');
    }
}

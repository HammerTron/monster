import { ChangeDetectorRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { AppStateSelectors } from '../../../../../store/App/selectors/app-state.selectors' 
import { FlightInfo } from '../../../../../store/App/types/flight-info' 

@Component({
    selector: 'flights-container',
    templateUrl: './flights-container.component.html',
    styleUrls: ['./flights-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * implementation for FlightsContainerComponent: Flights Container Component
 */
export class FlightsContainerComponent {
    /**
     * FlightsContainerComponent constructor
     *
     * @param {AppStateSelectors} appSelectors
     * @param {ChangeDetectorRef} cd
     */
    constructor(
        private readonly appSelectors: AppStateSelectors,
        private readonly cd: ChangeDetectorRef,
    ) {
        this.appSelectors.flightInfo$.pipe(first()).subscribe((flightInfo: FlightInfo) => {
            this.flightInfo = flightInfo;

            // mark the path from root of component tree to this component
            // for change detected on the next tick
            // we do this because we're set to ChangeDetectionStrategy.OnPush
            this.cd.markForCheck();
        });
    }

    /**
     * flightInfo 
     */
    flightInfo: FlightInfo;
}

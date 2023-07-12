import { ChangeDetectionStrategy, Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AppStateSelectors } from '../../store/App/selectors/app-state.selectors' 

@Component({
    templateUrl: 'flights-entry.component.html',
    styleUrls: ['flights-entry.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * implementation for FlightsEntryComponent: responsible for flights page layout
 */
export class FlightsEntryComponent {
    /**
     * FlightsEntryComponent constructor
     */
    constructor(
        private readonly appSelectors: AppStateSelectors,
        private readonly router: Router,
    ) {

        this.appSelectors.authenticated$.pipe(first()).subscribe((authenticated: boolean) => {
            if (!authenticated) {
                this.router.navigate(['/Login']);
            }
        });
    }
}

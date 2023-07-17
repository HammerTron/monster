import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class FlightsEntryComponent implements OnInit {
    /**
     * FlightsEntryComponent constructor
     */
    constructor(
        private readonly appSelectors: AppStateSelectors,
        private readonly router: Router,
    ) {
    }

    /**
     * component init lifecycle hook
     */
    ngOnInit() {
        // set active epic to dashboard
        console.log('wht');
        this.appSelectors.authenticated$.pipe(first()).subscribe((authenticated: boolean) => {
            if (!authenticated) {
                this.router.navigate(['/Login']);
            }
        });
    }
}

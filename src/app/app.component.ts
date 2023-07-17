import { ChangeDetectorRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AppStateSelectors } from './store/App/selectors/app-state.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * Implementation of AppComponent: Top Level Root Component for the application
 */
export class AppComponent {
    /**
     * AppComponent constructor
     *
     * @param {ChangeDetectorRef} cd
     * @param {AppStateSelectors} appSelectors
     * @param {IdleService} idleService
     */
    constructor(
        private readonly cd: ChangeDetectorRef,
        private readonly appSelectors: AppStateSelectors,
    ) {
        this.appSelectors.isPopped$.pipe(first()).subscribe((isPopped: boolean) => {
            if (!isPopped) {
              this.isPopped = isPopped;
            }

            // mark the path from root of component tree to this component
            // for change detected on the next tick
            // we do this because we're set to ChangeDetectionStrategy.OnPush
            this.cd.markForCheck();
        });
    }

    /**
     * current nav state isPopped value
     */
    isPopped: boolean;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { AppStateSelectors } from '../../../store/App/selectors/app-state.selectors';

@Component({
    selector: 'page-loading-overlay',
    templateUrl: 'page-loading-overlay.component.html',
    styleUrls: ['page-loading-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * PageLoadingOverlayComponent component : displays global app-wide busy/loading indicator
 */
export class PageLoadingOverlayComponent {
    constructor(private readonly appStateSelectors: AppStateSelectors) {}

    @Input() textToDisplay: string;

    isAppBusy$: Observable<boolean> = this.appStateSelectors.isBusy$;
}

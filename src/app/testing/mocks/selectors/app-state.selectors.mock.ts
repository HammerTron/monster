import { List } from 'immutable';
import { of, Observable } from 'rxjs';

// mock of AppStateSelectors to be used in spec files
export class MockAppStateSelectors {
    constructor() {}

    isBusy: Observable<boolean> = of(false);
    activeTooltipIds: Observable<List<string>> = of(List<string>());
    authToken: Observable<string> = of('');
    emailAddress: Observable<string> = of('');
}

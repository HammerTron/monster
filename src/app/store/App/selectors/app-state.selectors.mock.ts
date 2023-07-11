import { of, Observable } from 'rxjs';

import { IAppStateSelectors } from './app-state.selectors';

export class MockAppStateSelector implements IAppStateSelectors {
    isBusy$: Observable<boolean> = of(false);
    authToken$: Observable<string> = of('4567');
}

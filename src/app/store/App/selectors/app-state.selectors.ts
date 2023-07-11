import { Injectable } from '@angular/core';
import { DefaultProjectorFn, createSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppStore } from '../../app-store';

// region EXPORTED SELECTORS
export const isBusy: (state: IAppStore) => boolean = (state: IAppStore) => state.appState.isBusy;
export const authToken: (state: IAppStore) => string = (state: IAppStore) => state.appState.authToken;
// endregion

// region SELECTOR METHODS
export const selectIsBusy: any = createSelector(isBusy, (value: boolean) => value);
export const selectAuthToken: any = createSelector(authToken, (value: string) => value);
// endregion

export interface IAppStateSelectors {
    isBusy$: Observable<boolean>;
    authToken$: Observable<string>;
}

@Injectable()
export class AppStateSelectors implements IAppStateSelectors {
    constructor(private readonly store: Store<IAppStore>) {}

    isBusy$: Observable<boolean> = this.store.pipe(select(selectIsBusy));
    authToken$: Observable<string> = this.store.pipe(select(selectAuthToken));
}

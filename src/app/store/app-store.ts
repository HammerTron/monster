import { Record } from 'immutable';
import { routerReducer } from '@ngrx/router-store';

import { AppState, IAppState } from './App/types/app-state.model';
import { APP_STATE_REDUCER } from './App/reducers/app-state.reducer';

export interface IAppStore {
    appState: IAppState;
}

export const APP_STORE: any = {
    appState: APP_STATE_REDUCER,
};

import { ActionReducer, ActionType, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';

import { IAppState } from '../types/app-state.model';
import { INITIAL_APP_STATE } from '../app-initial-state';
import { AppBusy, AppIdle, AppKillLoading, submitFlightInfo } from '../actions/app-state.actions';

const setIsBusy: (state: IAppState) => boolean = (state: IAppState): boolean => state.busyCount > 0;

export const APP_STATE_REDUCER: ActionReducer<IAppState> = createReducer(
    INITIAL_APP_STATE,
    on(AppBusy, (state: IAppState) =>
        produce(state, (draft: any) => {
            // increment count of busy async items
            draft.busyCount = draft.busyCount + 1;

            // update busy state of app
            draft.isBusy = setIsBusy(draft);
        }),
    ),
    on(AppIdle, (state: IAppState) =>
        produce(state, (draft: any) => {
            if (draft.busyCount > 0) {
                // decrement count of busy async items
                draft.busyCount = draft.busyCount - 1;
            }

            // update busy state of app
            draft.isBusy = setIsBusy(draft);
        }),
    ),
    on(AppKillLoading, (state: IAppState) =>
        produce(state, (draft: any) => {
            draft.busyCount = 0;
            draft.isBusy = false;
        }),
    ),
);

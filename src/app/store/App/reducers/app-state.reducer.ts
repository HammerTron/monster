import { ActionReducer, ActionType, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';

import { IAppState } from '../types/app-state.model';
import { INITIAL_APP_STATE } from '../app-initial-state';
import { AppBusy, AppIdle, AppKillLoading, submitFlightInfo, UpdateUsernameText, UpdatePasswordText } from '../actions/app-state.actions';
import { ILogin, Login } from '../types/login.model';

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
    on(UpdateUsernameText, (state: IAppState, { username }: { username: string }) =>
        produce(state, (draft: any) => {
            draft.login.username = username;
        }),
    ),
    on(UpdatePasswordText, (state: IAppState, { password }: { password: string }) =>
        produce(state, (draft: any) => {
            draft.login.password = password;
        }),
    ),
);

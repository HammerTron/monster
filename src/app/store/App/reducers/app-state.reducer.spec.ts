import { IAppState } from '../types/app-state.model';
import { INITIAL_APP_STATE } from '../app-initial-state';
import { AppBusy, AppIdle, AppKillLoading } from '../actions/app-state.actions';

import { APP_STATE_REDUCER } from './app-state.reducer';

describe('Reducer: APP_STATE_REDUCER', () => {
    const newAppState: IAppState = INITIAL_APP_STATE;

    it('should return the initial state', () => {
        expect(APP_STATE_REDUCER(INITIAL_APP_STATE, {} as any)).toEqual(INITIAL_APP_STATE);
    });

    xit('should handle AppBusy action', () => {
        const state: IAppState = APP_STATE_REDUCER(newAppState, AppBusy());

        expect(state.busyCount).toBe(1);
        expect(state.isBusy).toBeTrue();
    });

    xit('should handle AppIdle action', () => {
        let state: IAppState = APP_STATE_REDUCER(newAppState, AppBusy());

        state = APP_STATE_REDUCER(state, AppIdle());

        expect(state.busyCount).toBe(0);
        expect(state.isBusy).toBeFalse();
    });
});

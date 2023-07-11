import { INITIAL_APP_STATE } from '../app-initial-state';
import { AppState, IAppState } from './app-state.model';

describe('AppState Model', () => {
    // test definitions
    it('should return an Immutable Record type of AppState on init from Immutable', () => {
        const keyValue: AppState = new AppState();

        expect(keyValue instanceof AppState).toEqual(true);
    });
});

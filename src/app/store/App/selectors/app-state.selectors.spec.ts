import { getTestBed, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { produce } from 'immer';

import { APP_STORE, IAppStore } from '../../app-store';
import { APP_STORE_MOCK } from '../../app-store.mock';

import { AppStateSelectors, authToken, isBusy, selectAuthToken, selectIsBusy } from './app-state.selectors';

describe('App State Selectors', () => {
    let serviceToTest: AppStateSelectors;
    const initialState: IAppStore = APP_STORE_MOCK;

    const oldResetTestingModule: () => TestBed = TestBed.resetTestingModule;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot(APP_STORE)],
            providers: [
                AppStateSelectors,
                provideMockStore<IAppStore>({
                    initialState,
                }),
            ],
        });

        // prevent Angular from resetting testing module
        TestBed.resetTestingModule = () => TestBed;

        const injector: TestBed = getTestBed();

        serviceToTest = injector.inject(AppStateSelectors);
    });

    // test definitions
    it('should be initialized', () => {
        expect(serviceToTest).toBeDefined();
    });

    it('isBusy$ method should return AppState.isBusy subscription', () => {
        const result: boolean = isBusy(
            produce(APP_STORE_MOCK, (draft: any) => {
                draft.appState.isBusy = true;
            }),
        );

        expect(result).toBeTrue();

        const expectedValue: boolean = true;

        expect(selectIsBusy.projector(expectedValue)).toBe(expectedValue);
    });

    it('authToken$ method should return AppState.authToken subscription', () => {
        const result: string = authToken(
            produce(APP_STORE_MOCK, (draft: any) => {
                draft.appState.authToken = 'dev-1.00';
            }),
        );

        expect(result).toBe('dev-1.00');

        const expectedValue: string = 'dev-1.00';

        expect(selectAuthToken.projector(expectedValue)).toBe(expectedValue);
    });

    afterAll(() => {
        // reinstate resetTestingModule method
        TestBed.resetTestingModule = oldResetTestingModule;
        TestBed.resetTestingModule();
    });
});

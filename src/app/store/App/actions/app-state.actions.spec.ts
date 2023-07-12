import { getTestBed, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { APP_STORE, IAppStore } from '../../app-store';
import { MockAppStateActions } from '../../../testing/mocks/actions/app-state.actions.mock';
import { AppStateSelectors } from '../../../store/App/selectors/app-state.selectors';
import { MockAppStateSelectors } from '../../../testing/mocks/selectors/app-state.selectors.mock';
import { BackendService } from '../../../shared/services/Backend/backend.service';
import { MockBackendService } from '../../../shared/services/Backend/backend.service.mock';
import { LoginService } from '../../../areas/Login/services/Login/login.service';
import { MockLoginService } from '../../../testing/mocks/services/login.service.mock';
import { MockToastrService } from '../../../testing/mocks/services/toastr.service.mock';

import { AppBusy, AppIdle, AppStateActions } from './app-state.actions';

describe('Action: AppStateActions', () => {
    let serviceToTest: AppStateActions, store: Store<IAppStore>;

    const oldResetTestingModule: () => TestBed = TestBed.resetTestingModule;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StoreModule.forRoot(APP_STORE)],
            providers: [
                AppStateActions,
                {
                    provide: BackendService,
                    useClass: MockBackendService,
                },
                {
                    provide: AppStateSelectors,
                    useClass: MockAppStateSelectors,
                },
                {
                    provide: LoginService,
                    useClass: MockLoginService,
                },
                {
                    provide: ToastrService,
                    useClass: MockToastrService,
                },
            ],
        });

        // prevent Angular from resetting testing module
        TestBed.resetTestingModule = () => TestBed;

        const injector: TestBed = getTestBed();

        serviceToTest = injector.inject(AppStateActions);
        store = injector.inject(Store);
    });

    // test definitions
    it('should be initialized', () => {
        expect(serviceToTest).toBeDefined();
    });

    it('idle method dispatch AppIdle action', () => {
        const expectedAction = AppIdle();

        spyOn(store, 'dispatch');

        serviceToTest.idle();

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('busy method dispatch AppBusy action', () => {
        const expectedAction = AppBusy();

        spyOn(store, 'dispatch');

        serviceToTest.busy();

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    afterAll(() => {
        // reinstate resetTestingModule method
        TestBed.resetTestingModule = oldResetTestingModule;
        TestBed.resetTestingModule();
    });
});

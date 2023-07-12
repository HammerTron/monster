import { ChangeDetectionStrategy } from '@angular/core';
import { async, getTestBed, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FlightsContentComponent } from './flights-content.component';
import { PageLoadingOverlayComponent } from '../../../../../shared/components/PageLoadingOverlay/page-loading-overlay.component';
import { AppStateSelectors } from '../../../../../store/App/selectors/app-state.selectors';
import { AppStateActions } from '../../../../../store/App/actions/app-state.actions';
import { MockAppStateActions } from '../../../../../testing/mocks/actions/app-state.actions.mock';
import { MockAppStateSelectors } from '../../../../../testing/mocks/selectors/app-state.selectors.mock';

describe('Component: FlightsContentComponent', () => {
    const oldResetTestingModule: () => TestBed = TestBed.resetTestingModule;

    let compInstance: FlightsContentComponent,
        fixture: ComponentFixture<FlightsContentComponent>,
        mockAppStateActions: MockAppStateActions;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), ReactiveFormsModule],
            declarations: [FlightsContentComponent, PageLoadingOverlayComponent],
            providers: [
                {
                    provide: AppStateActions,
                    useClass: MockAppStateActions,
                },
                {
                    provide: AppStateSelectors,
                    useClass: MockAppStateSelectors,
                },
            ],
        }).compileComponents();

        TestBed.overrideComponent(FlightsContentComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default },
        });
    });

    // use the async() wrapper to allow the Angular template compiler time to read the files
    beforeEach(async(() => {
        // create component fixture
        fixture = TestBed.createComponent(FlightsContentComponent);

        // grab instance of component class
        compInstance = fixture.componentInstance;

        // trigger initial bindings
        fixture.detectChanges();
    }));

    it('should be defined', () => {
        expect(compInstance).toBeDefined();
    });

    // test definitions
    xit('usernameInput.valueChanges should dispatch expected actions', () => {
        // arrange the test using spyOn(); would otherwise use subscribe if we needed to inspect the event itself
        spyOn(mockAppStateActions, 'updateUsernameText');
        // trigger the form submit
        compInstance.usernameInput.setValue('username');
        expect(mockAppStateActions.updateUsernameText).toHaveBeenCalled();
    });

    // test definitions
    xit('passwordInput.valueChanges should dispatch expected actions', () => {
        // arrange the test using spyOn(); would otherwise use subscribe if we needed to inspect the event itself
        spyOn(mockAppStateActions, 'updatePasswordText');
        // trigger the form submit
        compInstance.passwordInput.setValue('password');
        expect(mockAppStateActions.updatePasswordText).toHaveBeenCalled();
    });

    // test definitions
    xit('FnSubmitflightsInfo method should dispatch expected actions', () => {
        // arrange the test using spyOn(); would otherwise use subscribe if we needed to inspect the event itself
        // this.usernameInput.value
        spyOn(mockAppStateActions, 'FubmitflightsInfo');
        // trigger the form submit
        compInstance.FnSubmitflightsInfo();
        expect(mockAppStateActions.FubmitflightsInfo).toHaveBeenCalled();
    });

    afterAll(() => {
        // reinstate resetTestingModule method
        TestBed.resetTestingModule = oldResetTestingModule;
        TestBed.resetTestingModule();
    });
});

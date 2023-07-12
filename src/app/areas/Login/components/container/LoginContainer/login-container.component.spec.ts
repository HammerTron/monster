import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginContentComponent } from '../../presentational/LoginContent/login-content.component';
import { LoginContainerComponent } from './login-container.component';
import { AppStateSelectors } from '../../../../../store/App/selectors/app-state.selectors';
import { AppStateActions } from '../../../../../store/App/actions/app-state.actions';
import { MockAppStateActions } from '../../../../../testing/mocks/actions/app-state.actions.mock';
import { MockAppStateSelectors } from '../../../../../testing/mocks/selectors/app-state.selectors.mock';

describe('Component: LoginContainerComponent', () => {
    const oldResetTestingModule: () => TestBed = TestBed.resetTestingModule;

    let compInstance: LoginContainerComponent, fixture: ComponentFixture<LoginContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), ReactiveFormsModule],
            declarations: [LoginContainerComponent, LoginContentComponent],
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

        TestBed.overrideComponent(LoginContainerComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default },
        });
    });

    // use the async() wrapper to allow the Angular template compiler time to read the files
    beforeEach(() => {
        // create component fixture
        fixture = TestBed.createComponent(LoginContainerComponent);

        // grab instance of component class
        compInstance = fixture.componentInstance;

        // trigger initial bindings
        fixture.detectChanges();
    });

    it('should be defined', async(() => {
        expect(compInstance).toBeDefined();
    }));

    afterAll(() => {
        // reinstate resetTestingModule method
        TestBed.resetTestingModule = oldResetTestingModule;
        TestBed.resetTestingModule();
    });
});

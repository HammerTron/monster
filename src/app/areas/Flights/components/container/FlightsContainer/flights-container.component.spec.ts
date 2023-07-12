import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FlightsContentComponent } from '../../presentational/FlightsContent/flights-content.component';
import { FlightsContainerComponent } from './flights-container.component';
import { AppStateSelectors } from '../../../../../store/App/selectors/app-state.selectors';
import { AppStateActions } from '../../../../../store/App/actions/app-state.actions';
import { MockAppStateActions } from '../../../../../testing/mocks/actions/app-state.actions.mock';
import { MockAppStateSelectors } from '../../../../../testing/mocks/selectors/app-state.selectors.mock';

describe('Component: FlightsContainerComponent', () => {
    const oldResetTestingModule: () => TestBed = TestBed.resetTestingModule;

    let compInstance: FlightsContainerComponent, fixture: ComponentFixture<FlightsContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot(), ReactiveFormsModule],
            declarations: [FlightsContainerComponent, FlightsContentComponent],
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

        TestBed.overrideComponent(FlightsContainerComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default },
        });
    });

    // use the async() wrapper to allow the Angular template compiler time to read the files
    beforeEach(() => {
        // create component fixture
        fixture = TestBed.createComponent(FlightsContainerComponent);

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

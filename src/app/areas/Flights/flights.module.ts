import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { FlightsRoutingModule } from './flights-routing.module';
import { FlightsEntryComponent } from './flights-entry.component';
import { FlightsContainerComponent } from './components/container/FlightsContainer/flights-container.component';
import { FlightsContentComponent } from './components/presentational/FlightsContent/flights-content.component';
import { FlightSubmissionComponent } from './components/presentational/FlightSubmission/flight-submission.component';
import { FlightSubmissionContainer } from './components/container/FlightSubmissionContainer/flight-submission-container.component';

@NgModule({
    imports: [SharedModule, FlightsRoutingModule],
    declarations: [FlightsContainerComponent, FlightsContentComponent, FlightsEntryComponent, FlightSubmissionContainer, FlightSubmissionComponent],
})
export class FlightsModule {}

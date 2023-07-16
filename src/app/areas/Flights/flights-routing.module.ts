import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlightsContainerComponent } from './components/container/FlightsContainer/flights-container.component';
import { FlightSubmissionContainer } from './components/container/FlightSubmissionContainer/flight-submission-container.component';
import { FlightsEntryComponent } from './flights-entry.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: '/FlightSubmission',
                pathMatch: 'full',
            },
            {
                path: '',
                component: FlightsEntryComponent,
                children: [
                    {
                        path: 'Flights',
                        component: FlightsContainerComponent,
                    },
                    {
                        path: 'FlightSubmission',
                        component: FlightSubmissionContainer,
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class FlightsRoutingModule {}

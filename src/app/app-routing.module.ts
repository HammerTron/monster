import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule } from './areas/Login/login.module';
import { FlightsContainerComponent } from './areas/Flights/components/container/FlightsContainer/flights-container.component';
import { FlightSubmissionContainer } from './areas/Flights/components/container/FlightSubmissionContainer/flight-submission-container.component';
import { NotAuthorizedComponent } from './areas/NotAuthorized/not-authorized.component';
import { PageNotFoundComponent } from './areas/PageNotFound/page-not-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([

            /**
             * direct route i.e. route used when a matching route is found
             */
            {
                path: '',
                loadChildren: () => LoginModule,
            },
            {
                path: 'Flights',
                component: FlightsContainerComponent,
            },
            {
                path: 'FlightSubmission',
                component: FlightSubmissionContainer,
            },

            /**
             * unauthorized route i.e. route used improperly
             */
            {
                path: 'NotAuthorized',
                component: NotAuthorizedComponent,
            },

            /**
             * not-found route i.e. route used when no matching route found
             */
            {
                path: 'PageNotFound',
                component: PageNotFoundComponent,
            },
            {
                path: '**',
                redirectTo: '/PageNotFound',
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

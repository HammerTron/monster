import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlightsContainerComponent } from './components/container/FlightsContainer/flights-container.component';
import { FlightsEntryComponent } from './flights-entry.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: FlightsEntryComponent,
                children: [
                    {
                        path: '',
                        component: FlightsContainerComponent,
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class FlightsRoutingModule {}

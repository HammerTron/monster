import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

import { PageLoadingOverlayComponent } from './components/PageLoadingOverlay/page-loading-overlay.component';
import { NotAuthorizedComponent } from './components/NotAuthorized/not-authorized.component';
import { TravelSubmissionComponent } from './components/TravelSubmission/travel-submission.component';

@NgModule({
    imports: [
        BsDatepickerModule.forRoot(),
        CommonModule, FormsModule, 
        RouterModule, 
        ReactiveFormsModule, 
        ToastrModule.forRoot(), 
        TranslateModule
    ],
    declarations: [PageLoadingOverlayComponent, NotAuthorizedComponent, TravelSubmissionComponent],
    exports: [
        BsDatepickerModule,
        CommonModule,
        FormsModule,
        PageLoadingOverlayComponent,
        RouterModule,
        ReactiveFormsModule,
        ToastrModule,
        TranslateModule,
        TravelSubmissionComponent,
    ],
})
export class SharedModule {}

import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'not-authorized',
    templateUrl: './not-authorized.component.html',
    styleUrls: ['./not-authorized.component.scss'],
})
export class NotAuthorizedComponent {
    constructor(private readonly location: Location) {}

    goBack() {
        this.location.back();
    }
}

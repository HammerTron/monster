import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-authorized',
    template: ` <h1>You are not authrized to view this page.</h1> `,
    styles: [],
})
export class NotAuthorizedComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

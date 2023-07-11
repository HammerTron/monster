import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { APIMockMockService } from './api-mock-mock.service';
import * as utils from './api-mock-utils.service';
import { APIMockWrapService } from './api-mock-wrap.service';

@Injectable()
export class APIMockService {
    constructor(private readonly http: HttpClient) {}

    // mocking utilities
    utils: any = utils;

    // mock api endpoint functionality
    mock: APIMockMockService = new APIMockMockService();

    // wrap api endpoint functionality
    wrap: APIMockWrapService = new APIMockWrapService(this.http);
}

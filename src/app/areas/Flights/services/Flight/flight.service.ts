import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiRoutes } from '../../../../../environments/api-routes';
import { FlightInfo } from '../../../../store/App/types/flight-info';
import { environment } from '../../../../../environments/environment';
import { MockRoutes } from '../../../../../environments/mock-routes';
import { BackendService } from '../../../../shared/services/Backend/backend.service';

import { FLIGHT_MOCK } from './flight.service.mock';

@Injectable()

/**
 * Implementation of FlightService:
 */
export class FlightService {
    /**
     * FlightService constructor
     * @param {BackendService} backendService
     */
    constructor(private readonly backendService: BackendService) {}

    /**
     * @description submit the current users login data
     * @param {FlightInfo} payload
     * @returns {Observable<FlightInfo>}
     */
    submitFlightInfo(payload: FlightInfo): Observable<string> {
        const handle: MockRoutes = environment.MOCK_CONFIG.submitFlightInfo,
            apiUrl: ApiRoutes = environment.API_CONFIG.submitFlightUrl;

            console.log(payload)

        return this.backendService
            .post(apiUrl, handle, FLIGHT_MOCK, payload)
            .pipe(map((response: any) => response ));
    }
}

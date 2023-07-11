import { Observable, of } from 'rxjs';

import { MockRoutes } from '../../../../environments/mock-routes';

/**
 * mock implementation of BackendService
 */
export class MockBackendService {
    /* eslint-disable */
    get(_endpoint: string, handle: MockRoutes, mock: any): Observable<any> {
        return of(mock[handle]);
    }

    post(_endpoint: string, handle: MockRoutes, mock: any, _payload: any): Observable<any> {
        return of(mock[handle]);
    }

    put(_endpoint: string, handle: MockRoutes, mock: any, _payload: any): Observable<any> {
        return of(mock[handle]);
    }

    remove(_endpoint: string, handle: MockRoutes, mock: any, _payload: any): Observable<any> {
        return of(mock[handle]);
    }
}

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { MockRoutes } from '../../../../environments/mock-routes';
import { APIMockService } from '../Mock/api-mock.service';

@Injectable()

/**
 * implementation of BackendService: common HTTP utility service
 */
export class BackendService {
    /**
     * backendService constructor
     *
     * @param {HttpClient} http
     * @param {APIMockService} apiMockService
     */
    constructor(private readonly http: HttpClient, private readonly apiMockService: APIMockService) {}

    /**
     *
     * @param url actual url to use for live data access to an api
     * @param handle endpoint name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {any} http client for consuming service to use
     */
    private getEndPoint<T>(url: string, handle: MockRoutes, mock: any, data: any, options?: any): any {
        let endpoint: any;

        // go ahead and turn off random error generation
        this.apiMockService.utils.setRandomErrorsConfig(false);

        // determine appropriate endpoint to access
        if (environment.ENV.includes(':mock') || environment.ENV === 'test-watch' || environment.ENV === 'test') {
            // return mocked api endpoint
            endpoint = this.apiMockService.mock.createMock(mock[handle]);
        } else if (environment.ENV.includes(':wrap')) {
            // return wrapped api endpoint
            endpoint = this.apiMockService.wrap.createWrap(url, mock[handle + 'Wrap'], data, options);
        } else {
            // configure to receive full response as JSON
            options = options || {};

            options.observe = 'response';
            options.responseType = 'json';

            // return live api endpoint
            endpoint = {
                get: () => {
                    if (data !== undefined) {
                        return this.http.get<T>(url + data, options);
                    } else {
                        return this.http.get<T>(url, options);
                    }
                },
                getAll: () => {
                    if (data !== undefined) {
                        return this.http.get<T>(url + data, options);
                    } else {
                        return this.http.get<T>(url, options);
                    }
                },
                post: () => {
                    if (options !== undefined) {
                        return this.http.post<any>(url, data, options);
                    } else {
                        return this.http.post<any>(url, data, options);
                    }
                },
                put: () => this.http.put<any>(url, data, options),
                remove: () => this.http.delete<any>(url, options),
            };
        }

        return endpoint;
    }

    /**
     * common method for handling success responses
     * @param response
     * @param observer
     */
    private handleSuccessResponse(response: HttpResponse<any>, observer: any) {
        // check for 200 with errors
        if (response.body.errors) {
            observer.error(response.body.errors);
        } else {
            observer.next(response.body);
        }
    }

    /**
     * common method for handling error responses
     * @param error
     * @param observer
     */
    private handleErrorResponse(error: HttpErrorResponse, observer: any) {
        // bubble up http error
        // const msg : any = error.error === undefined ? error : error.error;

        // switch (error.status) {
        //     case 401 :   // user not recognized
        //         // this.router.navigate(['Logout']);
        //         msg = error;
        //         break;
        //     case 403 :
        //         // unauthorized to perform the requested action
        //         msg = error;
        //         break;
        //     default :
        //         // do nothing?
        //         break;
        // }

        observer.error(error);
    }

    /**
     * perform an HTTP GET operation against appropriate backend type (mock, wrap, or live)
     *
     * @param url actual url to use for live data access to an api
     * @param handle name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {Observable<any>}
     */
    get<T>(url: string, handle: MockRoutes, mock: any, data?: any, options?: any) {
        const api: any = this.getEndPoint<T>(url, handle, mock, data, options);

        return new Observable((observer: any) => {
            if (typeof api !== 'undefined') {
                api.getAll()
                    .pipe(first())
                    .subscribe(
                        (res: any) => {
                            this.handleSuccessResponse(res, observer);
                        },
                        (error: any) => {
                            this.handleErrorResponse(error, observer);
                        },
                    );
            } else {
                // indicate there was a problem
                observer.error('no configuration data present for specified endpoint');
            }
        }).pipe(first());
    }

    /**
     * perform an HTTP POST operation against appropriate backend type (mock, wrap, or live)
     *
     * @param url name that maps to an actual api endpoint location
     * @param handle name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {Observable<any>}
     */
    post(url: string, handle: MockRoutes, mock: any, data?: any, options?: any) {
        const api: any = this.getEndPoint(url, handle, mock, data, options);

        return new Observable((observer: any) => {
            if (typeof api !== 'undefined') {
                api.post()
                    .pipe(first())
                    .subscribe(
                        (res: any) => {
                            this.handleSuccessResponse(res, observer);
                        },
                        (error: any) => {
                            this.handleErrorResponse(error, observer);
                        },
                    );
            } else {
                // indicate there was a problem
                observer.error('no configuration data present for specified endpoint');
            }
        }).pipe(first());
    }

    /**
     * perform an HTTP PUT operation against appropriate backend type (mock, wrap, or live)
     *
     * @param url actual url to use for live data access to an api
     * @param handle name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {Observable<any>}
     */
    put(url: string, handle: MockRoutes, mock: any, data?: any, options?: any) {
        const api: any = this.getEndPoint(url, handle, mock, data, options);

        return new Observable((observer: any) => {
            if (typeof api !== 'undefined') {
                api.put()
                    .pipe(first())
                    .subscribe(
                        (res: any) => {
                            this.handleSuccessResponse(res, observer);
                        },
                        (error: any) => {
                            this.handleErrorResponse(error, observer);
                        },
                    );
            } else {
                // indicate there was a problem
                observer.error('no configuration data present for specified endpoint');
            }
        }).pipe(first());
    }

    /**
     * perform an HTTP DELETE operation against appropriate backend type (mock, wrap, or live)
     *
     * @param url name that maps to an actual api endpoint location
     * @param handle name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {Observable<any>}
     */
    remove(url: string, handle: MockRoutes, mock: any, data?: any, options?: any) {
        const api: any = this.getEndPoint(url, handle, mock, data, options);

        return new Observable((observer: any) => {
            if (typeof api !== 'undefined') {
                api.remove()
                    .pipe(first())
                    .subscribe(
                        (res: any) => {
                            this.handleSuccessResponse(res, observer);
                        },
                        (error: any) => {
                            this.handleErrorResponse(error, observer);
                        },
                    );
            } else {
                // indicate there was a problem
                observer.error('no configuration data present for specified endpoint');
            }
        }).pipe(first());
    }
}

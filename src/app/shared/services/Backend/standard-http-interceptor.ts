import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, first } from 'rxjs/operators';

import { AppStateActions } from '../../../store/App/actions/app-state.actions';
import { AppStateSelectors } from '../../../store/App/selectors/app-state.selectors';

@Injectable()
export class StandardHttpInterceptor implements HttpInterceptor {
    /**
     * @description StandardHttpInterceptor constructor
     */
    constructor(private readonly appStateActions: AppStateActions, private readonly appSelectors: AppStateSelectors) {}

    private responseError: any;

    /**
     * handle an HTTP request before it is turned over to the browser for execution.
     * transforms a request into an Observable that eventually returns the response
     *
     * @param request
     * @param next
     *
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /**
         * some endpoints will have custom Content-Types (e.g. /reservation).
         *
         * default it to 'application/json'
         */
        let contentType: string = request.headers.get('Content-Type') || 'application/json';
        const acceptType: string = request.headers.get('Accept') || 'application/json, text/plain, */*';

        // angular HttpClient will fail file uploads when specifying
        // multipart/form-data
        if (contentType === 'multipart/form-data') {
            // null contentType so nothing is appended to the request headers below
            contentType = '';
        }

        let authToken: string = '';

        this.appSelectors.authToken$.pipe(first()).subscribe((value: string) => (authToken = value));

        /**
         * set a custom header on all HTTP requests.
         * This is so that the proxy host that handles the API requests understands that the application requests
         * are coming from Angular, and not a browser.  This distinction is important so that the proxy can catch
         * certain HTTP responses coming from the backend (such as API Gateway micro-services) and avoid sending a
         * response we don't want to bother with.
         *
         * default all HTTP requests to request json content
         *
         * @type {HttpRequest<any>}
         */
        let mutatedRequest: HttpRequest<any> = request.clone({
            headers: new HttpHeaders()
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Accept', acceptType)
                .set('token', authToken),
        });

        // is there a clientId associated with a KeyCloak auth session?

        // was a custom Content-Type set?? if so append to request headers
        if (contentType) {
            mutatedRequest = mutatedRequest.clone({
                setHeaders: {
                    'Content-Type': contentType,
                },
            });
        }

        this.appStateActions.busy();

        /**
         * next is an HttpHandler, an interface that, similar to intercept, transforms a request into an Observable for the response.
         * next always represents the next interceptor in the chain, if any, or the final backend if there are no more interceptors
         */
        return next.handle(mutatedRequest).pipe(
            catchError((response: any) => {
                let error: HttpErrorResponse;

                if (response instanceof HttpErrorResponse) {
                    if (response.error instanceof ErrorEvent) {
                        // a client-side or network error occurred. Handle it accordingly.
                        console.error('An error occurred:', response.error.message);
                    } else {
                        // the backend returned an unsuccessful response code.
                        // the response body may contain clues as to what went wrong,
                        console.error(`Backend returned code ${response.status}, ` + `body was: ${response.error}`);

                        // use toastr on error messages where applicable
                        if (response.status) {
                            // cache the error
                            this.responseError = response;
                        }
                    }

                    error = response;
                } else {
                    error = new HttpErrorResponse(Object.assign({}, mutatedRequest, { message: response }));
                }

                return throwError(error);
            }),
            finalize(() => {
                this.appStateActions.idle();

                // did the last call return successfully or not?
                if (this.responseError) {
                    let msg: string;

                    // check for error message, otherwise the toast will not trigger successfully
                    if (this.responseError.error) {
                        if (this.responseError.error.statusMessage) {
                            msg = `Backend returned code ${this.responseError.status}, body was: ${this.responseError.error.statusMessage.statusDetails}`;
                        } else {
                            msg = `Backend returned code ${this.responseError.status}`;
                        }
                    } else {
                        msg = `Backend returned code ${this.responseError.status}`;
                    }

                    console.error(msg);

                    this.responseError = undefined;
                }
            }),
        );
    }
}

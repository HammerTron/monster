import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as utils from './api-mock-utils.service';

@Injectable()

/* eslint-disable */
/**
 * Implementation of APIMockWrapService: handles wrapping of incomplete development api's for consumption in the UI
 */
export class APIMockWrapService {
    /**
     * APIMockWrapService constructor
     * @param http
     */
    constructor(private readonly http: HttpClient) {}

    /**
     * determien if supplied value is a valid Object
     * @param value
     * @returns {boolean}
     */
    // private isObject(value : any) {
    //     const type = typeof value;

    //     // tslint:disable-next-line: triple-equals
    //     return value != null && (type == 'object' || type == 'function');
    // }

    /**
     * wrap a live api endpoint to use in an application
     *
     * @param {String} endpoint the live api endpoint to wrap
     * @param {any} mockData If this is a string, will be treated as a path for $http
     * to use to get a json file.  If it's an array, it will be used as the mock data
     * @param {any} data any request payload data needed
     * @param {any} reqOptions an object of options for specifics about errors to be thrown timeouts, etc
     *
     * @returns {Object} mock api endpoint
     */
    createWrap(endpoint: string, mockData: any, data?: any, reqOptions?: any) {
        const baseEndpoint = endpoint,
            disableRandomErrors = utils.disableRandomErrors,
            produceError = utils.produceError,
            payload = data ? data : undefined,
            requestOptions = reqOptions,
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            service = this,
            options: any = {};

        // validate input params
        if (endpoint === undefined) {
            throw new Error('wrapper must be provided with an endpoint');
        }

        if (mockData === undefined) {
            throw new Error('wrapper must be provided with mock data');
        }

        /*if (!isObject(mockData)) {
         throw new Error('mock data must be an object');
         }
         else if (isArray(mockData)) {
         throw new Error('mock data must be an object, not an array');
         }*/

        // update default options(if any)
        options.priorityMock = options.priorityMock || true;

        utils.setOptions(options);

        /**
         * Merges two objects with the first object passed in taking priority.
         * This function will deeply merge the two objects.
         * @example
         *   var obj1 = {
         *     id: 2,
         *     name: "brian"
         *   };
         *   var obj2 = {
         *     id: 1,
         *     address: {
         *       street: "John"
         *     }
         *   }
         *   var merged = deepMerge(obj2, obj1);
         *   //merged will be:
         *   {
         *     id: 1,
         *     name: "brian",
         *     address: {
         *       street: "John"
         *     }
         *   }
         * @param priorityObj
         * @param mergingObj
         * @returns {*}
         */
        function deepMerge(mergingObj: any, priorityObj: any) {
            let isArrayTrue;

            const priObj: any = priorityObj,
                newObj: any = mergingObj;

            // are we dealing with an array or single object in our api response??
            options.priorityMock ? (isArrayTrue = Array.isArray(newObj)) : (isArrayTrue = Array.isArray(priObj));

            // if we have data to merge into the response and the response is not an array...
            if (priObj && !isArrayTrue) {
                // iterate over properties in the object that takes priority during the merge
                for (const prop in priObj) {
                    /**
                     * If object is defined, and is Object, and not an array then we need to
                     * deepMerge this property i.e. compare the objects against each other so
                     * we don't miss any nested properties
                     *
                     * Using void 0 to return undefined in case window.undefined is
                     * modified.
                     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
                     */
                    if (priObj[prop] !== void 0 && priObj[prop] && !Array.isArray(priObj[prop])) {
                        newObj[prop] = deepMerge(newObj[prop], priObj[prop]);
                    } else {
                        /**
                         * no nested property here so just compare the two
                         * and produce the expected value
                         */
                        // check for null/undefined on newObj
                        if (typeof (newObj[prop] !== 'boolean')) {
                            if (!newObj[prop]) {
                                // replace the null value with mock data
                                newObj[prop] = priObj[prop];
                            }
                        }
                    }
                }
            }
            // if we have data to merge into the response and the response is an array...
            else if (priObj && isArrayTrue) {
                // is there anything in the returned collection??
                if (newObj.length) {
                    // iterate over each entry in the array
                    // tslint:disable-next-line: prefer-const
                    for (let arrayIndex = 0, arrayLen = newObj.length; arrayIndex < arrayLen; arrayIndex += 1) {
                        for (const prop in newObj[arrayIndex]) {
                            /**
                             * If object is defined, and is Object, and not an array then we need to
                             * deepMerge this property i.e. compare the objects against each other so
                             * we don't miss any nested properties
                             *
                             * Using void 0 to return undefined in case window.undefined is
                             * modified.
                             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
                             */
                            if (
                                newObj[arrayIndex][prop] !== void 0 &&
                                newObj[arrayIndex][prop] &&
                                !Array.isArray(newObj[arrayIndex][prop])
                            ) {
                                newObj[arrayIndex][prop] = deepMerge(newObj[arrayIndex][prop], priObj[prop]);
                            } else {
                                /**
                                 * no nested property here so just compare the two
                                 * and produce the expected value
                                 */
                                // check for null/undefined on newObj
                                if (typeof (newObj[arrayIndex][prop] !== 'boolean')) {
                                    if (!newObj[arrayIndex][prop]) {
                                        // replace the null value with mock data
                                        newObj[arrayIndex][prop] = priObj[prop];
                                    }
                                }
                            }
                        }
                    }
                } else {
                    newObj.push(priObj);
                }
            }

            return newObj;
        }

        /**
         * A helper method to wrap the options check.
         *
         * @param responseData The data retrieved from the server.
         * @param mergeData The mockData object.
         *
         * @returns {*} The merged object
         */
        function mergeResponse(responseData: any, mergeData: any) {
            if (options.priorityMock) {
                return deepMerge(responseData, mergeData);
            }

            return deepMerge(mergeData, responseData);
        }

        /**
         * simulate an HTTP POST request with optional request parameter payload
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function post() {
            // mock HTTP response
            let mockResponse: HttpResponse<any>;

            const error = produceError(undefined, 'post');

            return Observable.create((observer: any) => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.post(baseEndpoint, payload, requestOptions).subscribe(
                        res => {
                            res = mergeResponse(res, mockData);

                            mockResponse = new HttpResponse({
                                status: 201,
                                body: res,
                                statusText: 'Created',
                            });

                            observer.next(mockResponse);
                        },
                        err => {
                            observer.error(err);
                        },
                    );
                }
            });
        }

        /**
         * simulate an HTTP GET request that returns matching records for provided Id
         *
         * @param dataId unique identifier to match against
         *
         * @returns {any} matched record result
         */
        function get(dataId: number) {
            // mock HTTP response
            let mockResponse: HttpResponse<any>;

            const error = produceError(dataId, 'get');

            return Observable.create((observer: any) => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.get(payload ? baseEndpoint + payload : baseEndpoint, requestOptions).subscribe(
                        res => {
                            res = mergeResponse(res, mockData);

                            mockResponse = new HttpResponse({
                                status: 200,
                                body: res,
                                statusText: 'OK',
                            });

                            observer.next(mockResponse);
                        },
                        err => {
                            observer.error(err);
                        },
                    );
                }
            });
        }

        /**
         * simulate an HTTP GET request that returns all available records in a given collection
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function getAll() {
            // mock HTTP response
            let mockResponse: HttpResponse<any>;

            const error = produceError(undefined, 'get');

            return Observable.create((observer: any) => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.get(payload ? baseEndpoint + payload : baseEndpoint, requestOptions).subscribe(
                        res => {
                            res = mergeResponse(res, mockData);

                            mockResponse = new HttpResponse({
                                status: 200,
                                body: res,
                                statusText: 'OK',
                            });

                            observer.next(mockResponse);
                        },
                        err => {
                            observer.error(err);
                        },
                    );
                }
            });
        }

        /**
         * simulate an HTTP PUT request with optional request payload parameter
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function put() {
            // mock HTTP response
            let mockResponse: HttpResponse<any>;

            const error = produceError(undefined, 'put');

            return Observable.create((observer: any) => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.put(baseEndpoint, payload, requestOptions).subscribe(
                        res => {
                            res = mergeResponse(data, mockData);

                            mockResponse = new HttpResponse({
                                status: 200,
                                body: res,
                                statusText: 'OK',
                            });

                            observer.next(mockResponse);
                        },
                        err => {
                            observer.error(err);
                        },
                    );
                }
            });
        }

        /**
         * simulate an HTTP PUT request with optional request payload parameter
         *
         * @param dataId unique identifer to match against
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function remove(dataId: number) {
            // mock HTTP response
            let mockResponse: HttpResponse<any>;

            const error = produceError(dataId, 'post');

            return Observable.create((observer: any) => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.delete(baseEndpoint, requestOptions).subscribe(
                        res => {
                            res = mergeResponse(data, mockData);

                            mockResponse = new HttpResponse({
                                status: 200,
                                body: res,
                                statusText: 'OK',
                            });

                            observer.next(mockResponse);
                        },
                        err => {
                            observer.error(err);
                        },
                    );
                }
            });
        }

        return {
            forceError: utils.forceError,
            post,
            disableRandomErrors,
            get,
            getAll,
            put,
            remove,
        };
    }
}

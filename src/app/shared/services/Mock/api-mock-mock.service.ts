import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as utils from './api-mock-utils.service';

@Injectable()

/* eslint-disable */
/**
 * Implementation of APIMockMockService: implements a fully mocked api backend for consumption in the UI
 */
export class APIMockMockService {
    /**
     * APIMockMockService constructor
     */
    constructor() {}

    /**
     * Create a mock endpoint to use in an application
     *
     * @param {*} mockData If this is a string, will be treated as a path for $http
     * to use to get a json file.  If it's an array, it will be used as the mock data
     * @param {Object} options an object of options for specifics about errors to be thrown timeouts, etc
     *
     * @returns {Object} mock api endpoint
     */
    createMock(mockData: any, options?: any) {
        let responseObj : any;

        const disableRandomErrors = utils.disableRandomErrors,
            produceError = utils.produceError,
            getErrorByCode = utils.getErrorByCode,
            waitForTime = utils.waitForTime;

        // validate input params
        if (Array.isArray(mockData)) {
            responseObj = setGoodResponse(mockData);
        } else {
            throw new Error('mockData required to be an array or .json path');
        }

        // update default options(if any)
        options = options || {};
        options.priorityMock = options.priorityMock || false;

        utils.setOptions(options);

        /**
         * configures response for a successful HTTP GET request against mocked data
         *
         * @param data mocked data to include with success HTTP response
         *
         * @returns {{status: number, statusText: string, data: any}}
         */
        function setGoodResponse(data: any) {
            // create an HTTP response
            return new HttpResponse({
                status: 200,
                body: data,
                statusText: 'OK',
            });
        }

        /**
         * generate a random id for a newly saved record
         *
         * @returns {any}
         */
        /*function getNextId() {
            return rMax(rPluck('id', this.responseObj)) + 1;
        }*/

        /**
         * search mock data for a match by record Id
         *
         * @returns {any} matched record result
         */
        function findItem() {
            return false;
        }

        /**
         * simulate an HTTP POST request with optional request parameter payload
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function post() {
            const delay = waitForTime(),
                error = produceError(undefined, 'post');

            // mock HTTP response
            responseObj.status = 201;
            responseObj.statusText = 'Created';

            return Observable.create((observer: any) => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        // send mocked data response
                        observer.next(responseObj);
                    }
                }, delay);
            });
        }

        /**
         * simulate an HTTP GET request that returns matching records for provided Id
         *
         * @param dataId unique identifer to match against
         *
         * @returns {any} matched record result
         */
        function get(dataId: number) {
            let error: any = produceError(dataId, 'get');

            const delay = waitForTime(),
                foundItem = findItem();

            return Observable.create((observer: any) => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        if (foundItem !== undefined) {
                            // mock HTTP response
                            responseObj.status = 200;
                            responseObj.statusText = 'OK';
                            responseObj.body = foundItem;

                            observer.next(responseObj);
                        } else {
                            // return 404
                            error = getErrorByCode(404);

                            observer.error(error);
                        }
                    }
                }, delay);
            });
        }

        /**
         * simulate an HTTP GET request that returns all available records in a given collection
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function getAll() {
            const delay = waitForTime(),
                error = produceError(undefined, 'get');

            return Observable.create((observer: any) => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        // send mocked data response
                        observer.next(responseObj);
                    }
                }, delay);
            });
        }

        /**
         * simulate an HTTP PUT request with optional request payload parameter
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function put() {
            const delay = waitForTime(),
                error = produceError(undefined, 'post');

            // mock HTTP response
            responseObj.status = 200;
            responseObj.statusText = 'OK';

            return Observable.create((observer: any) => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        // send mocked data response
                        observer.next(responseObj);
                    }
                }, delay);
            });
        }

        /**
         * simulate an HTTP PUT request with optional request payload parameter
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function remove() {
            const delay = waitForTime(),
                error = produceError(undefined, 'post');

            // mock HTTP response
            responseObj.status = 200;
            responseObj.statusText = 'OK';

            return Observable.create((observer: any) => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        // send mocked data response
                        observer.next(responseObj);
                    }
                }, delay);
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

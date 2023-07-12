import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiRoutes } from '../../../../../environments/api-routes';
import { Login } from '../../../../store/App/types/login.model';
import { environment } from '../../../../../environments/environment';
import { MockRoutes } from '../../../../../environments/mock-routes';
import { BackendService } from '../../../../shared/services/Backend/backend.service';
import { isArrayCheck } from '../../../../utils/is-array-check';

import { LOGIN_MOCK } from './login.service.mock';

@Injectable()

/**
 * Implementation of LoginService:
 */
export class LoginService {
    /**
     * LoginService constructor
     * @param {BackendService} backendService
     */
    constructor(private readonly backendService: BackendService) {}

    /**
     * @description submit the current users login data
     * @param {Login} payload
     * @returns {Observable<Login>}
     */
    
    doLogin(payload: Login): Observable<Login> {
        const handle: MockRoutes = environment.MOCK_CONFIG.login,
            apiUrl: ApiRoutes = environment.API_CONFIG.login;

        return this.backendService
            .post(apiUrl, handle, LOGIN_MOCK, payload)
            .pipe(map((response: any) => isArrayCheck(response)));
    }
}

import { of, Observable } from 'rxjs';

import { LOGIN_MOCK } from '../../../areas/Login/services/Login/login.service.mock';

export class MockLoginService {
    constructor() {}

    doLogin: () => Observable<any> = () => of(LOGIN_MOCK.doLogin[0]);
}

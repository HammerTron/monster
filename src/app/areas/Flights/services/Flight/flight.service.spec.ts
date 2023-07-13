import { getTestBed, TestBed } from '@angular/core/testing';

import { BackendService } from '../../../../shared/services/Backend/backend.service';
import { MockBackendService } from '../../../../shared/services/Backend/backend.service.mock';
import { MockLoginService } from '../../../../testing/mocks/services/login.service.mock';

// import { LoginService } from './login.service';
// import { LOGIN_MOCK } from './login.service.mock';

// describe('LoginService', () => {
//     const oldResetTestingModule: () => TestBed = TestBed.resetTestingModule;

//     let serviceToTest: LoginService;

//     // setup
//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             providers: [
//                 {
//                     provide: BackendService,
//                     useClass: MockBackendService,
//                 },
//                 {
//                     provide: LoginService,
//                     useClass: MockLoginService,
//                 },
//             ],
//         });

//         // prevent Angular from resetting testing module
//         TestBed.resetTestingModule = () => TestBed;

//         const injector: TestBed = getTestBed();

//         serviceToTest = injector.get(LoginService);
//     });

//     describe('doLogin', () => {
//         it('should be initialized', () => {
//             expect(serviceToTest).toBeDefined();
//         });

//         it('should return auth bearer token', () => {
//             const requestBody: any = { username: 'any', password: '12345' };

//             serviceToTest.doLogin(requestBody).subscribe(
//                 (response: any) => expect(response).toEqual(LOGIN_MOCK.doLoginWrap),
//                 (error: any) => expect(error).toBeDefined(),
//             );
//         });
//     });

//     afterAll(() => {
//         // reinstate resetTestingModule method
//         TestBed.resetTestingModule = oldResetTestingModule;
//         TestBed.resetTestingModule();
//     });
// });

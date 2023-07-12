import { Login } from './login.model';

describe('Login Model', () => {
    // test definitions
    it('should return an Immutable Record type of Login on init from POJO', () => {
        const keyValue: Login = new Login();

        expect(keyValue instanceof Login).toEqual(true);
    });

    it('should return an Immutable Record type of Login on init from Immutable', () => {
        const keyValue: Login = new Login(new Login());

        expect(keyValue instanceof Login).toEqual(true);
    });
});

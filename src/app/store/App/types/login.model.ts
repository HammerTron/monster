import { Record } from 'immutable';

export interface ILogin {
    username: string;
    password: string;
}

export const LOGIN: any = Record({
    username: '',
    password: '',
});

export class Login extends LOGIN {
    constructor(values?: Partial<ILogin>) {
        super(values);
    }

    username: string | undefined;
    password: string | undefined;
}

// @ts-check
'use strict';
// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires,@typescript-eslint/typedef
const fs = require('fs');

// eslint-disable-next-line @typescript-eslint/typedef
const template = `import { ApiRoutes } from './api-routes';
import { MockRoutes } from './mock-routes';
import { IEnvironment } from './types/environment.interface';

export const environment: IEnvironment = {
    API_CONFIG: ApiRoutes,
    MOCK_CONFIG: MockRoutes,
    ENV: 'prod',
    production: true,
    devToolsEnabled: false,
};
`;

fs.writeFileSync(`${__dirname}/environment.production.ts`, template);
fs.writeFileSync(`${__dirname}/environment.ts`, template);

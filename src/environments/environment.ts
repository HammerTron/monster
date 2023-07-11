import { ApiRoutes } from './api-routes';
import { MockRoutes } from './mock-routes';
import { IEnvironment } from './types/environment.interface';

export const environment: IEnvironment = {
    API_CONFIG: ApiRoutes,
    MOCK_CONFIG: MockRoutes,
    ENV: 'dev',
    production: false,
    devToolsEnabled: true,
};

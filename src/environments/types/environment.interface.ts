import { ApiRoutes } from '../api-routes';
import { MockRoutes } from '../mock-routes';

export interface IEnvironment {
    API_CONFIG: typeof ApiRoutes;
    MOCK_CONFIG: typeof MockRoutes;
    ENV: string;
    production: boolean;
    devToolsEnabled: boolean;
}

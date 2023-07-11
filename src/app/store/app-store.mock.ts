import { IAppStore } from './app-store';
import { INITIAL_APP_STATE } from './App/app-initial-state';

export const APP_STORE_MOCK: IAppStore = {
    appState: INITIAL_APP_STATE,
    // router: {
    //     navigationId: 1,
    //     state: {
    //         root: {},
    //         url: EnumRoute.DASHBOARD,
    //     },
    // },
};

import { IAppState, AppState } from '../types/app-state.model';
import { AppStateActions } from '../actions/app-state.actions';
import { INITIAL_APP_STATE } from '../app-initial-state';

const setIsBusy: (state: IAppState) => boolean = (state: IAppState): boolean => state.busyCount > 0;

export const APP_STATE_REDUCER: (state: AppState, action: any) => AppState = (
    state: AppState = INITIAL_APP_STATE,
    action: any,
): AppState => {
  switch (action.type) {
    case AppStateActions.APP_BUSY:
        // increment count of busy async items
        state = state.withMutations((record: AppState) =>
            record.set('busyCount', state.get('busyCount') + 1).set('isBusy', true),
        ) as AppState;

        break;
    case AppStateActions.APP_IDLE:
        // decrement count of busy async items
        state = state.set('busyCount', state.get('busyCount') - 1) as AppState;

        // update busy state of app
        state = state.set('isBusy', state.get('busyCount') > 0 ? true : false) as AppState;

        break;
    case AppStateActions.APP_DISABLE_BUSY:
        state = state.set('disableLoading', action.payload) as AppState;

        break;
    case AppStateActions.APP_TOGGLE_IS_POPPED:
        state = state.set('isPopped', action.payload) as AppState;

        break;
    case AppStateActions.APP_KILL_LOADING:
        state = state.withMutations((record: AppState) =>
            record.set('busyCount', 0).set('isBusy', false),
        ) as AppState;

        break;
    case AppStateActions.APP_UPDATE_USERNAME:
        state = state.setIn(['login', 'username'], action.payload) as AppState;

        break;
    case AppStateActions.APP_UPDATE_PASSWORD:
        state = state.setIn(['login', 'password'], action.payload) as AppState;

        break;
    case AppStateActions.APP_SET_AUTHENTICATED:
        state = state.set('authenticated', action.payload) as AppState;

        break;
    case AppStateActions.APP_UPDATE_AIRLINE:
        state = state.setIn(['flightInfo', 'airline'], action.payload) as AppState;

        break;
    case AppStateActions.APP_UPDATE_ARRIVAL_DATE:
        state = state.setIn(['flightInfo', 'arrivalDate'], action.payload) as AppState;

        break;
    case AppStateActions.APP_UPDATE_ARRIVAL_TIME:
        state = state.setIn(['flightInfo', 'arrivalTime'], action.payload) as AppState;

        break;
    case AppStateActions.APP_UPDATE_FLIGHT:
        state = state.setIn(['flightInfo', 'flightNumber'], action.payload) as AppState;

        break;
    case AppStateActions.APP_UPDATE_GUESTS:
        state = state.setIn(['flightInfo', 'numOfGuests'], action.payload) as AppState;

        break;
    case AppStateActions.APP_UPDATE_COMMENTS:
        state = state.setIn(['flightInfo', 'comments'], action.payload) as AppState;

        break;
    default:
        return state;
    }

    return state;
}





// 
// import { AppBusy, AppIdle, AppKillLoading, submitFlightInfo, UpdateUsernameText, UpdatePasswordText } from '../actions/app-state.actions';
// import { ILogin, Login } from '../types/login.model';

// const setIsBusy: (state: IAppState) => boolean = (state: IAppState): boolean => state.busyCount > 0;

// export const APP_STATE_REDUCER = createReducer(
//     INITIAL_APP_STATE,
    // on(AppBusy, (state: IAppState) =>
    //     produce(state, (draft: any) => {
    //         // increment count of busy async items
    //         draft.busyCount = draft.busyCount + 1;

    //         // update busy state of app
    //         draft.isBusy = setIsBusy(draft);
    //     }),
    // ),
    // on(AppIdle, (state: IAppState) =>
    //     produce(state, (draft: any) => {
    //         if (draft.busyCount > 0) {
    //             // decrement count of busy async items
    //             draft.busyCount = draft.busyCount - 1;
    //         }

    //         // update busy state of app
    //         draft.isBusy = setIsBusy(draft);
    //     }),
    // ),
    // on(AppKillLoading, (state: IAppState) =>
    //     produce(state, (draft: any) => {
    //         draft.busyCount = 0;
    //         draft.isBusy = false;
    //     }),
    // ),
    // immerOn(UpdateUsernameText, (state, { username }) => {
    //     const index = state.findIndex(u => u.username === username);
    //     state[index].username = username;
    // }),
    // on(UpdateUsernameText, (state: AppState, username: string) =>
    //     state.map(u: AppState => (u.login.username === username ? {...u, username} : u))
    // ),
    // on(UpdateUsernameText, (state: AppState, { username }) =>
    //     state.map(state: AppState => (state.login.username === username ? { ...state, username } : state))
    // ),
    // on(UpdatePasswordText, (state: IAppState, { password }: { password: string }) =>
    //     produce(state, (draft: any) => {
    //         draft.login.password = password;
    //     }),
    // ),
// );

import { SYNC_COOKIE_USER_DATA, UPDATE_USER_DATA } from "constants/common";
import { getValueFromCookies, setValueInCookies } from "services/webstorage";

/* eslint-disable no-case-declarations */
export function loggedinUserStateReducer(state: any = '', action) {// reduxState = {loader: action.payload}
    switch (action.type) {
        case UPDATE_USER_DATA:
            return (action.payload);
        case SYNC_COOKIE_USER_DATA:
            const persistedUser: any = getValueFromCookies('user');
            return persistedUser || null;
        default:
            return state;
    }
}

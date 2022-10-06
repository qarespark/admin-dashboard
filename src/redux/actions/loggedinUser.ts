import { SYNC_COOKIE_USER_DATA, UPDATE_USER_DATA } from "constants/common";

export const updateUserData = (payload) => {
    return { type: UPDATE_USER_DATA, payload };
}

export const syncCookieUserData = () => {
    return { type: SYNC_COOKIE_USER_DATA, payload: '' };
}

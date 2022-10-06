import { UPDATE_LOADER_STATUS, UPDATE_CURRENT_PAGE, UPDATE_ERROR_STATUS, UPDATE_BUSINESS_TYPES } from "constants/common";

export const updateCurrentPage = (payload: any) => {
    return { type: UPDATE_CURRENT_PAGE, payload };
}

export const enableLoader = (payload = true) => {
    return { type: UPDATE_LOADER_STATUS, payload };
}

export const disableLoader = (payload = false) => {
    return { type: UPDATE_LOADER_STATUS, payload };
}

export const updateErrorStatus = (payload: any) => {
    return { type: UPDATE_ERROR_STATUS, payload };
}

export const updateBusinessTypes = (payload: any) => {
    return { type: UPDATE_BUSINESS_TYPES, payload };
}

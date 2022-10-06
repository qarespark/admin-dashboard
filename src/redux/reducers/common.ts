/* eslint-disable no-case-declarations */
import { UPDATE_LOADER_STATUS, UPDATE_CURRENT_PAGE, UPDATE_BUSINESS_TYPES } from 'constants/common';

//this reducer will create new key inside redux store as function name and map this in reducers/index

export function activeRouteReducer(state: any = '', action: any) { // reduxState = {currentPage: action.payload}
    switch (action.type) {
        case UPDATE_CURRENT_PAGE:
            return (action.payload);
        default:
            return state;
    }
}


export function businessTypes(state: any = '', action: any) { // reduxState = {currentPage: action.payload}
    switch (action.type) {
        case UPDATE_BUSINESS_TYPES:
            return (action.payload);
        default:
            return state;
    }
}

export function loaderStateReducer(state: any = '', action: any) {// reduxState = {loader: action.payload}
    switch (action.type) {
        case UPDATE_LOADER_STATUS:
            return (action.payload);
        default:
            return state;
    }
}

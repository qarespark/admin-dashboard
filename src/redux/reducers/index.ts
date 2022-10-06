import { combineReducers } from 'redux';
import { activeRouteReducer, businessTypes, loaderStateReducer } from './common';
import { alertNotificationReducer } from './alert';
import { loggedinUserStateReducer } from './user';

const rootReducer = combineReducers({
  loader: loaderStateReducer,
  alert: alertNotificationReducer,
  route: activeRouteReducer,
  user: loggedinUserStateReducer,
  businessTypes: businessTypes
});

export default rootReducer;

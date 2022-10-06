import { ALERT_SUCCESS, ALERT_ERROR, ALERT_WARNING, ALERT_INFO, ALERT_CLEAR } from 'constants/alert';

export function alertNotificationReducer(state = { type: '', message: '', time: 3000 }, action: any) {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        type: action.type,
        message: action.payload.message,
        time: action.payload.time
      };
    case ALERT_ERROR:
      return {
        type: action.type,
        message: action.payload.message,
        time: action.payload.time
      };
    case ALERT_INFO:
      return {
        type: action.type,
        message: action.payload.message,
        time: action.payload.time
      };
    case ALERT_WARNING:
      return {
        type: action.type,
        message: action.payload.message,
        time: action.payload.time
      };
    case ALERT_CLEAR:
      return { type: '', message: '', time: 3000 };
    default:
      return state;
  }
}

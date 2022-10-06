import { ALERT_SUCCESS, ALERT_ERROR, ALERT_WARNING, ALERT_INFO, ALERT_CLEAR } from 'constants/alert';

export const showSuccess = (message = '', time = 3000) => {
  return { type: ALERT_SUCCESS, payload: { message, time } };
}

export const showError = (message = '', time = 3000) => {
  return { type: ALERT_ERROR, payload: { message, time } };
}

export const showWarning = (message = '', time = 3000) => {
  return { type: ALERT_WARNING, payload: { message, time } };
}

export const showInfo = (message = '', time = 3000) => {
  return { type: ALERT_INFO, payload: { message, time } };
}


export const clearAlert = (message = '', time = 3000) => {
  return { type: ALERT_CLEAR, payload: { message, time } };
}
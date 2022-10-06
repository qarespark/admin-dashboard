import rootReducer from 'redux/reducers/';
import { applyMiddleware, createStore, compose } from 'redux';
import Thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: ReturnType<typeof createStore> = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(Thunk)
  )
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

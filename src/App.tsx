import React, { useEffect } from 'react';
import './styles/app.scss';
import { Provider } from 'react-redux';
import store from 'redux/store/store';
import Loader from 'components/modules/loader';
import AlertNotification from 'components/modules/alert';
import AppRouter from 'router';

const App = () => {
  console.log("process.env", process.env)
  return (
    <Provider store={store}>
      <AlertNotification />
      <Loader />
      <AppRouter />
    </Provider>
  );
};

export default App;

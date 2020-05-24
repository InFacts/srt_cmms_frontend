import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.scss';

import store from './js/redux/store.js'
import { Provider } from 'react-redux';

//Temporary solving reducers and nested stores
// const GlobalContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
   </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with ome pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

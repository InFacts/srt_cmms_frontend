import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.scss';

import './css/style.css';
import './css/grid12.css';
import './css/modal.css';
import './css/style-list.css';

import './css/tabs.css';
import './css/style-register.css';
import './css/style-signin.css';
import './css/notification.css';
import './css/style-nav.css';
import './css/table.css';

import store from './js/redux/store.js'
import { Provider } from 'react-redux';


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

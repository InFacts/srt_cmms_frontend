import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from './reducers';

import Login from './forgot.js';

const store = createStore(reducers, applyMiddleware(thunk))

class Home extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Login />
            </Provider>
        )
    };
}

export default Home;
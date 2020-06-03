import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from './reducers';

import NavTopbar from '../nav/nav-top.js';
import Toolbar from '../common/nav-toolbar';
import WrapForm from './wrap-form';

const store = createStore(reducers, applyMiddleware(thunk))

class WO extends React.Component {
    render() {
        const type = 'WO';
        return (
            <Provider store={store}>
                <NavTopbar />
                <Toolbar />
                <WrapForm />
            </Provider>
        )
    };
}

export default WO;

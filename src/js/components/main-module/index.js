import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from './reducers';

import NavTopbar from '../nav/nav-top-connect-api.js';
import ToolBar from '../nav/nav-toolbar.js';
import TopContent from './top-content';

const store = createStore(reducers, applyMiddleware(thunk))

class MainModule extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavTopbar />
                <ToolBar />
                <TopContent />
            </Provider>
        )
    };
}

export default MainModule;

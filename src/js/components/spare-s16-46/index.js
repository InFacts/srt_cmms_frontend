import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import NavTopbar from '../nav/nav-top.js';
import ToolBar from '../nav/nav-toolbar.js';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import NavBottom from '../nav/nav-bottom.js';

const store = createStore(reducers)

class Home extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavTopbar />
                <ToolBar />
                <TopContent />
                <BottomContent />
                <NavBottom />
            </Provider>
        )
    };
}

export default Home;
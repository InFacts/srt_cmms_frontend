import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import NavTopbar from '../nav/nav-top.js';
import TopContent from './top-content';
import BottomContent from './bottom-content';


const store = createStore(reducers)
class ActivityLog extends React.Component {
    render() {
        const type = 'ActivityLog';
        return (
            <Provider store={store}>
                <NavTopbar />
                <form>
                    <TopContent />
                    <BottomContent  />
                </form>
            </Provider>
        )
    };
}

export default ActivityLog;

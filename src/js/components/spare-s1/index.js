import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import reducers from './reducers';

import NavTopbar from '../nav/nav-top.js';
import Toolbar from '../common/nav-toolbar';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

const store = createStore(reducers, applyMiddleware(thunk))

class Report extends React.Component {
    render() {
        const type = 'report';
        return (
            <Provider store={store}>
                <NavTopbar />
                <Toolbar />
                <form>
                    <TopContent />
                    <BottomContent  />
                    <Footer />
                </form>
            </Provider>
        )
    };
}

export default Report;

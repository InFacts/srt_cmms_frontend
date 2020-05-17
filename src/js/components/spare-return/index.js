import React from 'react';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from "redux-thunk";
import NavTopbar from '../nav/nav-top.js';
import Toolbar from '../common/nav-toolbar';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';

const store = createStore(reducers, applyMiddleware(thunk))

class SpareGoodReceipt extends React.Component {

    render() {
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

export default SpareGoodReceipt;

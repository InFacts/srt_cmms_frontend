import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import NavTopbar from '../nav/nav-top.js';
import Toolbar from '../common/nav-toolbar';
import TopContent from './top-content';
import BottomContent from './bottom-content';
import Footer from '../common/footer.js';
import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(reducers, composeWithDevTools())

class ItemMasterData2 extends React.Component {

    render() {
        return (
            <>
                <NavTopbar />
                <Toolbar />
            </>
            // <Provider store={store}>
            //     <NavTopbar />
            //     <Toolbar />
            //     <form>
            //         <TopContent />
            //         <BottomContent />
            //         <Footer />
            //     </form>
            // </Provider>
        )
    };
}

export default ItemMasterData2;
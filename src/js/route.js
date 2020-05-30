import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history'

import ItemMasterData2 from './components/spare-item-master-data2';
import SpareGoodReceipt from './components/spare-good-receipt';
import Track from './components/track-document';
class FrontEnd extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route exact path="/item-master-data2" component={ItemMasterData2} />
                <Route exact path="/good-receipt" component={SpareGoodReceipt} />
                <Route exact path="/track" component={Track} />
            </Router>
        );
    }
}

export default FrontEnd;

import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history'

import Login from './components/signin';
import ForgotPassword from './components/forgot-password';
import Main4Module from './components/main-module';
import MainSpare from './components/main-spare';
import MainPmt from './components/main-pmt';

import ItemMasterData2 from './components/spare-item-master-data2';
import SpareGoodReceipt from './components/spare-good-receipt';
import Track from './components/track-document';
class FrontEnd extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route exact path="/" component={Login} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/main" component={Main4Module} />
                <Route exact path="/main-spare" component={MainSpare} />
                <Route exact path="/main-pmt" component={MainPmt} />
                <Route exact path="/item-master-data2" component={ItemMasterData2} />
                <Route exact path="/good-receipt" component={SpareGoodReceipt} />
                <Route exact path="/track" component={Track} />
            </Router>
        );
    }
}

export default FrontEnd;

import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/signin';
import ForgotPassword from './components/forgot-password';
import Main4Module from './components/main-module';
import MainSpare from './components/main-spare';
import MainPmt from './components/main-pmt';

import ItemMasterData2 from './components/spare-item-master-data2';
import SpareGoodReceipt2 from './components/spare-good-receipt2';
import Track from './components/track-document';
import PmtWorkOrder from './components/pmt-work-order';

import PmtSS101 from './components/pmt-ss-101';
const FrontEnd = () => (
    <>
        <Route exact path="/" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/main" component={Main4Module} />
        <Route exact path="/main-spare" component={MainSpare} />
        <Route exact path="/main-pmt" component={MainPmt} />
        <Route exact path="/item-master-data2" component={ItemMasterData2} />
        <Route exact path="/good-receipt2" component={SpareGoodReceipt2} />
        <Route exact path="/track" component={Track} />

        <Route exact path="/ss-101" component={PmtSS101} />
        <Route exact path="/wo" component={PmtWorkOrder} />

    </>
);

export default FrontEnd;

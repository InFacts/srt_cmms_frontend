import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/signin';
import ForgotPassword from './components/forgot-password';
import Main4Module from './components/main-module';
import MainSpare from './components/main-spare';
import MainPmt from './components/main-pmt';

// SPARE PAGE
import ItemMasterData2 from './components/spare-item-master-data2';
import SpareGoodsReceipt2 from './components/spare-goods-receipt2';
import SpareGoodsReceiptNoPo from './components/spare-goods-receipt-no-po';
import SpareGoodsReturn from './components/spare-goods-return';
import SpareGoodsReturnMaintenance from './components/spare-goods-return-maintenance';
import SpareGoodsUsage from './components/spare-goods-usage';
import SpareGoodsReceiptFix from './components/spare-goods-receipt-fix';

// PMT PAGE
import PmtWorkOrder from './components/pmt-work-order';
import WorkRequestComponent from './components/pmt-work-request';
import PmtSS101 from './components/pmt-ss-101';

import Track from './components/track-document';
const FrontEnd = () => (
    <>
        <Route exact path="/" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/main" component={Main4Module} />
        
        {/* SPARE PAGE */}
        <Route exact path="/main-spare" component={MainSpare} />
        <Route exact path="/item-master-data2" component={ItemMasterData2} />
        <Route exact path="/goods-receipt2" component={SpareGoodsReceipt2} />
        <Route exact path="/goods-receipt-no-po" component={SpareGoodsReceiptNoPo} />
        <Route exact path="/goods-return" component={SpareGoodsReturn} />
        <Route exact path="/goods-return-maintenance" component={SpareGoodsReturnMaintenance} />
        <Route exact path="/goods-usage" component={SpareGoodsUsage} />
        <Route exact path="/goods-receipt-fix" component={SpareGoodsReceiptFix} />

        {/* PMT PAGE */}
        <Route exact path="/main-pmt" component={MainPmt} />

        {/* PMT Routes */}
        <Route exact path="/pmt-work-request" component={WorkRequestComponent} />
        <Route exact path="/ss-101" component={PmtSS101} />
        <Route exact path="/wo" component={PmtWorkOrder} />

        <Route exact path="/track" component={Track} />
    </>
);

export default FrontEnd;

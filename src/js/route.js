import React from 'react';
import {Switch, Route } from 'react-router-dom';

import Login from './components/signin';
import ForgotPassword from './components/forgot-password';
import Main4Module from './components/main-module';
import MainSpare from './components/main-spare';
import MainPmt from './components/main-pmt';
import NotFoundComponent from './components/404-not-found';

// SPARE PAGE
import ItemMasterData from './components/spare-item-master-data';
import SpareGoodsReceipt2 from './components/spare-goods-receipt2';
import SpareGoodsReceiptNoPo from './components/spare-goods-receipt-no-po';
import SpareGoodsReturn from './components/spare-goods-return';
import SpareGoodsFix from './components/spare-goods-fix';
import SpareGoodsUsage from './components/spare-goods-usage';
import SpareGoodsReceiptFix from './components/spare-goods-receipt-fix';
import SpareGoodsIssue from './components/spare-goods-issue';
import SpareInventoryTransfer from './components/spare-inventory-transfer';
import SpareSalvageReturn from './components/spare-salvage-return';
import SpareSalvageSold from './components/spare-salvage-sold';
import SparePhysicalCount from './components/spare-physical-count';
import SpareInventoryAdjustment from './components/spare-inventory-adjustment';
import SpareS1 from './components/spare-s-1';
import SpareWarehouse from './components/spare-warehouse';

// PMT PAGE
import PmtWorkOrder from './components/pmt-work-order';
import WorkRequestComponent from './components/pmt-work-request';
import PmtSS101 from './components/pmt-ss101';
import PmtEquipmentInstallation from './components/pmt-equipment-install';

import Track from './components/track-document';
const FrontEnd = () => (
    <Switch>
    {/* Wrap the routes in a Switch which only renders the first matched component. Otherwise you would see multiple components rendered. */}
        <Route exact path="/" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/main" component={Main4Module} />
        
        {/* SPARE PAGE */}
        <Route exact path="/main-spare" component={MainSpare} />
        <Route exact path="/item-master-data" component={ItemMasterData} />
        <Route exact path="/goods-receipt2" component={SpareGoodsReceipt2} />
        <Route exact path="/goods-receipt-no-po" component={SpareGoodsReceiptNoPo} />
        <Route exact path="/goods-return" component={SpareGoodsReturn} />
        <Route exact path="/goods-fix" component={SpareGoodsFix} />
        <Route exact path="/goods-usage" component={SpareGoodsUsage} />
        <Route exact path="/goods-receipt-fix" component={SpareGoodsReceiptFix} />
        <Route exact path="/goods-issue" component={SpareGoodsIssue} />
        <Route exact path="/inventory-transfer" component={SpareInventoryTransfer} />
        <Route exact path="/salvage-return" component={SpareSalvageReturn} />
        <Route exact path="/salvage-sold" component={SpareSalvageSold} />
        <Route exact path="/physical-count" component={SparePhysicalCount} />
        <Route exact path="/inventory-adjustment" component={SpareInventoryAdjustment} />
        <Route exact path="/report-s-1" component={SpareS1} />
        <Route exact path="/warehouse" component={SpareWarehouse} />

        {/* PMT PAGE */}
        <Route exact path="/main-pmt" component={MainPmt} />

        {/* PMT Routes */}
        <Route exact path="/pmt-work-request" component={WorkRequestComponent} />
        <Route exact path="/pmt-work-order" component={PmtWorkOrder} />
        <Route exact path="/ss-101" component={PmtSS101} />
        
        <Route exact path="/pmt-equipment-installation" component={PmtEquipmentInstallation} />

        <Route exact path="/track" component={Track} />

        {/* Handle routes that are not found */}
        <Route component={NotFoundComponent} />
    </Switch>
);

export default FrontEnd;

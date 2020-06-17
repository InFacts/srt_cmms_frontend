import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/signin';
import Register from './components/register';
import ForgotPassword from './components/forgot-password';
import Main4Module from './components/main-module';
import MainSpare from './components/main-spare';
import MainPmt from './components/main-pmt';

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

// APPROVAL PAGE
import ApprovalFlow from './components/approval-flow'
import ApprovalFlowStep from './components/approval-flow-step'
// ADMIN PAGE
import UserManagement from './components/user-management'
import ActivityLog from './components/activity-log'
import Profile from './components/user-profile'

import Track from './components/track-document';
const FrontEnd = () => (
    <>
        <Route exact path="/" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/main" component={Main4Module} />
        <Route exact path="/register" component={Register} />
        
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

        {/* APPROVAL PAGE */}
        <Route exact path="/approval-flow" component={ApprovalFlow} />
        <Route exact path="/approval-flow-step" component={ApprovalFlowStep} />

        {/* ADMIN PAGE */}
        <Route exact path="/user-management" component={UserManagement} />
        <Route exact path="/activity-log" component={ActivityLog} />
        <Route exact path="/profile" component={Profile} />

        {/* PMT Routes */}
        <Route exact path="/pmt-work-request" component={WorkRequestComponent} />
        <Route exact path="/pmt-work-order" component={PmtWorkOrder} />
        <Route exact path="/ss-101" component={PmtSS101} />
        

        <Route exact path="/track" component={Track} />
    </>
);

export default FrontEnd;

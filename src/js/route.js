import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/signin';
import Main4Module from './components/main-module';
import MainSpare from './components/main-spare';
import MainPmt from './components/main-pmt';

// import S1646 from './components/spare-s16-46';
import S1646 from './components/spare-s16-46-2';

import SS101 from './components/ss101';
import WO from './components/work-order';
import WR from './components/work-request';
import Plan from './components/plan-maintenance';
import AssInt from './components/asset-install';
import AssMas from './components/asset-master';
import Inventory from './components/spare-inventory';
import ItemMasterData from './components/spare-item-master-data';
import SpareGoodReceipt from './components/spare-good-receipt';

import SpareGoodIssue from './components/spare-good-issue';
import SpareGoodIssue2 from './components/spare-good-issue-2';

import SpareGoodMaintenace from './components/spare-good-maintenace';
import SpareReturn1 from './components/spare-return-1';
import SpareReturn2 from './components/spare-return-2';
import SpareGoodReceiptNoPO from './components/spare-good-receipt-no-po';
import SpareTakeOut from './components/spare-take-out';
import SpareSalvage1 from './components/spare-salvage-management-1';
import SpareSalvage2 from './components/spare-salvage-management-2';
import SpareUnitCount from './components/spare-unit-counting';
import SpareB22 from './components/spare-b22';
import SpareS1 from './components/spare-s1';

import Track from './components/track-document';
import Report from './components/report';
import MaintenanceFixedAsset from './components/maintance-fixed-asset';
import MaintenanceCustom from './components/maintance-custom';
import Maintenance from './components/maintance';
import Test2 from './components/test-components-v2';
import UserManagement from './components/user-management'
import Profile from './components/profile'
import ActivityLog from './components/activity-log'
import Register from './components/register'

class FrontEnd extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Login} />
                <Route exact path="/main" component={Main4Module} />
                <Route exact path="/main-spare" component={MainSpare} />
                <Route exact path="/main-pmt" component={MainPmt} />
                <Route exact path="/ss101" component={SS101} />
                <Route exact path="/s1646" component={S1646} />
                {/* <Route exact path="/s1646-2" component={S16462} /> */}
                <Route exact path="/wo" component={WO} />
                <Route exact path="/wr" component={WR} />
                <Route exact path="/plan" component={Plan} />
                <Route exact path="/assint" component={AssInt} />
                <Route exact path="/assmas" component={AssMas} />
                <Route exact path="/inventory" component={Inventory} />
                <Route exact path="/item-master-data" component={ItemMasterData} />
                <Route exact path="/good-receipt" component={SpareGoodReceipt} />

                <Route exact path="/good-issue" component={SpareGoodIssue} />
                <Route exact path="/good-issue-2" component={SpareGoodIssue2} />

                <Route exact path="/good-maintenace" component={SpareGoodMaintenace} />

                <Route exact path="/good-return-1" component={SpareReturn1} />
                <Route exact path="/good-return-2" component={SpareReturn2} />
                <Route exact path="/good-good-issue-no-po" component={SpareGoodReceiptNoPO} />
                <Route exact path="/good-take-out" component={SpareTakeOut} />
                <Route exact path="/salvage-management-1" component={SpareSalvage1} />
                <Route exact path="/salvage-management-2" component={SpareSalvage2} />
                <Route exact path="/unit-count" component={SpareUnitCount} />
                <Route exact path="/report-b22" component={SpareB22} />
                <Route exact path="/report-s1" component={SpareS1} />

                <Route exact path="/test" component={Test2} />
          
                <Route exact path="/track" component={Track} />
                <Route exact path="/report" component={Report} />
                <Route exact path="/fixed-asset" component={MaintenanceFixedAsset} />
                <Route exact path="/custom" component={MaintenanceCustom} />
                <Route exact path="/maintenance" component={Maintenance} />
                <Route exact path="/usermanagement" component={UserManagement} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/activity-log" component={ActivityLog} />
                <Route exact path="/register" component={Register} />
            </div>
        );
    }
}

export default FrontEnd;

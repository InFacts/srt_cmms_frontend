import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/signin/login.js';
import Main4Module from './components/main-module';
import MainSpare from './components/main-spare';
import MainPmt from './components/main-pmt';
import S1646 from './components/spare-s16-46';
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
import SpareGoodMaintenace from './components/spare-good-maintenace';
import Track from './components/track-document';
import Report from './components/report';
import MaintenanceFixedAsset from './components/maintance-fixed-asset';
import MaintenanceCustom from './components/maintance-custom';
import Maintenance from './components/maintance';
import Test2 from './components/test-components-v2';

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
                <Route exact path="/wo" component={WO} />
                <Route exact path="/wr" component={WR} />
                <Route exact path="/plan" component={Plan} />
                <Route exact path="/assint" component={AssInt} />
                <Route exact path="/assmas" component={AssMas} />
                <Route exact path="/inventory" component={Inventory} />
                <Route exact path="/item-master-data" component={ItemMasterData} />
                <Route exact path="/good-receipt" component={SpareGoodReceipt} />
                <Route exact path="/good-issue" component={SpareGoodIssue} />
                <Route exact path="/good-maintenace" component={SpareGoodMaintenace} />
                <Route exact path="/track" component={Track} />
                <Route exact path="/report" component={Report} />
                <Route exact path="/fixed-asset" component={MaintenanceFixedAsset} />
                <Route exact path="/custom" component={MaintenanceCustom} />
                <Route exact path="/maintenance" component={Maintenance} />
            </div>
        );
    }
}

export default FrontEnd;

import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/signin/login.js';
import Main4Module from './components/main-module';
import MainSpare from './components/main-spare';
import MainPmt from './components/main-pmt';
import S1646 from './components/s16-46';
import SS101 from './components/ss101'
import WO from './components/work-order'

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
            </div>
        );
    }
}

export default FrontEnd;

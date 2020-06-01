import React, { useEffect } from 'react';
import Toolbar from '../common/nav-toolbar';
import NavTopbar from '../nav/nav-top2';
import Map from './map';

import { connect } from 'react-redux'

const MainModulePmt = (props) => {

    return (
        <>
            <NavTopbar />
            <Toolbar />
            <Map />
        </>
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainModulePmt);

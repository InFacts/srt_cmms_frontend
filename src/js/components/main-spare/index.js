import React, { useEffect } from 'react';
import ToolBar from '../common/nav-toolbar';
import NavTopbar from '../nav/nav-top2';
import Map from './map';

import { connect } from 'react-redux'

const MainModuleSpare = (props) => {

    return (
        <>
            <NavTopbar />
            <ToolBar />
            <Map />
        </>
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainModuleSpare);

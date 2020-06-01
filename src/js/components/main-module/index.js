import React, { useEffect } from 'react';
import Toolbar from '../common/nav-toolbar';
import NavTopbar from '../nav/nav-top2';
import TopContent from './top-content';

import { connect } from 'react-redux'

const MainModule = (props) => {

    return (
        <>
            <NavTopbar />
            <Toolbar />
            <TopContent />
        </>
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainModule);
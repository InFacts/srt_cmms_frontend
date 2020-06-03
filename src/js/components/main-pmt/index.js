import React, { useEffect } from 'react';
import Map from './map';

import { connect } from 'react-redux'

const MainModulePmt = (props) => {

    return (
        <>
            <Map />
        </>
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainModulePmt);

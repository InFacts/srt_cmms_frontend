import React from 'react';
import Map from './map';

import { connect } from 'react-redux'

const MainModuleSpare = (props) => {

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

export default connect(mapStateToProps, mapDispatchToProps)(MainModuleSpare);

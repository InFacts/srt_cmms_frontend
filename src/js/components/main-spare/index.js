import React, { useState, useEffect } from 'react';
import Map from './map';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux'

import { connect } from 'react-redux'

const MainModuleSpare = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(footerToModeInvisible());
    }, []);
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

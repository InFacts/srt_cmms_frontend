import React, { useEffect } from 'react';
import Map from './map';
import { Redirect } from 'react-router-dom';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux';

import {useToolbarChangeModeInitializer} from '../../hooks/toolbar-initializer';
import {  TOOLBAR_MODE} from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';

const MainModulePmt = (props) => {

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE);
    useTokenInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn); 
    useFactInitializer();

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(footerToModeInvisible());
    }, []);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <Map />
        </>
    )
}


export default MainModulePmt;

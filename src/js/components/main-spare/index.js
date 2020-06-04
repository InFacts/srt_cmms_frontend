import React, { useState, useEffect } from 'react';
import Map from './map';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux'

import {useToolbarChangeModeInitializer} from '../../hooks/toolbar-initializer';
import {  TOOLBAR_MODE,TOOLBAR_ACTIONS ,MODE_TO_ACTION_CREATOR } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';

const MainModuleSpare = () => {

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE);
    useTokenInitializer();
    useFactInitializer();

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(footerToModeInvisible());
    }, []);

    return (
        <Map />
    )
}

export default MainModuleSpare;

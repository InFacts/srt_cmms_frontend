import React, { useEffect } from 'react';
import TopContent from './top-content';
import { Redirect } from 'react-router-dom';

import { toModeNone } from '../../redux/modules/toolbar.js';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'

import {useToolbarChangeModeInitializer} from '../../hooks/toolbar-initializer';
import {  TOOLBAR_MODE} from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import useTokenInitializer from '../../hooks/token-initializer';

const MainModule = (props) => {

    // Initializer: Change Toolbar to Mode None
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE);
    useFactInitializer();
    useTokenInitializer();
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(toModeNone());
    }, []);

    useEffect(()=>{
        dispatch(footerToModeInvisible());
    }, []);

    return (
        <>
            {!loggedIn ? <Redirect to="/" /> : null}
            <TopContent />
        </>
    )
}


export default MainModule;
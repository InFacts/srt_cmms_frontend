import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
// import reducers from './reducers';

import { useState, useEffect } from 'react';
import ApprovalFlow from './approval-flow.js';
import { toModeInvisible } from '../../redux/modules/toolbar';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'
import {useToolbarChangeModeInitializer} from '../../hooks/toolbar-initializer';
import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import { useFormik , withFormik ,useFormikContext} from 'formik';
import useTokenInitializer from '../../hooks/token-initializer';

const Home = (props) => {
    const dispatch = useDispatch();
    useToolbarChangeModeInitializer(TOOLBAR_MODE.INVISIBLE);
    useFactInitializer();
    useTokenInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);
    return (
        <>
            <ApprovalFlow />
        </>
    )
}
const EnhancedApprovalFlowComponent = withFormik({
    mapPropsToValues: () => ({ 
        item_list: [], 
        // step_approve: [], 
    }),
})(Home);
export default EnhancedApprovalFlowComponent;
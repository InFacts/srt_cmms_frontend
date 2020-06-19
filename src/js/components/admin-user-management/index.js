import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
// import reducers from './reducers';

import { useState, useEffect } from 'react';
import TopContent from './top-content.js';
import BottomContent from './bottom-content.js';
import { toModeInvisible } from '../../redux/modules/toolbar';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'
import { useToolbarChangeModeInitializer } from '../../hooks/toolbar-initializer';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import { useFormik, withFormik, useFormikContext } from 'formik';
import useTokenInitializer from '../../hooks/token-initializer';
const Home = (props) => {
    const dispatch = useDispatch();
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE);
    useFactInitializer();
    useTokenInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);
    return (
        <>
            <TopContent />
            <BottomContent />
        </>
    )
}
const EnhancedUserManagementComponent = withFormik({
    mapPropsToValues: () => ({

        // ฟิวที่ให้ user กรอก
        internal_document_id: '',
        created_by_user_employee_id: '',
        
        name: '',
        created_by_user_employee_id: '',
        item_list: [],
        position_id: '',
        zone: '',
    }),
})(Home);
export default EnhancedUserManagementComponent;
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
// import reducers from './reducers';

import { useState, useEffect } from 'react';
import ActivityLog from './activity-log.js';
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
            <ActivityLog />
        </>
    )
}
const EnhancedActivityLogComponent = withFormik({
    mapPropsToValues: () => ({
        // ฟิวที่ให้ user กรอก
        internal_document_id: '',
        created_by_user_employee_id: '',

        date_start: '',
        date_end: '',
        type_document: '',
        type_action: '',
        username: '',
        document_id: '',
        item_list: [],
    }),
})(Home);
export default EnhancedActivityLogComponent;
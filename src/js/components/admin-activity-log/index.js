import React from 'react';
import { Redirect } from 'react-router-dom';

import { useEffect } from 'react';
import ActivityLog from './activity-log.js';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'
import { useToolbarChangeModeInitializer } from '../../hooks/toolbar-initializer';
import { TOOLBAR_MODE } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import { withFormik } from 'formik';
import useTokenInitializer from '../../hooks/token-initializer';

const Home = (props) => {
    const dispatch = useDispatch();
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE);
    useFactInitializer();
    useTokenInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    return (
        <>
        {!loggedIn ? <Redirect to="/" /> : null}
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
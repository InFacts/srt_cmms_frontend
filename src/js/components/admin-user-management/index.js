import React from 'react';
import { Redirect } from 'react-router-dom';

import { useEffect } from 'react';
import TopContent from './top-content.js';
import BottomContent from './bottom-content.js';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'
import { useToolbarChangeModeInitializer } from '../../hooks/toolbar-initializer';
import { TOOLBAR_MODE } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import { withFormik } from 'formik';
import useTokenInitializer from '../../hooks/token-initializer';

import BgPink from '../../../images/admin/bg_pink.jpg';
import { changeTheam } from '../../helper.js'
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
            <form style={changeTheam() === true ? { backgroundImage: `url(${BgPink})`, width: "100vw", height: "100vh" } : {}}>
                <TopContent />
                <BottomContent />
            </form>
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
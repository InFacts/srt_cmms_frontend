import React from 'react';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Register from './register.js';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'

import { useFormik, withFormik, useFormikContext } from 'formik';
import { useToolbarChangeModeInitializer } from '../../hooks/toolbar-initializer';
import { TOOLBAR_MODE, TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';

import BgPink from '../../../images/admin/bg_pink.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const Home = (props) => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.token.isLoggedIn);

    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE);
    useFactInitializer();

    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    return (
        <>
        {!loggedIn ? <Redirect to="/" /> : null}
        <Register />
        </>
    )
}


const EnhancedRegisterComponent = withFormik({
    mapPropsToValues: () => ({
        username: '',
        firstname: '',
        lastname: '',
        employee_id: '',
        email: '',
        password: '',
        confirmpassword: '',

        position_id: '',  //หน่วยงาน
    }),

})(Home);

export default EnhancedRegisterComponent;
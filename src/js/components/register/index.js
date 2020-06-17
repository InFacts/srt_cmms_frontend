import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
// import reducers from './reducers';

import { useState, useEffect } from 'react';
import Register from './register.js';
import { toModeInvisible } from '../../redux/modules/toolbar';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { FACTS, fetchFact } from '../../redux/modules/api/fact.js'
import { useFormik , withFormik ,useFormikContext} from 'formik';
import {useToolbarChangeModeInitializer} from '../../hooks/toolbar-initializer';
import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
const Home = (props) => {
    const dispatch = useDispatch();

    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE);
    useFactInitializer();

    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    // Fetch all Facts
    // useEffect(() => {
    //     for (let factName in FACTS) {
    //         props.fetchFact(FACTS[factName]);
    //     }
    // }, []);

    // useEffect(() => {
    //     dispatch(toModeInvisible());
    // }, []);

    return (
        <>
            <Register />
        </>
    )
}


const EnhancedRegisterComponent = withFormik({
    mapPropsToValues: () => ({ 


        username:'',
        firstname: '',
        lastname:'',
        employee_id:'',
        email:'',
        password:'',
        confirmpassword:'',

        divisions: '',
        district: '',
        zone: '',
        station: '',


    }),
  
})(Home);

export default EnhancedRegisterComponent;
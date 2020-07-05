import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
// import reducers from './reducers';

import { useState, useEffect } from 'react';
import ApprovalFlowStep from './approval-flow-step.js';
import { toModeInvisible } from '../../redux/modules/toolbar';
import { footerToModeInvisible } from '../../redux/modules/footer.js';
import { useDispatch, useSelector } from 'react-redux'
import {useToolbarChangeModeInitializer} from '../../hooks/toolbar-initializer';
import {  TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../../redux/modules/toolbar.js';
import useFactInitializer from '../../hooks/fact-initializer';
import { useFormik , withFormik ,useFormikContext} from 'formik';
import useTokenInitializer from '../../hooks/token-initializer';
import useDocumentSubscription from '../../hooks/document-subscription';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';


const Home = (props) => {
    const dispatch = useDispatch();
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE_HOME);
    useFactInitializer();
    useTokenInitializer();
    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);

    // If Link to this url via Track Document
    useEffect(() => {
        let url = window.location.search;
        console.log("URL IS", url)
        const urlParams = new URLSearchParams(url);
        const approval_process_lookup_id = urlParams.get('approval_process_lookup_id');
        if (approval_process_lookup_id !== "") {
            console.log(" IA M NOT SETTING ", approval_process_lookup_id);
            setFieldValue("approval_process_lookup_id", approval_process_lookup_id, true);
            console.log(" THIS IS AFTER VALUES ", values);
            fetchSearchApprovalProcessLookup(approval_process_lookup_id).then(function (data) {
                console.log(">>>>>>", data.approval_process_lookup)
                // console.log(data.approval_process_lookup.approval_process_lookup_id)
                setFieldValue("step_approve", data.approval_process_lookup);
            })
        }
    }, []);

    return (
        <>
            <ApprovalFlowStep />
        </>
    )
}
const EnhancedApprovalFlowStepComponent = withFormik({
    mapPropsToValues: () => ({ 
        // item_list: [], 
        approval_process_lookup_id: '',       // เลขที่เอกสาร
        step_approve: [], 
    }),
})(Home);
export default EnhancedApprovalFlowStepComponent;


export const fetchSearchApprovalProcessLookup = (approval_process_lookup_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/approval-process-lookup/${approval_process_lookup_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((approval) => {
            console.log("NUKKKKK>>>>>",approval )
            resolve(approval.data);
        })
        .catch((err) => {
            reject(err)
        });
});
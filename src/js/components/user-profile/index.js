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
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TabBar from '../common/tab-bar';

const Home = (props) => {
    const dispatch = useDispatch();
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    useToolbarChangeModeInitializer(TOOLBAR_MODE.NONE);
    useFactInitializer();
    useTokenInitializer();

    const [tabNames, setTabNames] = useState([
        { id: "officia_document", name: "เอกสารราชการ" },
        { id: "user_information", name: "ข้อมูลผู้ใช้งาน" },
        { id: "usage_history", name: "ประวัติการใช้งาน" },
    ]);

    // If Link to this url via Track Document
    useEffect(() => {
        let url = window.location.search;
        console.log("URL IS", url)
        const urlParams = new URLSearchParams(url);
        const user_id = urlParams.get('user_id');
        if (user_id !== null && user_id !== '') {
            console.log(" IA M NOT SETTING ", user_id);
            setFieldValue("user_id", user_id, true);
            console.log(" THIS IS AFTER VALUES ", values);
            fetchUsers(user_id).then(function (data) {
                setFieldValue("user_profile", data.results);
                setFieldValue("username", data.results[0].username);
                setFieldValue("firstname", data.results[0].firstname_th);
                setFieldValue("lastname", data.results[0].lastname_th);
                setFieldValue("employee_id", data.results[0].employee_id);
                setFieldValue("email", data.results[0].email);
                setFieldValue("national_id", data.results[0].national_id);
                setFieldValue("firstname_en", data.results[0].firstname_en);
                setFieldValue("firstname_th", data.results[0].firstname_th);
                setFieldValue("lastname_th", data.results[0].lastname_th);
                setFieldValue("address", data.results[0].address);
                setFieldValue("birthdate", data.results[0].birthdate);
                setFieldValue("phone", data.results[0].phone);
                setFieldValue("created_at", data.results[0].created_at);
                setFieldValue("updated_at", data.results[0].updated_at);
            })
        }else{





            
        }
    }, []);

    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);
    return (
        <>
            <TopContent />
            <TabBar tabNames={tabNames} initialTabID="officia_document">
                <BottomContent />
            </TabBar>
        </>
    )
}
const EnhancedUserProfileComponent = withFormik({
    mapPropsToValues: () => ({

        user_id: "",
        username: '',
        firstname: '',
        lastname: '',
        employee_id: '',
        email: '',

        national_id: '',
        firstname_en: '',
        lastname_en: '',
        firstname_th: "",
        lastname_th: "",
        address: "",
        birthdate: "",
        phone: "",
        created_at: "",
        updated_at: "",


        password: '',
        newpassword: '',
        confirmpassword: '',

        divisions: '',
        district: '',
        zone: '',
        station: '',

        user_profile: [],
    }),
})(Home);
export default EnhancedUserProfileComponent;


export const fetchUsers = (user_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/users?user_id=${user_id}`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((user_id) => {
            resolve(user_id.data);
        })
        .catch((err) => {
            reject(err)
        });
});
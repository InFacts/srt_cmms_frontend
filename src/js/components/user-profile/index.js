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
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
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
    const loggedIn = useSelector(state => state.token.isLoggedIn); 

    const token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

    const [tabNames, setTabNames] = useState([
        { id: "officia_document", name: "เอกสารราชการ" },
        { id: "user_information", name: "ข้อมูลผู้ใช้งาน" },
        { id: "usage_history", name: "ประวัติการใช้งาน" },
    ]);

    // If Link to this url via Track Document
    useEffect(() => {
        let url = window.location.search;
        // console.log("URL IS", url)
        const urlParams = new URLSearchParams(url);
        const user_id = urlParams.get('user_id');

        if (user_id) {
            // console.log(" IA M NOT SETTING ", user_id);
            setFieldValue("user_id", user_id, true);
            // console.log(" THIS IS AFTER VALUES ", values);
            fetchUsers(user_id).then(function (data) {
                console.log("data>>>", data)
                setFieldValue("user_profile", data.results);
                setFieldValue("username", data.results[0].username);
                setFieldValue("firstname", data.results[0].firstname_th);
                setFieldValue("lastname", data.results[0].lastname_th);
                setFieldValue("employee_id", data.results[0].employee_id);
                setFieldValue("email", data.results[0].email);
                setFieldValue("national_id", data.results[0].national_id);
                setFieldValue("firstname_en", data.results[0].firstname_en);
                setFieldValue("firstname_th_show", data.results[0].firstname_th);
                setFieldValue("lastname_th_show", data.results[0].lastname_th);
                setFieldValue("firstname_th", data.results[0].firstname_th);
                setFieldValue("lastname_th", data.results[0].lastname_th);
                setFieldValue("address", data.results[0].address);
                setFieldValue("birthdate", data.results[0].birthdate && data.results[0].birthdate.slice(0, 10));
                setFieldValue("phone", data.results[0].phone);
                setFieldValue("created_at", data.results[0].created_at);
                setFieldValue("updated_at", data.results[0].updated_at);
                setFieldValue("position_name", data.results[0].position[0].name);
                setFieldValue("position_id", data.results[0].position[0].position_id);
            })
            fetchDocumentUsers(user_id).then(function (data) {
                setFieldValue("items", data.results);
                // console.log(data.results)
            })
            setFieldValue("user_my", "user-management");
        } else {

            fetchMyUsers().then(function (data) {
                console.log("data>>>>>>", data)
                setFieldValue("user_id", data.user_id);
                setFieldValue("username", data.username);
                setFieldValue("firstname", data.firstname_th);
                setFieldValue("lastname", data.lastname_th);
                setFieldValue("employee_id", data.employee_id);
                setFieldValue("email", data.email);
                setFieldValue("national_id", data.national_id);
                setFieldValue("firstname_en", data.firstname_en);
                setFieldValue("firstname_th_show", data.firstname_th);
                setFieldValue("lastname_th_show", data.lastname_th);
                setFieldValue("firstname_th", data.firstname_th);
                setFieldValue("lastname_th", data.lastname_th);
                setFieldValue("address", data.address);
                setFieldValue("birthdate", data.birthdate.slice(0, 10));
                setFieldValue("phone", data.phone);
                setFieldValue("created_at", data.created_at);
                setFieldValue("updated_at", data.updated_at);
                setFieldValue("position_name", data.has_positions[0].name);
                setFieldValue("position_id", data.has_positions[0].position_id);

                fetchDocumentUsers(data.user_id).then(function (data2) {
                    setFieldValue("items", data2.results);
                    // console.log(data2.results)
                })
            })

            setFieldValue("user_my", "user-profile");
        }
    }, []);

    useEffect(() => {
        dispatch(footerToModeInvisible());
    }, []);
    return (
<>
        {!loggedIn ? <Redirect to="/" /> : null}
            <TopContent />
            <TabBar tabNames={tabNames} initialTabID="officia_document">
                <BottomContent />
            </TabBar>
        </>
    )
}
const EnhancedUserProfileComponent = withFormik({
    mapPropsToValues: () => ({


        user_my: '',

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

        position_id: '',
        divisions: '',
        district: '',
        zone: '',
        station: '',

        user_profile: [],

        items: [],


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


export const fetchDocumentUsers = (user_id) => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?created_by_user_id=${user_id}&page_size=100`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((user_id) => {
            resolve(user_id.data);
        })
        .catch((err) => {
            reject(err)
        });
});


export const fetchMyUsers = () => new Promise((resolve, reject) => {
    const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`;
    axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        .then((user_id) => {
            resolve(user_id.data);
        })
        .catch((err) => {
            reject(err)
        });
});

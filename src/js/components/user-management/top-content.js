import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import '../../../vender/fontawesome-free/css/all.css';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'
import { validateEmployeeIDField, DOCUMENT_TYPE_ID, validateInternalDocumentIDFieldHelper, getUserIDFromEmployeeID } from '../../helper';

const TopContent = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factUser = useSelector((state) => ({ ...state.api.fact.users }), shallowEqual);
    useEffect(() => {
        setFieldValue("item_list", factUser.items);
    }, [factUser.items]);

    // console.log(">>>>>>>>>created_by_admin_id", getUserIDFromEmployeeID(factUser, values.created_by_user_employee_id))
    const searchUser = () => {


        // let url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/users?username=${values.user_id}`
        // const created_by_admin_id = getUserIDFromEmployeeID(factUser, values.created_by_user_employee_id)
        // if (created_by_admin_id !== null) {
        let url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/fact/users?username=${values.user_id}&employee_id=${values.employee_id}`
        // }
        const fetchData = () => {
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                .then((res) => {
                    setFieldValue("item_list", res.data.results)
                })
        };
        fetchData();



        // setFieldValue("item_list", factUser.items.filter(item => {
        //     // ตัวแปร item ยังไม่แน่ชัดเพราะเรื่อง API
        //     const query = values.user_id.toLowerCase();
        //     const query2 = values.employee_id.toLowerCase();
        //     const query3 = values.name.toLowerCase();
        //     const query4 = values.district.toLowerCase();
        //     const query5 = values.zone.toLowerCase();
        //     return (
        //         (item.username.toLowerCase().indexOf(query) >= 0 || !query) &&
        //         (item.employee_id.toLowerCase().indexOf(query2) >= 0 || !query2) &&
        //         (item.firstname_th.toLowerCase().indexOf(query3) >= 0 || !query3) &&
        //         (item.district.toLowerCase().indexOf(query4) >= 0 || !query4) &&
        //         (item.zone.toLowerCase().indexOf(query5) >= 0 || !query5)
        //     )
        // })
        // );
    }

    const coverntUserIDToName = (user_id) => {
        // console.log("employee_id", user_id)
        // console.log("factUser.items", factUser.items)
        let users = factUser.items;
        let user = users.find(user => user.user_id === user_id); // Returns undefined if not found
        // console.log(user, "user")
        if (user) {
            return user.username;
        }
    }

    const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);

    return (
        <div id="blackground-white">
            <div className="container_12 clearfix" >
                {/* Section Title */}
                <section className="container_12 ">
                    <h4 className="head-title">บริหารจัดการผู้ใช้งาน</h4>
                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">หน่วยงาน </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <SelectNoChildrenInput name="district" >
                                <option value=''></option>
                                {factDistricts.items.map(function ({ district_id, name }) {
                                    return <option value={district_id} key={district_id}> {name} </option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                    </div>
                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">Username </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <TextInput name='user_id'
                                tabIndex="1" />
                        </div>
                    </div>
                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">เลขที่พนักงาน </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <TextInput name='employee_id'
                                tabIndex="1" />
                            {/* <TextInput name="created_by_user_employee_id"
                                validate={validateUserEmployeeIDField} searchable={true} ariaControls="modalUserName" /> */}
                        </div>
                        <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={searchUser}>ค้นหา</button>
                    </div>
                </section>
            </div>


            {/* PopUp ค้นหาเลขที่เอกสาร */}
            <PopupModalDocument documentTypeGroupID={"document_all_type"}
                id="modalDocument" //For Open POPUP
                name="internal_document_id" //For setFieldValue
            />

            {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
            <PopupModalUsername />
        </div>
    )
};
export default TopContent;
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import '../../../vender/fontawesome-free/css/all.css';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import DateInput from '../common/formik-date-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import TextInput from '../common/formik-text-input'

import { getUserIDFromEmployeeID, identifyEndpoinsHelper } from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js'
import { fetchDocuments } from '../../redux/modules/track_doc.js';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'

import BgPink from '../../../images/admin/bg_pink.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const ActivityLog = (props) => {

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const factDocumentType = useSelector((state) => ({ ...state.api.fact[FACTS.DOCUMENT_TYPE_GROUPS] }), shallowEqual);
    const factDocumentStatus = useSelector((state) => ({ ...state.api.fact[FACTS.DOCUMENT_STATUS] }), shallowEqual);
    const factUser = useSelector((state) => ({ ...state.api.fact.users }), shallowEqual);

    // Initial Fetch
    useEffect(() => {
        props.fetchDocuments();
    }, []);

    useEffect(() => {
        setFieldValue("item_list", props.track_document_show);
    }, [props.track_document_show]);


    const formatDate = (dateISOString) => {
        let date = new Date(dateISOString);
        return date.toLocaleDateString('en-GB') + " " + date.toLocaleTimeString();
    }

    const searchDetail = () => {
        const created_by_user_id = getUserIDFromEmployeeID(factUser, values.created_by_user_employee_id)

        let url = ` http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?internal_document_id=${values.internal_document_id}&document_type_name=${values.type_document}&${created_by_user_id && `created_by_user_id=${created_by_user_id}`}&${values.date_start && values.date_end && `before_created_on=${values.date_end}&after_created_on=${values.date_start}`} `
        console.log("url", url)
        const fetchData = () => {
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                .then((res) => {
                    setFieldValue("item_list", res.data.results)
                })
        };
        fetchData();
    }

    const identifyEndpoins = (document_type_id) => identifyEndpoinsHelper(document_type_id)

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

    const validateEmployeeIDField = (fieldName, fact, setFieldValue, employee_id) => {
        console.log("I am validating employee id")
        employee_id = employee_id.split('\\')[0]; // Escape Character USERNAME CANT HAVE ESCAPE CHARACTER!
        let users = fact[FACTS.USERS].items;
        let user = users.find(user => user.employee_id === employee_id); // Returns undefined if not found
        if (user) {
            setFieldValue(fieldName, `${employee_id}\\${user.firstname_th} ${user.lastname_th}`, false);
            return;
        }
    };
    const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);

    return (
        <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgPink})`, width: "100vw", height: "100vh" } : { height: "100vh" }}>
            <div className="container_12 clearfix">
                {/* Section Title */}
                <h4 className="head-title" style={{ marginTop: "80px" }}>Activity Log</h4>

                <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "580px", paddingTop: "10px" } : {}} >

                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">ประเภทเอกสาร </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <SelectNoChildrenInput name="type_document" >
                                <option value=''></option>
                                {factDocumentType.items.map(function ({ type_document, name }) {
                                    return <option value={type_document} key={type_document}> {name} </option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                    </div>

                    {/* Username  */}
                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">รหัสพนักงาน </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <TextInput name="created_by_user_employee_id"
                                validate={validateUserEmployeeIDField} searchable={true} ariaControls="modalUserName" />
                        </div>
                    </div>


                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">เลขที่เอกสาร </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <TextInput name='internal_document_id'
                                searchable={true} ariaControls="modalDocument" tabIndex="1" />
                        </div>
                    </div>

                    <div className="container_12 mb-2">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">ช่วงเวลา </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <DateInput name='date_start'
                                tabIndex="1" />
                        </div>
                        <div className="grid_1  ">
                            <p className="cancel-default">ถึง </p>
                        </div>
                        <div className="grid_3  pull_0">
                            <DateInput name='date_end'
                                tabIndex="1" />
                        </div>
                        <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={searchDetail}>ค้นหา</button>

                    </div>

                    <table className="table-many-column" style={{ height: "400px", padding: "0 10px" }}>
                        <thead>
                            <tr>
                                <th className="font text-center" style={{ width: "350px" }}>วันเวลา</th>
                                <th className="font text-center" style={{ width: "350px" }}>Username</th>
                                <th className="font text-center" style={{ width: "350px" }}>ประเภทของเอกสาร</th>
                                <th className="font text-center" style={{ width: "150px" }}>สถานะเอกสาร</th>
                                <th className="font text-center" style={{ width: "350px" }}>เลขที่เอกสาร</th>
                                <th className="font text-center" style={{ width: "300px" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.item_list.map(function (item, index) {
                                console.log("item", item)
                                return (
                                    <tr key={index} id={index}>
                                        <td className="edit-padding" > {formatDate(item.created_on)}</td>
                                        <td className="edit-padding" >{coverntUserIDToName(item.created_by_user_id)}</td>
                                        <td className="edit-padding" > {item.document_type_name}</td>
                                        <td className="edit-padding" > {item.document_status_en}</td>
                                        <td className="edit-padding" > {item.internal_document_id}</td>
                                        <td className="edit-padding text-center" >
                                            <Link className="button-yellow" to={identifyEndpoins(item.document_type_id) + "?internal_document_id=" + item.internal_document_id + "&document_id=" + item.document_id}><button type="button" className="button-yellow">รายละเอียด</button></Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
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

const mapStateToProps = (state) => ({
    track_document_show: state.track_doc.track_document_show,
})
const mapDispatchToProps = {

    fetchDocuments
}
export default connect(mapStateToProps, mapDispatchToProps)(ActivityLog);
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

import { validateEmployeeIDField, DOCUMENT_TYPE_ID, validateInternalDocumentIDFieldHelper, getUserIDFromEmployeeID } from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js'
import { fetchDocuments } from '../../redux/modules/track_doc.js';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'

const ActivityLog = (props) => {

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const factDocumentType = useSelector((state) => ({ ...state.api.fact[FACTS.DOCUMENT_TYPE_GROUPS] }), shallowEqual);
    const factDocumentStatus = useSelector((state) => ({ ...state.api.fact[FACTS.DOCUMENT_STATUS] }), shallowEqual);
    const factUser = useSelector((state) => ({ ...state.api.fact.users }), shallowEqual);
    console.log(factUser)
    // Initial Fetch
    useEffect(() => {
        props.fetchDocuments();
    }, []);

    // ไม่แน่ใจ get API activity log ใช้ตัวนี้ไหม 
    //  = useSelector((state) => ({ ...state.api.fact.items }), shallowEqual);
    console.log("values", values.internal_document_id, "created_by_admin_id", getUserIDFromEmployeeID(factUser, values.created_by_user_employee_id))

    useEffect(() => {
        // setFieldValue("item_list", factItems.items);
        setFieldValue("item_list", props.track_document_show);
        console.log(props.track_document_show)
    }, [props.track_document_show]);


    const formatDate = (dateISOString) => {
        let date = new Date(dateISOString);
        // year = date.getFullYear();
        // month = date.getMonth()+1;
        // dt = date.getDate();
        return date.toLocaleDateString('en-GB') + " " + date.toLocaleTimeString();
    }

    const searchDetail = () => {

        let url =`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?internal_document_id=${values.internal_document_id}&document_type_name=${values.type_document}`
        const created_by_admin_id = getUserIDFromEmployeeID(factUser, values.created_by_user_employee_id)
        if(created_by_admin_id !== null) {
            url =`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/document/search?internal_document_id=${values.internal_document_id}&document_type_name=${values.type_document}&created_by_admin_id=${created_by_admin_id}`
        }
        const fetchData = () => {
            axios.get(url, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                .then((res) => {
                    setFieldValue("item_list",res.data.results)
                })
        };
        fetchData();
        // ตัวแปร item ยังไม่แน่ชัดเพราะเรื่อง API
        // setFieldValue("item_list", props.track_document_show.filter(item => {

        //     console.log(item)
        //     const query = values.date_start.toLowerCase();
        //     const query2 = values.date_end.toLowerCase();
        //     const query3 = values.type_document.toLowerCase();
        //     const query4 = values.type_action.toLowerCase();
        //     const query5 = values.username.toLowerCase();
        //     const query6 = values.document_id.toLowerCase();
        //     return (
        //         // (item.date_start.toLowerCase().indexOf(query) >= 0 || !query) &&
        //         // (item.date_end.toLowerCase().indexOf(query2) >= 0 || !query2) &&
        //         (item.document_type_name.toLowerCase().indexOf(query3) >= 0 || !query3) &&
        //         // (item.document_action_type_id.toLowerCase().indexOf(query4) >= 0 || !query4) &&
        //         // (item.created_by_user_id.toLowerCase().indexOf(query5) >= 0 || !query5) &&
        //         (item.internal_document_id.toLowerCase().indexOf(query6) >= 0 || !query6)
        //     )
        // })
        // );
    }

    const identifyEndpoins = (document_type_id) => {
        let doc_type = document_type_id.toString().substring(0, 3);
        // console.log("doc_type", doc_type)
        if (doc_type === "101") return "goods-receipt2";
        if (doc_type === "103") return "goods-receipt-no-po";
        if (doc_type === "111") return "goods-usage";
        if (doc_type === "112") return "goods-issue";
        if (doc_type === "121") return "inventory-transfer";
        if (doc_type === "132") return "goods-fix";
        if (doc_type === "102") return "goods-return";
        else return "#";
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
        <div id="blackground-white" >
            <div className="container_12 clearfix" style={{ marginTop: "55px" }}>
                {/* Section Title */}
                <h4 className="head-title">Activity Log</h4>

                <div className="container_12">
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
                </div>

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

                {/* <div className="container_12">
                    <div className="grid_2 cancel-default">
                        <p className="cancel-default">ประเภท Actions </p>
                    </div>
                    <div className="grid_3 pull_0">
                        <SelectNoChildrenInput name="type_action" >
                            <option value=''></option>
                            {factDocumentStatus.items.map(function ({ type_action, status }) {
                                return <option value={type_action} key={type_action}> {status} </option>
                            })}

                        </SelectNoChildrenInput>
                    </div>
                </div> */}

                {/* Username  */}
                <div className="container_12">
                    <div className="grid_2 cancel-default">
                        <p className="cancel-default">รหัสพนักงาน </p>
                    </div>
                    <div className="grid_3 pull_0">
                    <TextInput name="created_by_user_employee_id" 
                    validate={validateUserEmployeeIDField} searchable={true} ariaControls="modalUserName"/>
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
                    <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={searchDetail}>ค้นหา</button>
                </div>

                <table className="table-many-column mt-2" style={{ height: "450px"}}>
                    <thead>
                        <tr>
                            <th className="font text-center" style={{ width: "350px" }}>วันเวลา</th>
                            <th className="font text-center" style={{ width: "350px" }}>Username</th>
                            <th className="font text-center" style={{ width: "350px" }}>ประเภทของเอกสาร</th>
                            {/* TODO รอคุยกับพี่นัท */}
                            {/* <th className="font text-center" style={{ width: "350px" }}>ประเภทของ Actions</th>
                            <th className="font text-center" style={{ width: "350px" }}>ข้อมูลที่เปลี่ยนแปลง</th> */}
                            <th className="font text-center" style={{ width: "350px" }}>เลขที่เอกสาร</th>
                            <th className="font text-center" style={{ width: "300px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.item_list.map(function (item, index) {
                            // console.log("item", item)
                            return (
                                <tr key={index} id={index}>
                                    <td className="edit-padding" > {formatDate(item.created_on)}</td>
                                    <td className="edit-padding" >{coverntUserIDToName(item.created_by_admin_id)}</td>
                                    <td className="edit-padding" > {item.document_type_name}</td>
                                    {/* <td className="edit-padding" >
                                        {factDocumentStatus.items.map(function ({document_status_id,status}) {
                                            if(item.document_action_type_id === document_status_id){
                                                return status   
                                            }
                                        })}
                                    </td>
                                    <td className="edit-padding" > {formatDate(item.created_on)}</td> */}
                                    <td className="edit-padding" > {item.internal_document_id}</td>
                                    <td className="edit-padding text-center" >
                                        <button type="button" className="button-yellow"><Link className="button-yellow" to={identifyEndpoins(item.document_type_id) + "?internal_document_id=" + item.internal_document_id + "&document_id=" + item.document_id}>รายละเอียด</Link></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
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
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

import { FACTS } from '../../redux/modules/api/fact.js'
import { fetchDocuments } from '../../redux/modules/track_doc.js';
const ActivityLog = (props) => {

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    const factDocumentType = useSelector((state) => ({ ...state.api.fact[FACTS.DOCUMENT_TYPE_GROUPS] }), shallowEqual);
    const factDocumentStatus = useSelector((state) => ({ ...state.api.fact[FACTS.DOCUMENT_STATUS] }), shallowEqual);

    // Initial Fetch
    useEffect(() => {
        props.fetchDocuments();
    }, []);

    // ไม่แน่ใจ get API activity log ใช้ตัวนี้ไหม 
    //  = useSelector((state) => ({ ...state.api.fact.items }), shallowEqual);

    useEffect(() => {
        // setFieldValue("item_list", factItems.items);
        setFieldValue("item_list", props.track_document_show);
        console.log(props.track_document_show)
    }, [props.track_document_show]);


    const searchDetail = () => {
        // ตัวแปร item ยังไม่แน่ชัดเพราะเรื่อง API
        setFieldValue("item_list", props.track_document_show.filter(item => {
            const query = values.date_start.toLowerCase();
            const query2 = values.date_end.toLowerCase();
            const query3 = values.type_document.toLowerCase();
            const query4 = values.type_action.toLowerCase();
            const query5 = values.username.toLowerCase();
            const query6 = values.document_id.toLowerCase();
            return (
                // (item.date_start.toLowerCase().indexOf(query) >= 0 || !query) &&
                // (item.date_end.toLowerCase().indexOf(query2) >= 0 || !query2) &&
                (item.document_type_name.toLowerCase().indexOf(query3) >= 0 || !query3) &&
                (item.document_action_type_id.toLowerCase().indexOf(query4) >= 0 || !query4) &&
                // (item.username.toLowerCase().indexOf(query5) >= 0 || !query5) &&
                (item.document_id.toLowerCase().indexOf(query6) >= 0 || !query6)
            )
        })
        );
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

    return (
        <div id="blackground-white">
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
                    <div className="grid_2  ">
                        <p className="cancel-default">ถึง </p>
                    </div>
                    <div className="grid_3">
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

                <div className="container_12">
                    <div className="grid_2 cancel-default">
                        <p className="cancel-default">ประเภท Actions </p>
                    </div>
                    <div className="grid_3 pull_0">
                        <SelectNoChildrenInput name="type_action" >
                            <option value=''></option>
                            {factDocumentStatus.items.map(function ({ type_action, name }) {
                                return <option value={type_action} key={type_action}> {name} </option>
                            })}
                        </SelectNoChildrenInput>
                    </div>
                </div>

                <div className="container_12">
                    <div className="grid_2 cancel-default">
                        <p className="cancel-default">Username </p>
                    </div>
                    <div className="grid_3 pull_0">
                        <TextInput name='username'
                            tabIndex="1" />
                    </div>
                </div>


                <div className="container_12">
                    <div className="grid_2 cancel-default">
                        <p className="cancel-default">เลขที่เอกสาร </p>
                    </div>
                    <div className="grid_3 pull_0">
                        <TextInput name='document_id'
                            tabIndex="1" />
                    </div>
                    <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={searchDetail}>ค้นหา</button>
                </div>

                <table className="table-many-column mt-2">
                    <thead>
                        <tr>
                            <th className="font text-center" style={{ width: "350px" }}>วันเวลา</th>
                            <th className="font text-center" style={{ width: "350px" }}>Username</th>
                            <th className="font text-center" style={{ width: "350px" }}>ประเภทของเอกสาร</th>
                            <th className="font text-center" style={{ width: "350px" }}>ประเภทของ Actions</th>
                            <th className="font text-center" style={{ width: "350px" }}>ข้อมูลที่เปลี่ยนแปลง</th>
                            <th className="font text-center" style={{ width: "350px" }}>เลขที่เอกสาร</th>
                            <th className="font text-center" style={{ width: "300px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.item_list.map(function (item, index) {
                            return (
                                <tr key={index} id={index}>
                                    <td className="edit-padding" > {item.created_on}</td>
                                    <td className="edit-padding" > {}</td>
                                    <td className="edit-padding" > {item.document_type_name}</td>
                                    <td className="edit-padding" > {item.document_action_type_id}</td>
                                    <td className="edit-padding" > {item.created_on}</td>
                                    <td className="edit-padding" > {item.document_id}</td>
                                    <td className="edit-padding text-center" >
                                        <button type="button" className="button-yellow"><Link className="button-yellow" to={identifyEndpoins(item.document_type_id) + "?internal_document_id=" + item.internal_document_id + "&document_id=" + item.document_id}>รายละเอียด</Link></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
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
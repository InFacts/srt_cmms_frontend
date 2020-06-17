import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import '../../../vender/fontawesome-free/css/all.css';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';

const BottomContent = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    
    
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
        <div id="blackground-gray">
            <div className="container_12 clearfix">
                <div className="container_12 ">
                    <div className="container_12">
                        <table className="table-many-column mt-3" style={{ height: "380px" }}>
                            <thead>
                                <tr>
                                    <th className="font" style={{ minWidth: "250px" }}>หน่วยงาน</th>
                                    <th className="font" style={{ minWidth: "100px" }}>Username</th>
                                    <th className="font" style={{ minWidth: "100px" }}>เลขที่พนักงาน</th>
                                    <th className="font" style={{ minWidth: "100px" }}>ชื่อ-นามสกุล</th>
                                    <th className="font" style={{ minWidth: "100px" }}>ตำแหน่งงาน</th>
                                    <th className="font" style={{ minWidth: "100px" }}>วันเวลาล่าสุดที่เข้าระบบ</th>
                                    <th className="font" style={{ minWidth: "150px" }}>รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values.item_list.map(function (user, index) {
                                    return (
                                        <tr key={index} id={index}>
                                            <td className="edit-padding" >{user.firstname_th} </td>
                                            <td className="edit-padding" >{user.username} </td>
                                            <td className="edit-padding" >{user.employee_id} </td>
                                            <td className="edit-padding" > </td>
                                            <td className="edit-padding" > </td>
                                            <td className="edit-padding" >{user.updated_at} </td>
                                            <td className="edit-padding text-center" >
                                                
                                                <button type="button" className="button-yellow"><Link className="button-yellow" to={"profile"+"?user_id=" + user.user_id }>รายละเอียด</Link></button>

                                                {/* identifyEndpoins(item.document_type_id) + "?internal_document_id=" + item.internal_document_id + "&document_id=" + item.document_id */}
                                                
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default BottomContent;
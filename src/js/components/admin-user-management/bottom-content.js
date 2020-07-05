import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import '../../../vender/fontawesome-free/css/all.css';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const formatDate = (dateISOString) => {
        let date = new Date(dateISOString);
        return date.toLocaleDateString('en-GB') + " " + date.toLocaleTimeString();
    }

    return (
        <div id={changeTheam() === true ? "" : "blackground-gray"}>
            <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>
                <div className="container_12 ">
                    <div className="grid_12">
                        <table className="table-many-column mt-2" style={{ height: "440px", paddingRight: "10px",  paddingLeft: "10px" }}>
                            <thead>
                                <tr>
                                    <th className="font" style={{ minWidth: "100px" }}>เลขที่พนักงาน</th>
                                    <th className="font" style={{ minWidth: "100px" }}>Username</th>
                                    <th className="font" style={{ minWidth: "200px" }}>ชื่อ-นามสกุล</th>
                                    <th className="font" style={{ minWidth: "250px" }}>หน่วยงาน</th>
                                    <th className="font" style={{ minWidth: "100px" }}>วันเวลาล่าสุดที่เข้าระบบ</th>
                                    <th className="font" style={{ minWidth: "150px" }}>รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values.item_list.map(function (user, index) {
                                    return (
                                        <tr key={index} id={index}>
                                            <td className="edit-padding" >{user.employee_id} </td>
                                            <td className="edit-padding" >{user.username} </td>
                                            <td className="edit-padding" >{user.firstname_th} {user.lastname_th} </td>
                                            <td className="edit-padding" >{user.position.length !== 0 ? user.position[0].name : ''} </td>
                                            <td className="edit-padding" >{formatDate(user.updated_at)} </td>
                                            <td className="edit-padding text-center" >
                                                <Link className="button-yellow" to={"profile" + "?user_id=" + user.user_id}><button type="button" className="button-yellow">รายละเอียด</button></Link>
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
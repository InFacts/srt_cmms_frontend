import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import SubTabBar from '../common/sub-tab-bar';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import TextInput from '../common/formik-text-input'
import DateInput from '../common/formik-date-input';
import { FACTS } from '../../redux/modules/api/fact.js';
import { identifyEndpoinsHelper } from '../../helper';

import '../../../vender/fontawesome-free/css/all.css';

const BottomContent = (props) => {
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const factDivisions = useSelector((state) => ({ ...state.api.fact.divisions }), shallowEqual);
    const factPosition = useSelector((state) => ({ ...state.api.fact.position }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);

    const [alertMessageProfile, setAlertMessageProfile] = useState('1');
    const [alertMessage, setAlertMessage] = useState('1');
    const [alertMessagePosition, setAlertMessagePosition] = useState('1');

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const formatDate = (dateISOString) => {
        let date = new Date(dateISOString);
        // year = date.getFullYear();
        // month = date.getMonth()+1;
        // dt = date.getDate();
        return date.toLocaleDateString('en-GB') + " " + date.toLocaleTimeString();
    }

    const [subTabNames, setSubtabNames] = useState([
        { id: "process", name: "กำลังดำเนินการ" },
        { id: "complete", name: "เสร็จสิ้น" },
    ]);

    const identifyEndpoins = (document_type_id) => identifyEndpoinsHelper(document_type_id)

    const onSave = (content) => {
        if (values.user_my === "user-profile") {
            if (content === "information") {
                const information =
                {
                    "employee_id": values.employee_id,
                    "firstname_th": values.firstname_th,
                    "lastname_th": values.lastname_th,
                    "email": values.email,
                    "address": values.address,
                    "birthdate": values.birthdate,
                    "phone": values.phone
                }
                console.log("information", information)
                axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, information, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        setAlertMessageProfile(true)
                        console.log(res);
                    }).catch(function (err) {
                        setAlertMessageProfile(false)
                        console.log("err", err)
                    })
            } else if (content === "password") {
                const pass =
                {
                    "password_old": values.password,
                    "password_new": values.newpassword
                }
                console.log("inpasswordformation", pass)
                axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile/change-password`, pass, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        setAlertMessage(true)
                        console.log(res);
                    }).catch(function (err) {
                        setAlertMessage(false)
                        console.log("err", err)
                    })
            }

        } else {
            console.log("HEllo i am admin ican edit them all")

            if (content === "information") {
                const information =
                {
                    "user_id": parseInt(values.user_id),
                    "user_profile": {
                        "employee_id": values.employee_id,
                        "firstname_th": values.firstname_th,
                        "lastname_th": values.lastname_th,
                        "email": values.email,
                        "address": values.address,
                        "birthdate": values.birthdate,
                        "phone": values.phone
                    }
                }
                console.log("information", information)
                axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/admin/user-profile/${values.user_id}`, information, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        setAlertMessageProfile(true)
                        console.log(res);
                    }).catch(function (err) {
                        setAlertMessageProfile(false)
                        console.log("err", err.response)
                    })
            } else if (content === "password") {
                const pass =
                {
                    "user_id": parseInt(values.user_id),
                    "password_new": values.newpassword
                }
                console.log("inpasswordformation", pass)
                axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/admin/user-profile/change-password/${values.user_id}`, pass, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        setAlertMessage(true)
                        console.log(res);
                    }).catch(function (err) {
                        setAlertMessage(false)
                        console.log("err", err.response)
                    })
            } else if (content === "position") {
                const position =
                {
                    "user_id": parseInt(values.user_id),
                    "position": [
                        parseInt(values.position_id)
                    ]
                }
                console.log("inpasswordformation", position)
                axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/admin/user-profile/position/${values.user_id}`, position, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then(res => {
                        setAlertMessagePosition(true)
                        console.log(res);
                    }).catch(function (err) {
                        setAlertMessagePosition(false)
                        console.log("err", err.response)
                    })
            }
        }

    }

    const validateNewPasswordField = (newpassword) => {
        if (newpassword.length >= 6) {
            return;
        } else {
            return 'ความยาวตัวอักษร 6 ตัวขึ้นไป';
        }
    }

    const validateConfirmpasswordField = (confirmpassword) => {
        if (!values.confirmpassword) {
            return 'Require';
        }
        if (confirmpassword === values.newpassword) {
            return;
        } else {
            return 'รหัสไม่ถูกต้อง';
        }
    }

    return (
        <div id="blackground-gray">
            <div className="container_12 clearfix">

                {/* === Tab breakdown_content  === */}
                <div id="officia_document_content" className="tabcontent">
                    <h3 className="head-title-bottom mt-2">เอกสารราชการ</h3>

                    <SubTabBar tabNames={subTabNames} initialTabID="process">
                        <div id="process_content" className="subtabcontent">
                            <div className="grid_12 mt-2">
                                <table className="table-many-column" style={{ height: "350px" }}>
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "200px" }}>เลขที่เอกสาร</th>
                                            <th className="font" style={{ minWidth: "380px" }}>ประเภทเอกสาร</th>
                                            <th className="font" style={{ minWidth: "200px" }}>วันเวลาที่สร้าง</th>
                                            <th className="font" style={{ minWidth: "150px" }}>สถานะเอกสาร</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {values.items.map(function (item, index) {
                                            if (item.document_status_id !== 3) {
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding">{item.internal_document_id} </td>
                                                        <td className="edit-padding">{item.document_type_name} </td>
                                                        <td className="edit-padding">{formatDate(item.created_on)} </td>
                                                        <td className="edit-padding">
                                                            <select className="edit-select" value={item.document_status_id} disabled>
                                                                <option value=''></option>
                                                                {fact[FACTS.DOCUMENT_STATUS].items.map((status) => {
                                                                    return <option value={status.document_status_id}>{status.status}</option>
                                                                })}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="complete_content" className="subtabcontent">
                        <div className="grid_12 mt-2">
                                <table className="table-many-column" style={{ height: "350px" }}>
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "200px" }}>เลขที่เอกสาร</th>
                                            <th className="font" style={{ minWidth: "380px" }}>ประเภทเอกสาร</th>
                                            <th className="font" style={{ minWidth: "200px" }}>วันเวลาที่สร้าง</th>
                                            <th className="font" style={{ minWidth: "150px" }}>สถานะเอกสาร</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {values.items.map(function (item, index) {
                                            if (item.document_status_id === 3) {
                                                return (
                                                    <tr key={index} id={index}>
                                                        <td className="edit-padding">{item.internal_document_id} </td>
                                                        <td className="edit-padding">{item.document_type_name} </td>
                                                        <td className="edit-padding">{formatDate(item.created_on)} </td>
                                                        <td className="edit-padding">
                                                            <select className="edit-select" value={item.document_status_id} disabled>
                                                                <option value=''></option>
                                                                {fact[FACTS.DOCUMENT_STATUS].items.map((status) => {
                                                                    return <option value={status.document_status_id}>{status.status}</option>
                                                                })}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </SubTabBar>
                </div>

                {/* === Tab related_parties_content  === */}
                <div id="user_information_content" className="tabcontent">

                    <h3 className="head-title-bottom mt-2">ข้อมูลบัญชีผู้ใช้</h3>

                    <div className="card-profile">
                        <div className="card-profile-header">ข้อมูลส่วนตัว</div>
                        <div className="card-profile-main">

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ชื่อ</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='firstname_th'
                                        tabIndex="1" />
                                </div>
                                <div className="grid_2"><p className="cancel-default float-left">นามสกุล</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='lastname_th'
                                        tabIndex="1" />
                                </div>
                            </div>

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">Email</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='email' type="email"
                                        tabIndex="1" />
                                </div>

                                <div className="grid_2"><p className="cancel-default float-left">ที่อยู่</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='address'
                                        tabIndex="1" />
                                </div>
                            </div>

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">วันเกิด</p></div>
                                <div className="grid_3 pull_0">
                                    <DateInput name="birthdate" tabIndex="1" />
                                </div>

                                <div className="grid_2"><p className="cancel-default float-left">เบอร์โทรศัพท์</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='phone'
                                        tabIndex="1" />
                                </div>
                            </div>

                            <div className="grid_12">
                                <div className="grid_2 pull_0 float-right ">
                                    <button className="button-blue edit  mr-5" type="button" onClick={(e) => { if (window.confirm('คุณต้องการแก้ไขข้อมูลส่วนตัวหรือไม่')) { onSave('information') } }} >บันทึก</button>

                                </div>
                            </div>
                            {
                                alertMessageProfile === true || alertMessageProfile === false
                                    ?
                                    <div className={`alert ${alertMessageProfile === false ? `red` : ''} mt-1`}>
                                        <span className="closebtn" onClick={() => setAlertMessageProfile("1")}>&times;</span>
                                        Success! Indicates a successful or positive action.</div>
                                    :
                                    null
                            }
                        </div>
                    </div>

                    <div className="card-profile">
                        <div className="card-profile-header">แก้ไขรหัสผ่าน</div>
                        <div className="card-profile-main">

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">รหัสผ่านเก่า</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='password' type="password"
                                        tabIndex="1" />
                                </div>
                            </div>
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">รหัสผ่านใหม่</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='newpassword' type="password"
                                        validate={validateNewPasswordField}
                                        tabIndex="1" />
                                </div>
                            </div>
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ยืนยันรหัสผ่านใหม่</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='confirmpassword' type="password"
                                        validate={validateConfirmpasswordField}
                                        tabIndex="1" />
                                </div>
                                <div className="grid_2 pull_0 float-right ">
                                    <button className="button-blue edit  mr-5" type="button" onClick={(e) => { if (window.confirm('คุณต้องการแก้ไขรหัสผ่านหรือไม่')) { onSave('password') } }} >บันทึก</button>
                                </div>
                            </div>
                            {
                                alertMessage === true || alertMessage === false
                                    ?
                                    <div className={`alert ${alertMessage === false ? `red` : ''} mt-1`}>
                                        <span className="closebtn" onClick={() => setAlertMessage("1")}>&times;</span>
                                        Success! Indicates a successful or positive action.</div>
                                    :
                                    null
                            }
                        </div>
                    </div>

                    <div className="card-profile">
                        <div className="card-profile-header">ตำแหน่งงาน</div>
                        <div className="card-profile-main">

                            {/* <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ศูนย์</p></div>
                                <div className="grid_3 pull_0">
                                    <SelectNoChildrenInput name="station" >
                                        <option value=''></option>
                                        {factStations.items.map(function ({ station_id, name }) {
                                            return <option value={station_id} key={station_id}> {name} </option>
                                        })}
                                    </SelectNoChildrenInput>
                                </div>
                            </div> */}

                            {/* <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">กอง</p></div>
                                <div className="grid_3 pull_0">
                                    <SelectNoChildrenInput name="divisions" >
                                        <option value=''></option>
                                        {factDivisions.items.map(function ({ divisions_id, name }) {
                                            return <option value={divisions_id} key={divisions_id}> {name} </option>
                                        })}
                                    </SelectNoChildrenInput>
                                </div>
                            </div> */}

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">หน่วยงาน</p></div>
                                <div className="grid_3 pull_0">
                                    <SelectNoChildrenInput name="position_id" disabled={values.user_my === "user-profile"}>
                                        <option value=''></option>
                                        {factPosition.items.map(function ({ position_id, name }) {
                                            return <option value={position_id} key={position_id}> {name} </option>
                                        })}
                                    </SelectNoChildrenInput>
                                </div>
                            </div>

                            <div className="grid_12">
                                {/* <div className="grid_2"><p className="cancel-default">ตอน</p></div>
                                <div className="grid_3 pull_0">
                                    <SelectNoChildrenInput name="zone" >
                                        <option value=''></option>
                                        {factNodes.items.map(function ({ node_id, name }) {
                                            return <option value={node_id} key={node_id}> {name} </option>
                                        })}
                                    </SelectNoChildrenInput>
                                </div> */}
                                <div className="grid_2 pull_0 float-right ">
                                    {values.user_my === "user-profile" ?

                                        <button className="button-blue edit  mr-5" disabled="disabled" type="button" onClick={(e) => { if (window.confirm('คุณต้องการแก้ไขตำแหน่งงานหรือไม่')) { onSave('position') } }} >บันทึก</button>
                                        :
                                        <button className="button-blue edit  mr-5" type="button" onClick={(e) => { if (window.confirm('คุณต้องการแก้ไขตำแหน่งงานหรือไม่')) { onSave('position') } }} >บันทึก</button>
                                    }
                                </div>
                            </div>

                            {
                                alertMessagePosition === true || alertMessagePosition === false
                                    ?
                                    <div className={`alert ${alertMessagePosition === false ? `red` : ''} mt-1`}>
                                        <span className="closebtn" onClick={() => setAlertMessagePosition("1")}>&times;</span>
                                        Success! Indicates a successful or positive action.</div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>

                {/* === Tab related_parties_content  === */}
                <div id="usage_history_content" className="tabcontent">
                    <h3 className="head-title-bottom mt-2">ประวัติการใช้งาน</h3>
                    <div className="grid_12">
                        <table className="table-many-column">
                            <thead>
                                <tr>
                                    <th className="font" style={{ minWidth: "200px" }}>วันเวลา</th>
                                    <th className="font" style={{ minWidth: "400px" }}>ประเภทของเอกสาร</th>
                                    <th className="font" style={{ minWidth: "200px" }}>เลขที่เอกสาร</th>
                                    <th className="font" style={{ minWidth: "130px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values.items.map(function (item, index) {
                                    return (
                                        <tr key={index} id={index}>
                                            <td className="edit-padding" >{formatDate(item.created_on)} </td>
                                            <td className="edit-padding" >{item.document_type_name} </td>
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
            </div>
        </div>
    )
}

export default BottomContent;
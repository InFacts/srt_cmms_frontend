import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import { useFormikContext, useField } from 'formik';
import { validatedataDocumentField } from '../../helper';
import { FACTS } from '../../redux/modules/api/fact.js'
import { useSelector, shallowEqual } from 'react-redux';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import TextInput from '../common/formik-text-input'
import EmailInput from '../common/formik-email-input'

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-register.css';

import BgPink from '../../../images/admin/bg_pink.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const Register = (props) => {
    // const [register, setRegister] = useState(false)
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const factPosition = useSelector((state) => ({ ...state.api.fact.position }), shallowEqual);
    const factUser = useSelector((state) => ({ ...state.api.fact.users }), shallowEqual);
    const [alertMessage, setAlertMessage] = useState('1');

    const handleSubmit = event => {
        event.preventDefault();
        let last_user_id;
        factUser.items.map((user) => {
            last_user_id = user.user_id;
        })
        const register =
        {
            "create_account": true,
            "data": {
                "employee_id": values.employee_id,
                "username": values.username,
                "email": values.email,
                "firstname_th": values.firstname,
                "lastname_th": values.lastname,
                "password": values.password,
            },
            "position": [parseInt(values.position_id)]
        }
        console.log("Register", register)
        axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/auth/create-account`, register, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then(res => {
                console.log(res);
                setAlertMessage(true)
            }).catch(function (err) {
                console.log("err", err.response)
                setAlertMessage(false)
            })
    }

    const validateFirstnameField = (...args) => validatedataDocumentField("firstname", setFieldValue, ...args)
    const validateLastnameField = (...args) => validatedataDocumentField("lastname", setFieldValue, ...args)
    const validatePositionField = (...args) => validatedataDocumentField("position_id", setFieldValue, ...args)

    const validateEmployeeIDField = (employee_id) => {
        if (!values.employee_id) {
            return 'Require';
        }
        let items = factUser.items;
        let item = items.find(item => `${item.employee_id}` === `${employee_id}`); // Returns undefined if not found
        // console.log(item)
        if (item) {
            return 'Duplicate Employee ID';
        } else {
            return '';
        }
    }

    const validateUsernameField = (username) => {
        if (!values.username) {
            return 'Require';
        }
        let items = factUser.items;
        let item = items.find(item => `${item.username}` === `${username}`); // Returns undefined if not found
        // console.log(item)
        if (item) {
            return 'Duplicate Username';
        } else {
            return '';
        }
    }

    const validateEmailField = (email) => {
        if (!email) {
            return 'Require';
        }
        if (email.search("@") !== -1) {
            return;
        } else {
            return 'กรุณากรอก Email ให้ถูกต้อง';
        }
    }

    const validatePasswordField = (password) => {
        if (!password) {
            return 'Require';
        }
        if (password.length >= 6) {
            return;
        } else {
            return 'ตัวอักษรอย่างน้อย 6 ตัว';
        }
    }

    const validateConfirmpasswordField = (confirmpassword) => {
        if (!values.confirmpassword) {
            return 'Require';
        }
        if (confirmpassword === values.password) {
            return;
        } else {
            return 'รหัสไม่ถูกต้อง';
        }
    }

    return (
        <div id={changeTheam() === true ? "" : "blackground-white"} style={changeTheam() === true ? { backgroundImage: `url(${BgPink})`, width: "100vw", height: "100vh" } : { height: "100vh" }}>
            <div className="container_12 clearfix">
                <form onSubmit={handleSubmit}>
                    <div className="container_12 from-register">
                        <h4 className="head-register">สร้างผู้ใช้งานภายในระบบ</h4>

                        <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "410px", paddingTop: "10px" } : {}} >

                            <div className="grid_5">
                                <div className="card-profile">
                                    <div className="card-profile-header">ข้อมูลส่วนตัว</div>
                                    <div className="card-profile-main" style={{ height: "270px" }}>

                                        <div className="container_12">
                                            <div className="container_12"><p className="cancel-default">รหัสพนักงาน</p></div>
                                            <div className="grid_4 alpha omega">
                                                <TextInput name='employee_id'
                                                    validate={validateEmployeeIDField}
                                                    tabIndex="1" />
                                            </div>
                                        </div>

                                        <div className="container_12">
                                            <div className="container_12"><p className="cancel-default">Username</p></div>
                                            <div className="grid_4 alpha omega">
                                                <TextInput name='username'
                                                    validate={validateUsernameField}
                                                    tabIndex="1" />
                                            </div>
                                        </div>

                                        <div className="container_12">
                                            <div className="container_12"><p className="cancel-default">รหัสผ่าน</p></div>
                                            <div className="grid_4 alpha omega">
                                                <TextInput name='password'
                                                    type="password"
                                                    validate={validatePasswordField}
                                                    tabIndex="1" />
                                            </div>
                                        </div>

                                        <div className="container_12">
                                            <div className="container_12"><p className="cancel-default">ยืนยันรหัสผ่าน</p></div>
                                            <div className="grid_4 alpha omega">
                                                <TextInput name='confirmpassword'
                                                    type="password"
                                                    validate={validateConfirmpasswordField}
                                                    tabIndex="1" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="grid_5 float-right">
                                <div className="card-profile">
                                    <div className="card-profile-header">ตำแหน่งงาน</div>
                                    <div className="card-profile-main" style={{ height: "270px" }}>

                                        <div className="container_12">
                                            <div className="container_12"><p className="cancel-default">ชื่อ</p></div>
                                            <div className="grid_4 alpha omega">
                                                <TextInput name='firstname'
                                                    validate={validateFirstnameField}
                                                    tabIndex="1" />
                                            </div>
                                        </div>

                                        <div className="container_12">
                                            <div className="container_12"><p className="cancel-default">นามสกุล</p></div>
                                            <div className="grid_4 alpha omega">
                                                <TextInput name='lastname'
                                                    validate={validateLastnameField}
                                                    tabIndex="1" />
                                            </div>
                                        </div>

                                        <div className="container_12">
                                            <div className="container_12"><p className="cancel-default">Email</p></div>
                                            <div className="grid_4 alpha omega">
                                                <EmailInput name='email'
                                                    validate={validateEmailField}
                                                    tabIndex="1" />
                                            </div>
                                        </div>
                                        <div className="container_12">
                                            <div className="container_12"><p className="cancel-default">หน่วยงาน</p></div>
                                            <div className="grid_4 alpha omega ">
                                                <SelectNoChildrenInput name="position_id" validate={validatePositionField} cssStyle={{ left: "-240px", top: "14px" }}>
                                                    <option value=''></option>
                                                    {factPosition.items.map(function ({ position_id, name }) {
                                                        if (name !== "SERVER") {
                                                            return <option value={position_id} key={position_id}> {name} </option>
                                                        }
                                                    })}
                                                </SelectNoChildrenInput>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {alertMessage === true || alertMessage === false ?
                                <div className={`grid_10 alert ${alertMessage === false ? `red` : ''}`} style={{ width: "835px" }}>
                                    <span className="closebtn" onClick={() => setAlertMessage("1")}>&times;</span>
                                    {alertMessage === false ? "ล้มเหลว! สร้างผู้ใช้งานไม่สำเร็จ กรุณาเช็คข้อมูลให้ถูกต้อง" : "สร้างผู้ใช้งานสำเร็จ"}
                                </div> : null}

                            <div className="grid_10 " style={{ "text-align": "center" }}>
                                <button className="button-red from-register-button" style={{ "width": "300px" }} type="submit">สร้างผู้ใช้งาน</button>
                            </div>

                        </div>

                    </div>
                </form>
            </div>
        </div >
    )

};

export default Register;
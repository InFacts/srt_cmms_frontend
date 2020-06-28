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

import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-register.css';
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
                "user_id": parseInt(last_user_id + 1), 
                "employee_id": values.employee_id,
                "username": values.username,
                "email": values.email,
                "firstname_th": values.firstname,
                "lastname_th": values.lastname,
                "password": values.password,
                "position_id": values.position_id
            }
        }
        console.log("Register", register)
        axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/auth/create-account`, register, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
            .then(res => {
                console.log(res);
                setAlertMessage(true)
            }).catch(function (err) {
                setAlertMessage(false)
            })
    }

    const validateFirstnameField = (...args) => validatedataDocumentField("firstname", setFieldValue, ...args)
    const validateLastnameField = (...args) => validatedataDocumentField("lastname", setFieldValue, ...args)
    const validateEmailField = (...args) => validatedataDocumentField("email", setFieldValue, ...args)
    const validatePositionField = (...args) => validatedataDocumentField("position_id", setFieldValue, ...args)
    const validatePasswordField = (...args) => validatedataDocumentField("password", setFieldValue, ...args)

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
        <div id="blackground-white" style={{ height: "100vh" }}>
            <div className="container_12 clearfix">
                <form onSubmit={handleSubmit}>
                    <div className="container_12 from-register">
                        <h4 className="head-register">สร้างผู้ใช้งานภายในระบบ</h4>

                        <div className="grid_5">
                            <div className="card-profile">
                                <div className="card-profile-header">ข้อมูลส่วนตัว</div>
                                <div className="card-profile-main" style={{ height: "400px" }}>

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
                                <div className="card-profile-main" style={{ height: "400px" }}>

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
                                            <TextInput name='email'
                                                type="email"
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
                                                    return <option value={position_id} key={position_id}> {name} </option>
                                                })}
                                            </SelectNoChildrenInput>
                                        </div>
                                    </div>

                                </div>
                            </div>
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
                    <div className="container_12 " style={{ "text-align": "center" }}>
                        <button className="button-red from-register-button" style={{ "width": "300px" }} type="submit">สร้างผู้ใช้งาน</button>
                    </div>
                </form>
            </div>
        </div >
    )

};

export default Register;
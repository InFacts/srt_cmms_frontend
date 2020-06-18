import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import '../../../vender/fontawesome-free/css/all.css';
import '../../../css/style-register.css';

import RedHouse from '../../../images/red-house.svg';
import logo from '../../../images/logo.png';
import TextInput from '../common/formik-text-input'
import { useFormikContext, useField } from 'formik';
import { validatedataDocumentField } from '../../helper';
import { FACTS } from '../../redux/modules/api/fact.js'
import { useSelector, shallowEqual } from 'react-redux';
import SelectNoChildrenInput from '../common/formik-select-no-children';

const Register = (props) => {


    const [register, setRegister] = useState(false)


    const validateEmployeeIDField = (...args) => validatedataDocumentField("employee_id", setFieldValue, ...args)
    const validateUsernameField = (...args) => validatedataDocumentField("username", setFieldValue, ...args)
    const validateFirstnameField = (...args) => validatedataDocumentField("firstname", setFieldValue, ...args)
    const validateLastnameField = (...args) => validatedataDocumentField("lastname", setFieldValue, ...args)
    const validatePasswordField = (...args) => validatedataDocumentField("password", setFieldValue, ...args)
    const validateConfirmpasswordField = (...args) => validatedataDocumentField("confirmpassword", setFieldValue, ...args)
    const validateEmailField = (...args) => validatedataDocumentField("email", setFieldValue, ...args)

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const factDivisions = useSelector((state) => ({ ...state.api.fact.divisions }), shallowEqual);

    const handleSubmit = event => {
        event.preventDefault();
        if (values.password !== values.confirmpassword) {
            alert("Password did not match: Please try again...");
        } else {
            const register =
            {
                "create_account": true,
                "data": {
                    "employee_id": values.employee_id,
                    "username": values.username,
                    "email": values.email,
                    "firstname_th": values.firstname,
                    "lastname_th": values.lastname,
                }
            }
            console.log("Register", register)
            axios.post(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/auth/create-account`, register)
                .then(res => {
                    console.log(res);
                    setRegister(true);
                }).catch(function (err) {
                    setRegister(false);
                })
        }

    }

    const FormDropdown = ({ factList, onChange, idName, descriptionName, gridClass }) => (
        <select className={`edit-select-top ${gridClass}`} onChange={onChange}>
            <option defaultValue="" key={0}></option>
            {factList.map(function (fact, index) {
                if (fact[idName] !== 0) { // Mostly Zeros are Defaults made by System
                    return <option value={fact[idName]} key={index + 1}>{fact[descriptionName]}</option>
                }
            })}
        </select>
    );

    if (register === true) {
        return <Redirect to='/main' />
    }
    return (
        <div>
            <div className="container_12 clearfix">
                <form onSubmit={handleSubmit}>
                    <div className="grid_12 from-register">
                        <h4 className="head-register">สร้างผู้ใช้งานภายในระบบ</h4>


                        <div className="grid_5">
                            <div class="card-profile">
                                <div class="card-profile-header">ข้อมูลส่วนตัว</div>
                                <div class="card-profile-main">

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">รหัสพนักงาน</p></div>
                                        <div className="grid_4">
                                            <TextInput name='employee_id'
                                                validate={validateEmployeeIDField}
                                                tabIndex="1" required/>
                                        </div>
                                    </div>

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">Username</p></div>
                                        <div className="grid_4">
                                            <TextInput name='username'
                                                validate={validateUsernameField}
                                                tabIndex="1" required/>
                                        </div>
                                    </div>

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">ชื่อ</p></div>
                                        <div className="grid_4">
                                            <TextInput name='firstname'
                                                validate={validateFirstnameField}
                                                tabIndex="1" required/>
                                        </div>
                                    </div>

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">นามสกุล</p></div>
                                        <div className="grid_4">
                                            <TextInput name='lastname'
                                                validate={validateLastnameField}
                                                tabIndex="1" required/>
                                        </div>
                                    </div>

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">Email</p></div>
                                        <div className="grid_4">
                                            <TextInput name='email'
                                                type="email"
                                                validate={validateEmailField}
                                                tabIndex="1" required/>
                                        </div>
                                    </div>

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">รหัสผ่าน</p></div>
                                        <div className="grid_4">
                                            <TextInput name='password'
                                                type="password"
                                                validate={validatePasswordField}
                                                tabIndex="1" required/>
                                        </div>
                                    </div>


                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">ยืนยันรหัสผ่าน</p></div>
                                        <div className="grid_4">
                                            <TextInput name='confirmpassword'
                                                type="password"
                                                validate={validateConfirmpasswordField}
                                                tabIndex="1" required/>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>

                        <div className="grid_5 float-right">
                            <div class="card-profile">
                                <div class="card-profile-header">ตำแหน่งงาน</div>
                                <div class="card-profile-main">

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">ศูนย์</p></div>
                                        <div className="grid_4 ">

                                            <SelectNoChildrenInput name="station" >
                                                <option value=''></option>
                                                {factStations.items.map(function ({ station_id, name }) {
                                                    return <option value={station_id} key={station_id}> {name} </option>
                                                })}
                                            </SelectNoChildrenInput>
                                            {/* 
                                            <FormDropdown factList={props.station_list} onChange={props.onChangeStationTrackDocument}
                                                idName="station_id" descriptionName="name" gridClass="grid_4" /> */}
                                        </div>
                                    </div>

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">กอง</p></div>
                                        <div className="grid_4">


                                            <SelectNoChildrenInput name="divisions" >
                                                <option value=''></option>
                                                {factDivisions.items.map(function ({ divisions_id, name }) {
                                                    return <option value={divisions_id} key={divisions_id}> {name} </option>
                                                })}
                                            </SelectNoChildrenInput>

                                        </div>
                                    </div>

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">หน่วยงาน/แขวง</p></div>
                                        <div className="grid_4 ">
                                            <SelectNoChildrenInput name="district" >
                                                <option value=''></option>
                                                {factDistricts.items.map(function ({ district_id, name }) {
                                                    return <option value={district_id} key={district_id}> {name} </option>
                                                })}
                                            </SelectNoChildrenInput>
                                        </div>
                                    </div>

                                    <div className="grid_12">
                                        <div className="grid_12"><p className="cancel-default">ตอน</p></div>
                                        <div className="grid_4 ">

                                            <SelectNoChildrenInput name="zone" >
                                                <option value=''></option>
                                                {factNodes.items.map(function ({ node_id, name }) {
                                                    return <option value={node_id} key={node_id}> {name} </option>
                                                })}
                                            </SelectNoChildrenInput>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="grid_12 " style={{ "text-align": "center" }}>
                        <button className="button-red from-register-button" style={{ "width": "300px" }} type="submit">สร้างผู้ใช้งาน</button>
                    </div>
                </form>
            </div>
        </div >
    )

};

export default Register;
// const mapStateToProps = (state) => ({
//     fact: state.api.fact,

// })
// const mapDispatchToProps = {

// }
// export default connect(mapStateToProps, mapDispatchToProps)(Register);
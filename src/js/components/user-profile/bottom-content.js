import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import '../../../vender/fontawesome-free/css/all.css';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import TabBar from '../common/tab-bar';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import TextInput from '../common/formik-text-input'

const BottomContent = (props) => {

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const formatDate = (dateISOString) => {
        let date = new Date(dateISOString);
        // year = date.getFullYear();
        // month = date.getMonth()+1;
        // dt = date.getDate();
        return date.toLocaleDateString('en-GB') + " " + date.toLocaleTimeString();
    }

    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
    const factDivisions = useSelector((state) => ({ ...state.api.fact.divisions }), shallowEqual);


    const [subTabNames, setSubtabNames] = useState([
        { id: "process", name: "กำลังดำเนินการ" },
        { id: "complete", name: "เสร็จสิน" },
    ]);

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

    const onSave = (content) => {
        if (values.user_my === "user-profile") {
            if (content === "information") {
                const information =
                {
                    "user_id": values.user_id,
                    "employee_id": values.employee_id,
                    "firstname_th": values.firstname,
                    "lastname_th": values.lastname,
                    "email": values.email
                }
                console.log("information", information)
                axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, information)
                    .then(res => {
                        console.log(res);
                    }).catch(function (err) {
                        console.log("err", err)
                    })
            } else if (content === "password") {
                if (values.password !== values.confirmpassword) {
                    alert("Password did not match: Please try again...");
                } else {
                    const pass =
                    {
                        "password_old": values.password,
                        "password_new": values.newpassword
                    }
                    console.log("inpasswordformation", pass)
                    axios.put(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile/change-password`, pass)
                        .then(res => {
                            console.log(res);
                        }).catch(function (err) {
                        })
                }
            } else if (content === "position") {


            }

        } else {


        }


    }

    return (
        <div id="blackground-gray">
            <div className="container_12 clearfix">

                {/* === Tab breakdown_content  === */}
                <div id="officia_document_content" className="tabcontent">
                    <h3 className="head-title-bottom mt-2">เอกสารราชการ</h3>

                    {/* <TabBar tabNames={subTabNames} initialTabID="process"> */}
                    {/* <div id="process_content" className="tabcontent"> */}
                    <div className="grid_12">
                        <table className="table-many-column">
                            <thead>
                                <tr>
                                    <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                                    <th className="font" style={{ minWidth: "500px" }}>ประเภทเอกสาร</th>
                                    {/* <th className="font" style={{ minWidth: "300px" }}>รายละเอียด</th> */}
                                    <th className="font" style={{ minWidth: "180px" }}>วันเวลาที่สร้าง</th>
                                    {/* <th className="font" style={{ minWidth: "150px" }}>สถานะเอกสาร Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>

                                {values.items.map(function (item, index) {
                                    console.log("item", item)
                                    return (
                                        <tr key={index} id={index}>
                                            <td className="edit-padding" >{item.internal_document_id} </td>
                                            <td className="edit-padding" >{item.document_type_name} </td>
                                            <td className="edit-padding" >{formatDate(item.created_on)} </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* </div> */}
                    {/* <div id="complete_content" className="tabcontent">
                            <div className="grid_12">
                                <table className="table-many-column mt-3">
                                    <thead>
                                        <tr>
                                            <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                                            <th className="font" style={{ minWidth: "150px" }}>ประเภทเอกสาร</th>
                                            <th className="font" style={{ minWidth: "150px" }}>วันที่</th>
                                            <th className="font" style={{ minWidth: "150px" }}>สถานะเอกสาร Actions</th>
                                            <th className="font" style={{ minWidth: "150px" }}>รายละเอียด</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    {/* </TabBar> */}
                </div>


                {/* === Tab related_parties_content  === */}
                <div id="user_information_content" className="tabcontent">

                    <h3 className="head-title-bottom mt-2">ข้อมูลบัญชีผู้ใช้</h3>

                    <div class="card-profile">
                        <div class="card-profile-header">ข้อมูลส่วนตัว</div>
                        <div class="card-profile-main">

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ชื่อ</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='firstname'
                                        tabIndex="1" />
                                </div>
                                <div className="grid_2"><p className="cancel-default float-left">นามสกุล</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='lastname'
                                        tabIndex="1" />
                                </div>
                            </div>

                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">Email</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='email' type="email"
                                        tabIndex="1" />

                                </div>
                            </div>

                            <div className="grid_12">
                                <div className="grid_2 pull_0 float-right ">
                                    <button className="button-blue edit  mr-5" type="button" onClick={(e) => { if (window.confirm('คุณต้องการแก้ไขข้อมูลส่วนตัวหรือไม่')) { onSave('information') } }} >บันทึก</button>

                                </div>
                            </div>



                        </div>
                    </div>

                    <div class="card-profile">
                        <div class="card-profile-header">แก้ไขรหัสผ่าน</div>
                        <div class="card-profile-main">

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
                                        tabIndex="1" />
                                </div>
                            </div>
                            <div className="grid_12">
                                <div className="grid_2"><p className="cancel-default">ยืนยันรหัสผ่านใหม่</p></div>
                                <div className="grid_3 pull_0">
                                    <TextInput name='confirmpassword' type="password"
                                        tabIndex="1" />
                                </div>
                                <div className="grid_2 pull_0 float-right ">
                                    <button className="button-blue edit  mr-5" type="button" onClick={(e) => { if (window.confirm('คุณต้องการแก้ไขรหัสผ่านหรือไม่')) { onSave('password') } }} >บันทึก</button>
                                </div>
                            </div>


                        </div>
                    </div>


                    <div class="card-profile">
                        <div class="card-profile-header">ตำแหน่งงาน</div>
                        <div class="card-profile-main">

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
                                <div className="grid_2"><p className="cancel-default">หน่วยงาน/แขวง</p></div>
                                <div className="grid_3 pull_0">
                                    <SelectNoChildrenInput name="district"
                                        disabled={values.user_my === "user-profile"}
                                    >
                                        <option value=''></option>
                                        {factDistricts.items.map(function ({ district_id, name }) {
                                            return <option value={district_id} key={district_id}> {name} </option>
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
                        </div>
                    </div>
                </div>


                {/* === Tab related_parties_content  === */}
                <div id="usage_history_content" className="tabcontent">
                    <h3 className="head-title-bottom mt-2">ประวัติการใช้งาน</h3>
                    <div className="grid_12">
                        <table className="table-many-column mt-3">
                            <thead>
                                <tr>
                                    <th className="font" style={{ minWidth: "150px" }}>วันเวลา</th>
                                    <th className="font" style={{ minWidth: "380px" }}>ประเภทของเอกสาร</th>
                                    {/* <th className="font" style={{ minWidth: "150px" }}>ประเภทของ Actions</th> */}
                                    <th className="font" style={{ minWidth: "150px" }}>เลขที่เอกสาร</th>
                                    <th className="font" style={{ minWidth: "150px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {values.items.map(function (item, index) {
                                    console.log(item)
                                    return (
                                        <tr key={index} id={index}>
                                            <td className="edit-padding" >{formatDate(item.created_on)} </td>
                                            <td className="edit-padding" >{item.document_type_name} </td>
                                            {/* <td className="edit-padding" >{formatDate(item.created_on)} </td> */}
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
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { connect } from 'react-redux';
import '../../../vender/fontawesome-free/css/all.css';
import { useFormik, withFormik, useFormikContext } from 'formik';
import { useSelector, shallowEqual } from 'react-redux';
import TextInput from '../common/formik-text-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';

const TopContent = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
    const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
    const factUser = useSelector((state) => ({ ...state.api.fact.users }), shallowEqual);
    useEffect(() => {
        setFieldValue("item_list", factUser.items);
    }, [factUser.items]);

    const searchUser = () => {
        setFieldValue("item_list", factUser.items.filter(item => {
            // ตัวแปร item ยังไม่แน่ชัดเพราะเรื่อง API
            const query = values.user_id.toLowerCase();
            const query2 = values.employee_id.toLowerCase();
            const query3 = values.name.toLowerCase();
            const query4 = values.district.toLowerCase();
            const query5 = values.zone.toLowerCase();
            return (
                (item.username.toLowerCase().indexOf(query) >= 0 || !query) &&
                (item.employee_id.toLowerCase().indexOf(query2) >= 0 || !query2) &&
                (item.firstname_th.toLowerCase().indexOf(query3) >= 0 || !query3) &&
                (item.district.toLowerCase().indexOf(query4) >= 0 || !query4) &&
                (item.zone.toLowerCase().indexOf(query5) >= 0 || !query5) 
            )
        })
        );
    }

    return (
        <div id="blackground-white">
            <div className="container_12 clearfix" >
                {/* Section Title */}
                <section className="container_12 ">
                    <h4 className="head-title">บริหารจัดการผู้ใช้งาน</h4>
                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">หน่วยงาน </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <SelectNoChildrenInput name="district" >
                                <option value=''></option>
                                {factDistricts.items.map(function ({ district_id, name }) {
                                    return <option value={district_id} key={district_id}> {name} </option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                        <div className="grid_2  ">
                            <p className="cancel-default">ตำแหน่งงาน </p>
                        </div>
                        <div className="grid_3">
                            <SelectNoChildrenInput name="zone" >
                                <option value=''></option>
                                {factNodes.items.map(function ({ node_id, name }) {
                                    return <option value={node_id} key={node_id}> {name} </option>
                                })}
                            </SelectNoChildrenInput>
                        </div>
                    </div>
                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">Username </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <TextInput name='user_id'
                                tabIndex="1" />
                        </div>
                        <div className="grid_2  ">
                            <p className="cancel-default">ชื่อ-นามสกุล </p>
                        </div>
                        <div className="grid_3">
                            <TextInput name='name'
                                tabIndex="1" />
                        </div>
                    </div>
                    <div className="container_12">
                        <div className="grid_2 cancel-default">
                            <p className="cancel-default">เลขที่พนักงาน </p>
                        </div>
                        <div className="grid_3 pull_0">
                            <TextInput name='employee_id'
                                tabIndex="1" />
                        </div>
                        <button className="button-blue edit grid_1 float-right mr-5" type="button" onClick={searchUser}>ค้นหา</button>
                    </div>
                </section>
            </div>
        </div>
    )
};
export default TopContent;
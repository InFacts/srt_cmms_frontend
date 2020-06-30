import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormik, withFormik, useFormikContext } from 'formik';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import CheckboxInput from '../common/formik-checkbox-input';
import Label from '../common/form-label'

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const { values } = useFormikContext();
    const [alertMessage, setAlertMessage] = useState('1');

    const postPermission = () => new Promise(resolve => {
        console.log("values", values)
        {
            values.line_position_permission.map((list, index) => {
                var data = {
                    "enable_permission": true,
                    "position_id": list.position_id,
                    "function": [
                        list.module_spare === true ? 1 : 0,
                        list.module_pmt === true ? 2 : 0,
                        list.module_als === true ? 3 : 0,
                        list.module_track_document === true ? 4 : 0,
                        list.module_admin === true ? 5 : 0,
                    ]
                }
                // console.log("data", data)
                let data_function_for_post = [];
                data.function.map((module, index) => {
                    if (module !== 0) {
                        data_function_for_post.push(module);
                    }
                })
                // console.log("data_for_post", data_function_for_post)
                var data_for_post = {
                    "enable_permission": true,
                    "position_id": list.position_id,
                    "function": data_function_for_post
                }
                const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/admin/position-permission`;
                axios.post(url, data_for_post, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                    .then((res) => {
                        // console.log("res AFTER POST POSITION PERMISSION", res)
                        setAlertMessage(true)
                        resolve(res.data);
                    })
                    .catch((err) => {
                        setAlertMessage(false)
                        resolve(err)
                    });

            })
        };
    });
    // console.log("alertMessage", alertMessage)
    return (
        <div id="blackground-gray">
            <div className="container_12 clearfix">
                <table className="table-many-column mt-2" style={{ height: "450px" }}>
                    <thead>
                        <tr>
                            <th className="font text-center">#</th>
                            <th className="font">ตำแหน่ง</th>
                            <th className="font">ระบบบริหารข้อมูลอะไหล่</th>
                            <th className="font">ระบบบริหารงานซ่อมบำรุง</th>
                            <th className="font">ระบบวิเคราะห์เเละวางแผนการซ่อมบำรุง</th>
                            <th className="font text-center">สถานะรอการอนุมัติ</th>
                            <th className="font">ระบบบริหารจัดการผู้ใช้งาน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.line_position_permission.map((list, index) => {
                            return (
                                <tr>
                                    <td className="edit-padding text-center">{index + 1}</td>
                                    <td className="edit-padding">{list.abbreviation} - {list.name}</td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].module_spare`}
                                            checked={values.line_position_permission[index].module_spare} value={true} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].module_pmt`}
                                            checked={values.line_position_permission[index].module_pmt} value={true} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 95px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].module_als`}
                                            checked={values.line_position_permission[index].module_als} value={true} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].module_track_document`}
                                            checked={values.line_position_permission[index].module_track_document} value={true} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].module_admin`}
                                            checked={values.line_position_permission[index].module_admin} value={true} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {
                    alertMessage === true || alertMessage === false
                        ?
                        <div className={`alert ${alertMessage === false ? `red` : ''} mt-1`}>
                            <span className="closebtn" onClick={() => setAlertMessage("1")}>&times;</span>
                            Success! Indicates a successful or positive action.</div>
                        :
                        null
                }

                <button type="button" className="button-blue float-right mt-1 mb-1" onClick={postPermission}>บันทึก</button>
            </div>
        </div>
    );
};

export default BottomContent;
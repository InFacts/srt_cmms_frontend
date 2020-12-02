import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormik, withFormik, useFormikContext } from 'formik';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import CheckboxInput from '../common/formik-checkbox-input';
import Label from '../common/form-label'

import { changeTheam } from '../../helper.js'
const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const { values } = useFormikContext();
    const [lineNumber, setLineNumber] = useState(-1);

    // useEffect(() => {
    //     if (lineNumber >= 0) {
    //         let list = values.line_position_permission[lineNumber]

    //         var data = {
    //             // "enable_permission": true,
    //             // "user_id": list.user_id,
    //             "function": [
    //                 list.module_spare === true ? 1 : 0,
    //                 list.module_pmt === true ? 2 : 0,
    //                 list.module_als === true ? 3 : 0,
    //                 list.module_track_document === true ? 4 : 0,
    //                 list.module_admin === true ? 5 : 0,
    //                 list.module_master_data === true ? 6 : 0,
    //             ]
    //         }

    //         let data_function_for_post = [];
    //         data.function.map((module, index) => {
    //             if (module !== 0) {
    //                 data_function_for_post.push(module);
    //             }
    //         })

    //         var data_for_post = {
    //             // "enable_permission": true,
    //             // "position_id": list.position_id,
    //             "user_id": list.user_id,
    //             "function": data_function_for_post
    //         }
    //         console.log("data_for_post", data_for_post)
    //         const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/admin/user-permission`;
    //         axios.post(url, data_for_post, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
    //             .then((res) => {
    //                 console.log("res AFTER POST POSITION PERMISSION", res)
    //             })
    //             .catch((err) => {
    //                 console.log("err", err.response)
    //             });


    //     }
    // }, [values.line_position_permission]);

    useEffect(() => {
        if (lineNumber >= 0) {
            let list = values.line_position_permission[lineNumber]

            var data = {
                "enable_permission": true,
                "position_id": list.position_id,
                "function": [
                    list.module_spare === true ? 1 : 0,
                    list.module_pmt === true ? 2 : 0,
                    list.module_als === true ? 3 : 0,
                    list.module_track_document === true ? 4 : 0,
                    list.module_admin === true ? 5 : 0,
                    list. module_master_data === true ? 6 : 0,
                ]
            }

            let data_function_for_post = [];
            data.function.map((module, index) => {
                if (module !== 0) {
                    data_function_for_post.push(module);
                }
            })

            var data_for_post = {
                "enable_permission": true,
                "position_id": list.position_id,
                "function": data_function_for_post
            }
            const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/admin/position-permission`;
            axios.post(url, data_for_post, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
                .then((res) => {
                    // console.log("res AFTER POST POSITION PERMISSION", res)
                })
                .catch((err) => {
                    console.log("err", err.response)
                });


        }
    }, [values.line_position_permission]);

    return (
        <div id={changeTheam() === true ? "" : "blackground-gray"}>
            <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>
                <div className="grid_12">
                    <table className="table-many-column mt-2" style={{ height: "350px", paddingLeft: "10px", paddingRight: "10px" }}>
                        <thead>
                            <tr>
                                <th className="font text-center">#</th>
                                <th className="font">ตำแหน่ง</th>
                                {/* <th className="font">employee_id</th>
                                <th className="font">username</th>
                                <th className="font">firstname</th> */}
                                <th className="font">ระบบบริหารข้อมูลอะไหล่</th>
                                <th className="font">ระบบบริหารงานซ่อมบำรุง</th>
                                <th className="font">ระบบวิเคราะห์เเละวางแผนการซ่อมบำรุง</th>
                                <th className="font text-center">สถานะรอการอนุมัติ</th>
                                <th className="font">ระบบบริหารข้อมูลหลัก</th>
                                <th className="font">ระบบบริหารจัดการผู้ใช้งาน</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.line_position_permission.map((list, index) => {
                                return (
                                    <tr id={index} key={index}>
                                        <td className="edit-padding text-center">{index + 1}</td>
                                        <td className="edit-padding">{list.abbreviation} - {list.name}</td>
                                        {/* <td className="edit-padding">{list.employee_id}</td>
                                        <td className="edit-padding">{list.username}</td>
                                        <td className="edit-padding">{list.firstname_th}</td> */}
                                        <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                            <CheckboxInput name={`line_position_permission[${index}].module_spare`}
                                                onClick={(e) => setLineNumber(e.target.parentNode.parentNode.parentNode.id)}
                                                checked={values.line_position_permission[index].module_spare} value={true} />
                                        </td>
                                        <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                            <CheckboxInput name={`line_position_permission[${index}].module_pmt`}
                                                onClick={(e) => setLineNumber(e.target.parentNode.parentNode.parentNode.id)}
                                                checked={values.line_position_permission[index].module_pmt} value={true} />
                                        </td>
                                        <td className="edit-padding" style={{ padding: "5px 95px" }}>
                                            <CheckboxInput name={`line_position_permission[${index}].module_als`}
                                                onClick={(e) => setLineNumber(e.target.parentNode.parentNode.parentNode.id)}
                                                checked={values.line_position_permission[index].module_als} value={true} />
                                        </td>
                                        <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                            <CheckboxInput name={`line_position_permission[${index}].module_track_document`}
                                                onClick={(e) => setLineNumber(e.target.parentNode.parentNode.parentNode.id)}
                                                checked={values.line_position_permission[index].module_track_document} value={true} />
                                        </td>
                                        <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                            <CheckboxInput name={`line_position_permission[${index}].module_master_data`}
                                                onClick={(e) => setLineNumber(e.target.parentNode.parentNode.parentNode.id)}
                                                checked={values.line_position_permission[index].module_master_data} value={true} />
                                        </td>
                                        <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                            <CheckboxInput name={`line_position_permission[${index}].module_admin`}
                                                onClick={(e) => setLineNumber(e.target.parentNode.parentNode.parentNode.id)}
                                                checked={values.line_position_permission[index].module_admin} value={true} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default BottomContent;
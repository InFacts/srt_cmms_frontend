import React, { useEffect } from 'react';
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

    const postPermission = () => new Promise(resolve => {
        console.log("values", values)
        // var data = {
        //     "enable_permission": true,
        //     "position_id": values.line_position_permission.position_id,
        //     "function": [
        //         values.line_position_permission.module_1 && 1,
        //         values.line_position_permission.module_2 && 2,
        //         values.line_position_permission.module_3 && 3,
        //         values.line_position_permission.module_4 && 4,
        //     ]
        // }
        // console.log("data", data)
        // const url = `http://${API_URL_DATABASE}:${API_PORT_DATABASE}/admin/position-permission`;
        // axios.post(url, data, { headers: { "x-access-token": localStorage.getItem('token_auth') } })
        //     .then((res) => {
        //         resolve(res.data);
        //     })
        //     .catch((err) => {
        //         resolve(err)
        //     });
    });

    return (
        <div id="blackground-gray">
            <div className="container_12 clearfix">

                <table className="table-many-column mt-2" style={{ height: "450px" }}>
                    <thead>
                        <tr>
                            <th className="font" style={{ width: "200px" }}></th>
                            <th className="font" style={{ width: "200px" }}>ตำแหน่ง</th>
                            <th className="font">ระบบบริหารข้อมูลอะไหล่</th>
                            <th className="font">ระบบบริหารงานซ่อมบำรุง</th>
                            <th className="font">ระบบวิเคราะห์เเละวางแผนการซ่อมบำรุง</th>
                            <th className="font">สถานะรอการอนุมัติ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.line_position_permission.map((list, index) => {
                            return (
                                <tr>
                                    <td className="edit-padding">{index + 1}</td>
                                    <td className="edit-padding">{list.abbreviation} - {list.name}</td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].module_1`}
                                            checked={values.line_position_permission[index].module_1} value={true} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].module_2`}
                                            checked={values.line_position_permission[index].module_2} value={true} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 95px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].module_3`}
                                            checked={values.line_position_permission[index].module_3} value={true} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].module_4`}
                                            checked={values.line_position_permission[index].module_4} value={true} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="grid_1">
                    <button type="button" className="button-blue" onClick={postPermission}>ค้นหา</button>
                </div>
            </div>
        </div>
    );
};

export default BottomContent;
import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormik, withFormik, useFormikContext } from 'formik';

import CheckboxInput from '../common/formik-checkbox-input';
import Label from '../common/form-label'

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const { values } = useFormikContext();

    return (
        <div id="blackground-gray">
            <div className="container_12 clearfix">

                <table className="table-many-column mt-2" style={{ height: "450px"}}>
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
                                        checked={values.line_position_permission[index].module_1} value={true}/>
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

            </div>
        </div>
    );
};

export default BottomContent;
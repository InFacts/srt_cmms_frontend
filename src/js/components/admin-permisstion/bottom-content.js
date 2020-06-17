import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormik, withFormik, useFormikContext } from 'formik';

import CheckboxInput from '../common/formik-checkbox-input';
import Label from '../common/form-label'

const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const { values } = useFormikContext();

    // const validatePermission = (fieldName, per_unit_price, index) => {
    //     if (per_unit_price === "") {
    //       return;
    //     }

    //     if (per_unit_price !== "") {
    //       setFieldValue(fieldName, per_unit_price, false);
    //       return;
    //     } else {
    //       return 'Invalid Per Unit Price Line Item';
    //     }
    //   }
    return (
        <div id="blackground-gray">
            <div className="container_12 clearfix">

                <table className="table-many-column mt-2">
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
                            // console.log(String(list.function))
                            return (
                                <tr>
                                    <td className="edit-padding">{index + 1}</td>
                                    <td className="edit-padding">{list.abbreviation} - {list.name}</td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].function`}
                                            // checked={list.function.indexOf(1) !== -1} 
                                            // validate={validatePermission}
                                            value={1} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].function`} value={2} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 95px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].function`} value={3} />
                                    </td>
                                    <td className="edit-padding" style={{ padding: "5px 60px" }}>
                                        <CheckboxInput name={`line_position_permission[${index}].function`} value={4} />
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
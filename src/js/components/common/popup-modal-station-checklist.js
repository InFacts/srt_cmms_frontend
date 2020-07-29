import React, { useState, useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { useFormikContext } from 'formik';
import CheckboxInput from '../common/formik-checkbox-input';
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';

const PopupModalStation = (props) => {
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);

    //* PopUp เลขที่อะไหล่ */
    const [data, setData] = useState([]);
    useEffect(() => {
        if (values.whatIsWeek === "w1_list") {
            setData(values.w1_list[props.line_station] ? values.w1_list[props.line_station].selector_checklist : [])
        } else if (values.whatIsWeek === "w2_list") {
            setData(values.w2_list[props.line_station] ? values.w2_list[props.line_station].selector_checklist : [])
        } else if (values.whatIsWeek === "w3_list") {
            setData(values.w3_list[props.line_station] ? values.w3_list[props.line_station].selector_checklist : [])
        } else if (values.whatIsWeek === "w4_list") {
            setData(values.w4_list[props.line_station] ? values.w4_list[props.line_station].selector_checklist : [])
        }
    }, [values.whatIsWeek, values.w1_list, values.w2_list, values.w3_list, values.w4_list, props.line_station]);

    return (
        <div className="modal" id="modalStation" style={{ display: "none" }}>
            <div className="gray-board">
                <p className="head-title-modal edit">กำหนดแผนในสถานี</p>
                <div className="container_12 edit-padding">

                    <div className="container_12">
                        <table className="table-many-column mt-3" style={{ height: "270px" }}>
                            <thead>
                                <tr>
                                    <th className="font" style={{ minWidth: "30px" }}>#</th>
                                    <th className="font" style={{ minWidth: "30px" }}>มี/ไม่มี</th>
                                    <th className="font" style={{ minWidth: "830px" }}>แผน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data, index) => {
                                    return (
                                        <tr>
                                            <td className="edit-padding text-center"> {index + 1} </td>
                                            <td className="edit-padding" style={{ padding: "7px 10px" }}>
                                                <CheckboxInput name={`${props.name}[${index}].is_have`}
                                                    disabled={props.checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                                    checked={data.is_have} value={true} />
                                            </td>
                                            <td className="edit-padding"> {data.checklist_name}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <button className="button-blue float-right grid_1 mr-5 mt-3" type="button" aria-label="Close active modal" aria-controls="modalStation" id="closeModalNoPart">กลับ</button>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PopupModalStation);
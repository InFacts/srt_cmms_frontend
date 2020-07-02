import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import Files from '../common/files2'
import TableStatus from '../common/table-status';
import TextInput from '../common/formik-text-input';
import TextareaInput from '../common/formik-textarea-input';
import DateTimeInput from '../common/formik-datetime-input';
import SelectNoChildrenInput from '../common/formik-select-no-children';
import { useFormik, withFormik, useFormikContext } from 'formik';
import Label from '../common/form-label'
import PopupModalNoPart from '../common/popup-modal-nopart'
import TableLineItem from './table-line-item.js';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam, checkBooleanForEditHelper } from '../../helper.js'
const BottomContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const factItems = useSelector((state) => ({ ...state.api.fact.items }), shallowEqual);
    const factPosition = useSelector((state) => ({ ...state.api.fact.position }), shallowEqual);
        const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
    const { values, errors, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    const [lineNumber, setLineNumber] = useState('');

  let checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact);
  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])
    return (
        <div id={changeTheam() === true ? "" : "blackground-gray"}>
            <div className="container_12 clearfix" id={changeTheam() === true ? "blackground-gray" : ""} style={ changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {} }>

                {/* === Tab broken_content  === */}
                <div id="broken_content" className="tabcontent">
                    <TableLineItem line_items={values.line_items}
                        setLineNumber={setLineNumber}
                        tabIndex={8}
                        checkBooleanForEdit={checkBooleanForEdit} />

                    <div className="grid_12" style={{ marginTop: "10px" }}>
                        {/* Remark */}
                        <Label>หมายเหตุ</Label>
                        <div className="grid_11 alpha omega">
                            <TextareaInput name="remark" tabIndex="100"
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
                        </div>

                        <div className="clear" />
                    </div>
                </div>
                
                <div id="attachment_content" className="tabcontent">
                    <div className="container_12 ">
                        <Files />
                    </div>
                </div>

                <div id="table_status_content" className="tabcontent">
                    <TableStatus bodyTableStatus={values.step_approve} />
                </div>

                {/* PopUp ค้นหาอะไหล่ broken_content */}
                <PopupModalNoPart keyname='line_items' lineNumber={lineNumber} nameModal="modalNoPart" />

            </div>
        </div>
    );
};

export default BottomContent;
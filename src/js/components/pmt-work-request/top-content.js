import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import PopupModalDocument from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'

import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'
import Label from '../common/form-label'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { FACTS } from '../../redux/modules/api/fact';

import {
    getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID, DOCUMENT_STATUS, validateEmployeeIDField,
    validateWarehouseIDField, validateInternalDocumentIDFieldHelper, validatedataDocumentField, getUserIDFromEmployeeID, checkBooleanForEditHelper
} from '../../helper';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import { useFormikContext, useField } from 'formik';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const TopContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
    const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    // Fill Default Forms
    useFillDefaultsOnModeAdd();


    const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(checkBooleanForEdit, DOCUMENT_TYPE_ID.WORK_REQUEST, toolbar, footer, fact, values, setValues, setFieldValue, validateField, ...args);

    const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);
    const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", fact, setFieldValue, ...args);

    const validateDocumentDateField = (...args) => validatedataDocumentField("document_date", setFieldValue, ...args)

    const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)

    return (
        <div id={changeTheam() === true ? "" : "blackground-white"}>
            <div className="container_12 clearfix" style={{ marginTop: "55px" }}>
                {/* Section Title */}
                <h4 className="head-title">แจ้งเหตุขัดข้อง/ชำรุด</h4>

                <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "130px", paddingTop: "10px" } : {}} >

                    {/* === Left Column === */}
                    <div className={changeTheam() === true ? "grid_5" : "grid_6"} style={{ paddingLeft: "10px" }}>

                        {/* Document ID */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">เลขที่เอกสาร</p>
                        </div>
                        <div className="grid_3">
                            <TextInput name='internal_document_id'
                                validate={validateInternalDocumentIDField}
                                searchable={toolbar.mode === TOOLBAR_MODE.SEARCH}
                                ariaControls="modalDocument"
                                tabIndex="1" />
                        </div>
                        <div class="clear" />

                        {/* User Employee ID  */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">ผู้ดำเนินเรื่อง</p>
                        </div>
                        <div className="grid_3">
                            <TextInput name="created_by_user_employee_id"
                                validate={validateUserEmployeeIDField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName"
                                tabIndex="2" />
                        </div>
                        <div class="clear" />

                        {/* Admin Employee ID  */}
                        <div className="grid_1 alpha white-space">
                            <p className="top-text">ผู้สร้างเอกสาร</p>
                        </div>
                        <div className="grid_3">
                            <TextInput name="created_by_admin_employee_id"
                                validate={validateAdminEmployeeIDField}
                                disabled
                                tabIndex="3" />
                        </div>
                        <div class="clear" />
                    </div>



                    {/* === Right Column === */}
                    <div className="grid_6 prefix_2">

                        {/* Document Status  */}
                        <Label>สถานะ</Label>
                        <div className="grid_3 alpha">
                            <TextInput name="status_name_th"
                                disabled
                                tabIndex="4" />
                        </div>
                        <div class="clear" />

                        {/* Created On */}
                        <Label>วันที่</Label>
                        <div className="grid_3 alpha">
                            <DateTimeInput name="created_on"
                                disabled
                                tabIndex="5" />
                        </div>
                        <div class="clear" />

                        {/* Document date */}
                        <Label>วันที่เอกสาร</Label>
                        <div className="grid_3 alpha">
                            <DateInput name="document_date" validate={validateDocumentDateField}
                                disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                                tabIndex="6" />
                        </div>
                        <div class="clear" />
                    </div>
                </div>
            </div>
            {/* PopUp ค้นหาเลขที่เอกสาร */}
            <PopupModalDocument
                documentTypeGroupID={DOCUMENT_TYPE_ID.WORK_REQUEST}
                id="modalDocument" //For Open POPUP
                name="internal_document_id" //For setFieldValue 
            />

            {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
            <PopupModalUsername />
        </div>
    );
}

export default TopContent;
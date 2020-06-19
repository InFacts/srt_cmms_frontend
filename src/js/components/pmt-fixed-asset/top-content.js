import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import PopupModalDocument from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'

import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { FACTS } from '../../redux/modules/api/fact';
import Label from '../common/form-label'
import { getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID, validateEmployeeIDField, validateWarehouseIDField, validateInternalDocumentIDFieldHelper } from '../../helper';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import { useFormikContext, useField } from 'formik';

const TopContent = (props) => {
    const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
    const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
    const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    // Fill Default Forms
    useFillDefaultsOnModeAdd();

    const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", fact, setFieldValue, ...args);

    return (
        <div id="blackground-white">
            <div className="container_12 clearfix">
                {/* Section Title */}
                <h4 className="head-title" style={{ marginTop: "80px" }}>สรุปการทำวาระซ่อมบำรุง - สินทรัพย์</h4>

                {/* === Left Column === */}
                <div className="grid_12" style={{ paddingLeft: "10px" }}>

                    {/* Equiment ID */}
                    <Label>เลขที่เอกสาร</Label>
                    <div className="grid_3 alpha">
                        <TextInput name='equiment_item_id'
                            searchable={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            tabIndex="1" />
                    </div>

                    {/* Created On */}
                    <div className="float-right">
                    <Label>วันที่</Label>
                    <div className="grid_3 alpha">
                        <DateTimeInput name="created_on"
                            disabled
                            tabIndex="5" />
                    </div>
                    </div>
                    <div class="clear" />

                    {/* No Part */}
                    <Label>เลขที่เอกสารอ้างอิง</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="internal_item_id"
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            searchable={toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName"
                            tabIndex="2" />
                    </div>

                    {/* Document date */}
                    <div className="float-right">
                    <Label>วันที่เอกสาร</Label>
                    <div className="grid_3 alpha">
                        <DateInput name="document_date"
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            tabIndex="6" />
                    </div>
                    </div>
                    <div class="clear" />

                    {/* Description  */}
                    <Label>ชื่อแผนซ่อมบำรุง</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="description"
                            disabled
                            tabIndex="3" />
                    </div>

                    {/* User Employee ID  */}
                    <div className="float-right">
                    <Label>ผู้สร้างเอกสาร</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="created_by_admin_employee_id"
                            validate={validateUserEmployeeIDField}
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            searchable={toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName"
                            tabIndex="2" />
                    </div>
                    </div>
                    <div class="clear" />

                    {/* UOM  */}
                    <Label>เลขที่สินทรัพย์</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="uom_id"
                            // validate={validateAdminEmployeeIDField} เลขที่ของ ผู้สร้างเอกสาร  รายละเอียด หน่วย need to add later
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            tabIndex="3" />
                    </div>
                    {/* UOM  */}
                    <Label>เลขที่สิ่งของ</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="uom_id"
                            // validate={validateAdminEmployeeIDField} เลขที่ของ ผู้สร้างเอกสาร  รายละเอียด หน่วย need to add later
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            tabIndex="3" />
                    </div>
                    <div class="clear" />

                    {/* UOM  */}
                    <Label>รายละเอียด</Label>
                    <div className="grid_7 alpha">
                        <TextInput name="uom_id"
                            // validate={validateAdminEmployeeIDField} เลขที่ของ ผู้สร้างเอกสาร  รายละเอียด หน่วย need to add later
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            tabIndex="3" />
                    </div>
                    <div class="clear" />

                    {/* UOM  */}
                    <Label>แขวง</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="uom_id"
                            // validate={validateAdminEmployeeIDField} เลขที่ของ ผู้สร้างเอกสาร  รายละเอียด หน่วย need to add later
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            tabIndex="3" />
                    </div>
                    <div class="clear" />

                    {/* UOM  */}
                    <Label>ตอน</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="uom_id"
                            // validate={validateAdminEmployeeIDField} เลขที่ของ ผู้สร้างเอกสาร  รายละเอียด หน่วย need to add later
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            tabIndex="3" />
                    </div>
                    <div class="clear" />

                    {/* UOM  */}
                    <Label>สถานี</Label>
                    <div className="grid_3 alpha">
                        <TextInput name="uom_id"
                            // validate={validateAdminEmployeeIDField} เลขที่ของ ผู้สร้างเอกสาร  รายละเอียด หน่วย need to add later
                            disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                            tabIndex="3" />
                    </div>
                    <div class="clear" />
                </div>
            </div>

            {/* PopUp ค้นหาเลขที่เอกสาร */}
            <PopupModalDocument
                documentTypeGroupID={DOCUMENT_TYPE_ID.EQUIPMENT_INSTALLATION}
                id="modalDocument" //For Open POPUP
                name="internal_document_id" //For setFieldValue 
            />

            {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
            <PopupModalUsername />
        </div>
    );
}

export default TopContent;
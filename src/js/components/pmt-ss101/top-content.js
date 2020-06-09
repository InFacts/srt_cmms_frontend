import React, { useEffect } from 'react';
import { shallowEqual, useSelector  } from 'react-redux'

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'

import { useFormikContext, useField } from 'formik';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalUsername from '../common/popup-modal-username'

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID , validateEmployeeIDField, validateWarehouseIDField, validateInternalDocumentIDFieldHelper} from '../../helper';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import Label from '../common/form-label'

const TopContent = (props) => {
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const fact = useSelector((state) => ({...state.api.fact}), shallowEqual);
    const footer = useSelector((state) => ({...state.footer}), shallowEqual);

    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    // Fill Default Forms
    useFillDefaultsOnModeAdd();

    const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(DOCUMENT_TYPE_ID.SS101, toolbar, footer, fact, values , setValues, setFieldValue, validateField, ...args);
    
    const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);
    const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", fact, setFieldValue, ...args);

    return (
    <div id="blackground-white">
    <div className="container_12 clearfix" style={{marginTop: "55px"}}>
        {/* Section Title */}
        <h4 className="head-title">แจ้งเหตุขัดข้อง/ชำรุด</h4>

        {/* === Left Column === */}
        <div className="grid_6" style={{paddingLeft: "10px"}}>

            {/* Document ID */}
            <Label>เลขที่เอกสาร</Label>
            <div className="grid_3 alpha">
                <TextInput name='internal_document_id'
                    validate={validateInternalDocumentIDField}
                    searchable={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                    ariaControls="modalDocument"
                    tabIndex="1" />
            </div>
            <div class="clear" />

            {/* User Employee ID  */}
            <Label>ผู้ดำเนินเรื่อง</Label>
            <div className="grid_3 alpha">
                <TextInput name="created_by_user_employee_id" 
                    validate={validateUserEmployeeIDField}
                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                    searchable={toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName"
                    tabIndex="2"/>
            </div>
            <div class="clear" />

            {/* Admin Employee ID  */}
            <Label>ผู้สร้างเอกสาร</Label>
            <div className="grid_3 alpha">
                <TextInput name="created_by_admin_employee_id" 
                    validate={validateAdminEmployeeIDField}
                    disabled 
                    tabIndex="3"/>
            </div>
            <div class="clear" />

            {/* wo_internal_document_id  */}
            <Label>เลขที่เอกสารอ้างอิง</Label>
            <div className="grid_3 alpha">
                <TextInput name="wo_internal_document_id" 
                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                    searchable={toolbar.mode !== TOOLBAR_MODE.SEARCH} 
                    ariaControls="modalWODocument"
                    tabIndex="4"/>
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
                    tabIndex="5"/>
            </div>
            <div class="clear" />

            {/* Created On */}
            <Label>วันที่</Label>
            <div className="grid_3 alpha">
                <DateTimeInput name="created_on" 
                    disabled 
                    tabIndex="6"/>
            </div>
            <div class="clear" />

            {/* Document date */}
            <Label>วันที่เอกสาร</Label>
            <div className="grid_3 alpha">
                <DateInput name="document_date"
                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                    tabIndex="7" />
            </div>
            <div class="clear" />
        </div>
        </div>

        {/* PopUp ค้นหาเลขที่เอกสาร */}
        <PopupModalDocument 
        documentTypeGroupID={DOCUMENT_TYPE_ID.SS101} 
        id="modalDocument" //For Open POPUP
        name="internal_document_id" //For setFieldValue 
        />

        {/* PopUp ค้นหาเลขที่เอกสาร WO*/}
        <PopupModalDocument 
        documentTypeGroupID={DOCUMENT_TYPE_ID.WORK_ORDER} 
        id="modalWODocument" //For Open POPUP
        name="wo_internal_document_id" //For setFieldValue 
        />

        {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
        <PopupModalUsername />
        </div>
    )
}


export default TopContent;
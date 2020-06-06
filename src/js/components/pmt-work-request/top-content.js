import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux'
import PopupModalWorkRequest from './popup-modal-work-request'
import PopupModalDocument from '../common/popup-modal-document'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { FACTS } from '../../redux/modules/api/fact';
import Label from '../common/form-label'
import { getEmployeeIDFromUserID, fetchStepApprovalDocumentData, DOCUMENT_TYPE_ID , validateEmployeeIDField, validateWarehouseIDField, validateInternalDocumentIDFieldHelper} from '../../helper';
import { v4 as uuidv4 } from 'uuid';

import { useFormikContext, useField } from 'formik';

const TopContent = (props) => {
    const toolbar = useSelector((state) => ({...state.toolbar}), shallowEqual);
    const fact = useSelector((state) => ({...state.api.fact}), shallowEqual);
    const decoded_token = useSelector((state) => ({...state.token.decoded_token}), shallowEqual);
    const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();

    // Fill Default Forms
  useEffect(() => {
    if (toolbar.mode === TOOLBAR_MODE.ADD) {
      if (!values.internal_document_id && touched.internal_document_id){
        setFieldValue('internal_document_id', `draft-${uuidv4()}`, true)
      }
      setFieldValue("created_by_admin_employee_id", getEmployeeIDFromUserID(fact.users, decoded_token.id));
      setFieldValue("created_on", new Date().toISOString().slice(0, 16), false);
    }
    
  }, [ fact.users, toolbar.mode, touched.internal_document_id, !values.internal_document_id,
    toolbar.requiresHandleClick[TOOLBAR_ACTIONS.ADD]]) // This needs requiresHandleClick since it resetsForm AFTER the setField Value, making it not show anything

    const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(toolbar, fact, values , setValues, setFieldValue, validateField, ...args)
    
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
        </div>



        {/* === Right Column === */}
        <div className="grid_6 prefix_2">

            {/* Document Status  */}
            <Label>สถานะ</Label>
            <div className="grid_3 alpha">
                <TextInput name="status_name_th" 
                    disabled 
                    tabIndex="4"/>
            </div>
            <div class="clear" />

            {/* Created On */}
            <Label>วันที่</Label>
            <div className="grid_3 alpha">
                <DateTimeInput name="created_on" 
                    disabled 
                    tabIndex="5"/>
            </div>
            <div class="clear" />

            {/* Document date */}
            <Label>วันที่เอกสาร</Label>
            <div className="grid_3 alpha">
                <DateInput name="document_date"
                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} 
                    tabIndex="6" />
            </div>
            <div class="clear" />
        </div>
    </div>
    <PopupModalDocument 
        documentTypeGroupID={DOCUMENT_TYPE_ID.WORK_REQUEST} 
        id="modalDocument" //For Open POPUP
        name="internal_document_id" //For setFieldValue 
    />
    {/* <PopupModalWorkRequest /> */}
    </div>
    );
}

export default TopContent;
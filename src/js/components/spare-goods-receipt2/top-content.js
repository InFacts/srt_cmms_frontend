import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';
import { v4 as uuidv4 } from 'uuid';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'

import { useFormikContext, useField } from 'formik';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalInventory from '../common/popup-modal-inventory'
import PopupModalUsername from '../common/popup-modal-username'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import { getEmployeeIDFromUserID, fetchStepApprovalDocumentData, 
  DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID,
  isValidInternalDocumentIDFormat, isValidInternalDocumentIDDraftFormat ,
  fetchAttachmentDocumentData, validateEmployeeIDField, validateWarehouseIDField,
  validateInternalDocumentIDFieldHelper} from '../../helper';
import { FACTS } from '../../redux/modules/api/fact.js';


const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm   } = useFormikContext();

  // Fill Default Forms
  useEffect(() => {
    if (props.toolbar.mode === TOOLBAR_MODE.ADD) {
      if (!values.internal_document_id && touched.internal_document_id){
        setFieldValue('internal_document_id', `draft-${uuidv4()}`, true)
      }
      setFieldValue("created_by_admin_employee_id", getEmployeeIDFromUserID(props.fact.users, props.decoded_token.id), true);
      setFieldValue("created_on", new Date().toISOString().slice(0, 16), false);
    }
  }, [props.fact.users, props.toolbar.mode, touched.internal_document_id, !values.internal_document_id])


  // Get approval Step when values.document_id changes
  useEffect(() => {
    if(values.document_id){ // If not an empty string
      // Start Axios Get step_approve and attachment By nuk
      fetchStepApprovalDocumentData(values.document_id)
      .then((result) => {
        // Setup value From Approve 
        setFieldValue("step_approve", result.approval_step === undefined ? [] : result.approval_step, false);
        if(result.is_canceled){
          setFieldValue("document_is_canceled", result.is_canceled.data, false);
        }
      });
    }
  }, [values.document_id]);

  // Get  attachment when values.document_id changes
  useEffect(() => {
    if(values.document_id) { // If not an empty string
      // Start Axios Get step_approve and attachment By nuk
      fetchAttachmentDocumentData(values.document_id)
      .then((desrciption_files) => {
        // Setup value From Attachment
        setFieldValue("desrciption_files_length", desrciption_files.results.length, false);
        setFieldValue("desrciption_files", desrciption_files.results, false);
      });
    }
  }, [values.document_id]);


  const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(props.toolbar, props.fact, values , setValues, validateField, ...args)

  const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", props.fact, setFieldValue, ...args);
  const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", props.fact, setFieldValue, ...args);

  const validateDestWarehouseIDField = (...args) => validateWarehouseIDField("dest_warehouse_id", props.fact, setFieldValue, ...args);

  return (
    <div id="blackground-white">
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <h4 className="head-title">นำอะไหล่เข้าโดยมีใบสั่งซื้อ</h4>
          <div className="container_12">

            {/* Document ID */}
            <div className="grid_2">
              <p className="top-text">เลขที่เอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <TextInput name='internal_document_id' validate={validateInternalDocumentIDField}
                searchable={props.toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1" />
            </div>

            {/* Document Status  */}
            <div className="grid_3 float-right">
              <TextInput name="status_name_th" disabled />
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">สถานะ</p>
            </div>
          </div>

          <div className="container_12">
            {/* Created by User */}
            <div className="grid_2">
              <p className="top-text">ผู้นำเข้า</p>
            </div>
            <div className="grid_3 pull_1">
              {/* Q: If this is user name in thai, how do we get ID? */}
              <TextInput name="created_by_user_employee_id" validate={validateUserEmployeeIDField}
                disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                searchable={props.toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName" tabIndex="2" />
            </div>

            {/* Created On */}
            <div className="grid_3 float-right">
              <DateTimeInput name="created_on" /*validate={validateCreateOnField */
                disabled />
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">วันที่</p>
            </div>
          </div>

          <div className="container_12">
            {/* Admin Name */}
            <div className="grid_2">
              <p className="top-text">ผู้สร้างเอกสาร</p>
            </div>
            <div className="grid_3 pull_1">
              <TextInput name="created_by_admin_employee_id" validate={validateAdminEmployeeIDField} disabled />
            </div>

            {/* Document date */}
            <div className="grid_3 float-right">
              <DateInput name="document_date"
                disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="3" />
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">วันที่เอกสาร</p>
            </div>

          </div>

          {/* PO ID */}
          <div className="container_12">
            <div className="grid_2">
              <p className="top-text">เลขที่ใบสั่งซื้อ/เลขที่เอกสารอ้างอิง</p>
            </div>
            <div className="grid_3 pull_0">
              <TextInput name="po_id" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="4" />
            </div>

            {/* Dest Warehouse ID */}
            <div className="grid_3 float-right">
              <TextInput name="dest_warehouse_id" validate={validateDestWarehouseIDField}
                disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                searchable={props.actionMode !== TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" tabIndex="5" />
            </div>
            <div className="grid_2 float-right">
              <p className="top-text float-right">เลขที่คลัง</p>
            </div>
          </div>
        </section>
      </div>

      {/* PopUp ค้นหาเลขที่เอกสาร */}
      <PopupModalDocument documentTypeGroupID={DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO} 
      id="modalDocument" //For Open POPUP
      name="internal_document_id" //For setFieldValue
      />

      {/* PopUp ค้นหาเลขที่คลัง MODE ADD */}
      <PopupModalInventory 
       id="modalInventory" //For Open POPUP
      name="dest_warehouse_id"/>

      {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
      <PopupModalUsername />

    </div>
  )

}
const mapStateToProps = (state) => ({
  fact: state.api.fact,
  toolbar: state.toolbar,
  decoded_token: state.token.decoded_token,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);
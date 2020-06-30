import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux'

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'

import { useFormikContext, useField } from 'formik';

import PopupModalDocument from '../common/popup-modal-document'
import PopupModalInventory from '../common/popup-modal-inventory'
import PopupModalUsername from '../common/popup-modal-username'
import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import {
  getEmployeeIDFromUserID, fetchStepApprovalDocumentData,
  DOCUMENT_TYPE_ID, getDocumentbyInternalDocumentID,
  isValidInternalDocumentIDFormat, isValidInternalDocumentIDDraftFormat,
  fetchAttachmentDocumentData, validateEmployeeIDField, validateWarehouseIDField,
  validateInternalDocumentIDFieldHelper, DOCUMENT_STATUS, getUserIDFromEmployeeID,
  validatedataDocumentField, checkBooleanForEditHelper
} from '../../helper';
import { FACTS } from '../../redux/modules/api/fact.js';
import { FOOTER_MODE, FOOTER_ACTIONS } from '../../redux/modules/footer.js';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

  // Fill Default Forms
  useFillDefaultsOnModeAdd(DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO);

  const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(checkBooleanForEdit, DOCUMENT_TYPE_ID.GOODS_RECEIPT_PO, toolbar, footer, fact, values, setValues, setFieldValue, validateField, ...args)

  const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);
  const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", fact, setFieldValue, ...args);

  const validateDestWarehouseIDField = (...args) => validateWarehouseIDField("dest_warehouse_id", fact, setFieldValue, ...args);

  const validateDocumentDateField = (...args) => validatedataDocumentField("document_date", setFieldValue, ...args)

  let checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact);
  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <h4 className="head-title">นำอะไหล่เข้าโดยมีใบสั่งซื้อ</h4>

          <div id={changeTheam() === true ? "blackground-white" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "165px", paddingTop: "10px" } : {}} >

            <div className="container_12">

              {/* Document ID */}
              <div className="grid_2">
                <p className="top-text">เลขที่เอกสาร</p>
              </div>
              <div className="grid_3 pull_1">
                <TextInput name='internal_document_id' validate={validateInternalDocumentIDField}
                  searchable={toolbar.mode === TOOLBAR_MODE.SEARCH} ariaControls="modalDocument" tabIndex="1" />
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
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalUserName" tabIndex="2" />
              </div>

              {/* Created On */}
              <div className="grid_3 float-right">
                <DateTimeInput name="created_on"
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
                <DateInput name="document_date" validate={validateDocumentDateField}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="3" />
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
                <TextInput name="po_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="4" />
              </div>

              {/* Dest Warehouse ID */}
              <div className="grid_3 float-right">
                <TextInput name="dest_warehouse_id" validate={validateDestWarehouseIDField}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  searchable={checkBooleanForEdit === true ? true : toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalInventory" tabIndex="5" />
              </div>
              <div className="grid_2 float-right">
                <p className="top-text float-right">เลขที่คลัง</p>
              </div>
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
        name="dest_warehouse_id" />

      {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
      <PopupModalUsername />

    </div>
  )

}

export default TopContent;
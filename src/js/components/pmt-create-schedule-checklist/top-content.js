import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'
import Label from '../common/form-label'
import SelectNoChildrenInput from '../common/formik-select-no-children';

import PopupModalDocument from '../common/popup-modal-document';
import PopupModalUsername from '../common/popup-modal-username';

import { useFormikContext, useField } from 'formik';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import {
  getNumberFromEscapedString, fetchGoodsOnhandDataForItemmasterData, DOCUMENT_TYPE_ID,
  getDocumentbyInternalDocumentID, checkBooleanForEditHelper, validateEmployeeIDField,
  validateInternalDocumentIDFieldHelper
} from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'

const FormTitle = ({ children }) => (
  <h4 className="head-title">{children}</h4>
);

const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm, resetForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factEquipment = useSelector((state) => ({ ...state.api.fact.equipment }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const factEquipmentStatus = useSelector((state) => ({ ...state.api.fact[FACTS.EQUIPMENT_STATUS] }), shallowEqual);

  // Fill Default Forms
  useFillDefaultsOnModeAdd();
  const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDFieldHelper(checkBooleanForEdit, DOCUMENT_TYPE_ID.SELECTOR, toolbar, footer, fact, values, setValues, setFieldValue, validateField, ...args);

  const validateUserEmployeeIDField = (...args) => validateEmployeeIDField("created_by_user_employee_id", fact, setFieldValue, ...args);
  const validateAdminEmployeeIDField = (...args) => validateEmployeeIDField("created_by_admin_employee_id", fact, setFieldValue, ...args);

  let checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact);
  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])
  console.log("checkBooleanForEdit", checkBooleanForEdit)

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>กำหนดแผนการทำวาระ</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""}
            style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "150px", paddingTop: "10px" } : {}}>

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

              {/* name แผนการทำวาระ */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">ชื่อแผนวาระ</p>
              </div>
              <div className="grid_3">
                <TextInput name="name"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  tabIndex="3" />
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
                <DateInput name="document_date"
                  // validate={validateDocumentDateField}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  tabIndex="6" />
              </div>
              <div class="clear" />

              {/* Document date */}
              <Label>วันเวลาที่เริ่มทำวาระ</Label>
              <div className="grid_3 alpha">
                <DateInput name="start_on"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  tabIndex="6" />
              </div>
              <div class="clear" />

            </div>

          </div>

        </section>

        {/* PopUp ค้นหาเลขที่เอกสาร */}
        <PopupModalDocument
          documentTypeGroupID={DOCUMENT_TYPE_ID.SELECTOR}
          id="modalDocument" //For Open POPUP
          name="internal_document_id" //For setFieldValue 
        />

        {/* PopUp ค้นหาชื่อพนักงาน MODE ADD */}
        <PopupModalUsername />
      </div>
    </div>
  )

}

export default TopContent;
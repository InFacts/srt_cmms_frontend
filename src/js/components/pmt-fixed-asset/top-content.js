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
  getDocumentbyInternalDocumentID, checkBooleanForEditCheckNodeIDHelperForWorkOrderPM, validateEmployeeIDField,
  validateInternalDocumentIDWorfOrderPMFieldHelper, validatedataDocumentField
} from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js';
import useFillDefaultsOnModeAdd from '../../hooks/fill-defaults-on-mode-add'
import RadioAutoIncrementInput from '../common/formik-radio-input-ai'

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'

const FormTitle = ({ children }) => (
  <h4 className="head-title">{children}</h4>
);

const TopContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm, resetForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factDistricts = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);

  // Fill Default Forms
  useFillDefaultsOnModeAdd(DOCUMENT_TYPE_ID.WORK_ORDER_PM);
  const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDWorfOrderPMFieldHelper(decoded_token, checkBooleanForEdit, DOCUMENT_TYPE_ID.WORK_ORDER_PM, toolbar, footer, fact, values, setValues, setFieldValue, validateField, ...args);

  const validateNameField = (...args) => validatedataDocumentField("name", setFieldValue, ...args)
  const validateDocumentDateField = (...args) => validatedataDocumentField("document_date", setFieldValue, ...args)

  let checkBooleanForEdit = checkBooleanForEditCheckNodeIDHelperForWorkOrderPM(values, decoded_token, fact);

  return (
    <div id={changeTheam() === true ? "" : "blackground-white"}>
      <div className="container_12 clearfix">
        <section className="container_12 ">
          <FormTitle>ทำวาระ</FormTitle>

          <div id={changeTheam() === true ? "blackground-white" : ""}
            style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray", height: "210px", paddingTop: "10px" } : {}}>

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
                  validate={validateNameField}
                  disabled
                  tabIndex="2" />
              </div>
              <div class="clear" />

              {/* User Employee ID  */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">ผู้ดำเนินเรื่อง</p>
              </div>
              <div className="grid_3">
                <TextInput name="created_by_user_employee_id"
                  // validate={validateUserEmployeeIDField}
                  disabled
                  tabIndex="3" />
              </div>
              <div class="clear" />

              {/* Admin Employee ID  */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">ผู้สร้างเอกสาร</p>
              </div>
              <div className="grid_3">
                <TextInput name="created_by_admin_employee_id"
                  // validate={validateAdminEmployeeIDField}
                  disabled
                  tabIndex="4" />
              </div>
              <div class="clear" />

              {/* Admin Employee ID  */}
              <div className="grid_1 alpha white-space mt-4">
                <p className="top-text" style={{ color: "red" }}>หมายเหตุ ห้ามสร้างเอกสารทำวาระจำเป็นที่จะต้องรอระบบทำการสร้างตามกำหนดวาระประจำเดือน</p>
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
                  tabIndex="5" />
              </div>
              <div class="clear" />

              {/* Created On */}
              <Label>วันที่</Label>
              <div className="grid_3 alpha">
                <DateTimeInput name="created_on"
                  disabled
                  tabIndex="6" />
              </div>
              <div class="clear" />

              {/* Document date */}
              <Label>วันที่เอกสาร</Label>
              <div className="grid_3 alpha">
                <DateInput name="document_date"
                  validate={validateDocumentDateField}
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                  tabIndex="7" />
              </div>
              <div class="clear" />

              {/* Document date */}
              <Label>วันเวลาที่เริ่มทำวาระ</Label>
              <div className="grid_3 alpha">
                <DateInput name="start_on"
                  disabled
                  tabIndex="8" />
              </div>
              <div class="clear" />

              {/* Document date */}
              <Label>แขวง</Label>
              <div className="grid_3 alpha">
              <SelectNoChildrenInput name="district_id" tabIndex="7"
                  disabled>
                  <option value=''></option>
                  {factDistricts.items.map((districts) => (
                    <option key={districts.district_id} value={districts.district_id}>{districts.name}</option>
                  ))}
                </SelectNoChildrenInput>
              </div>
              <div class="clear" />

              {/* Document date */}
              <Label>ตอน</Label>
              <div className="grid_3 alpha">
              <SelectNoChildrenInput name="node_id" tabIndex="7"
                  disabled >
                  <option value=''></option>
                  {factNodes.items.map((node) => {
                    if (values.district_id == node.district_id) {
                      return <option key={node.node_id} value={node.node_id} selected>{node.name}</option>
                    }
                  })}
                </SelectNoChildrenInput>
              </div>
              <div class="clear" />

            </div>

          </div>

        </section>

        {/* PopUp ค้นหาเลขที่เอกสาร */}
        <PopupModalDocument
          documentTypeGroupID={DOCUMENT_TYPE_ID.WORK_ORDER_PM}
          id="modalDocument" //For Open POPUP
          name="internal_document_id" //For setFieldValue 
        />

      </div>
    </div>
  )

}

export default TopContent;
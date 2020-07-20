import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import NumberInput from '../common/formik-number-input';
import DateInput from '../common/formik-date-input'
import Label from '../common/form-label'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import PopupModalEquipmentNoChildren from '../common/popup-modal-equipment-no-children'
import PopupModalDocument from '../common/popup-modal-document';

import { useFormikContext, useField } from 'formik';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import {
  getNumberFromEscapedString, fetchGoodsOnhandDataForItemmasterData, DOCUMENT_TYPE_ID,
  getDocumentbyInternalDocumentID, checkBooleanForEditCheckNodeIDHelper, validateEmployeeIDField,
  validateInternalDocumentIDWorfOrderPMFieldHelper
} from '../../helper';

import { FACTS } from '../../redux/modules/api/fact.js';

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
  const factDistict = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
  const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);

  const validateInternalDocumentIDField = (...args) => validateInternalDocumentIDWorfOrderPMFieldHelper(checkBooleanForEdit, DOCUMENT_TYPE_ID.WORK_ORDER_PM, toolbar, footer, fact, values, setValues, setFieldValue, validateField, ...args);

  let checkBooleanForEdit = checkBooleanForEditCheckNodeIDHelper(values, decoded_token, fact);
  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])

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

              {/* Admin Employee ID  */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">แผน</p> {/* ก.ไฟฟ้า */}
              </div>
              <div className="grid_3">
                <SelectNoChildrenInput name="checklist_id"
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}>
                  <option value=''></option>
                  {factChecklist.items.map((factChecklist) => {
                    return <option value={factChecklist.checklist_id} key={factChecklist.checklist_id}>{factChecklist.checklist_name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div class="clear" />

              {/* Admin Employee ID  */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">งาน</p>
              </div>
              <div className="grid_3">
                <TextInput name="name"
                  disabled
                  tabIndex="3" />
              </div>
              <div class="clear" />

              <div className="container_12">

                <div className="grid_2 alpha white-space">
                  <p className="top-text">ความถี่การซ่อมบำรุง</p>
                </div>
                <div className="grid_3 alpha omega pull_0">
                  <NumberInput name="freq" step={1}
                    disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
                </div>
                <div className="grid_1 omega pull_0">
                  <p className="top-text">ครั้งต่อ</p>
                </div>
                <div className="grid_2 alpha omega pull_0">
                  <SelectNoChildrenInput name="freq_unit_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}>
                    <option value=''></option>
                    <option value='1'>วัน</option>
                    <option value='2'>เดือน</option>
                    <option value='3'>ปี</option>
                  </SelectNoChildrenInput>
                </div>

              </div>

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

              {/* === Distict ID === */}
              <Label>แขวง</Label>
              <div className="grid_3 alpha">
                <SelectNoChildrenInput name="location_district_id" disabled>
                  <option value=''></option>
                  {factDistict.items.map((factDistict) => {
                          return <option value={factDistict.district_id} key={factDistict.district_id} selected>{factDistict.name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              <Label>ตอน</Label>
              <div className="grid_3 alpha">
                <SelectNoChildrenInput name="location_node_id" disabled>
                  <option value=''></option>
                  {factNodes.items.map((node) => {
                    return <option key={node.node_id} value={node.node_id}>{node.name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              {/* === location === */}
              <Label>สถานี</Label>
              <div className="grid_3 alpha">
                <SelectNoChildrenInput name="location_station_id" disabled>
                  <option value=''></option>
                  {factStations.items.map((stations) => {
                    return <option key={stations.station_id} value={stations.station_id}>{stations.name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

            </div>

          </div>

        </section>

        {/* PopUp ค้นหาเลขที่เอกสาร */}
        <PopupModalDocument
          documentTypeGroupID={DOCUMENT_TYPE_ID.WORK_ORDER_PM}
          id="modalDocument" //For Open POPUP
          name="internal_document_id" //For setFieldValue 
        />

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalEquipmentNoChildren />
      </div>
    </div>
  )

}

export default TopContent;
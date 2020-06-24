import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import FormInput from '../common/form-input'
import TextInput from '../common/formik-text-input'
import DateTimeInput from '../common/formik-datetime-input'
import DateInput from '../common/formik-date-input'
import Label from '../common/form-label'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import PopupModalEquipmentNoChildren from '../common/popup-modal-equipment-no-children'

import { useFormikContext, useField } from 'formik';

import { TOOLBAR_MODE, TOOLBAR_ACTIONS, toModeAdd } from '../../redux/modules/toolbar.js';
import {
  getNumberFromEscapedString, fetchGoodsOnhandDataForItemmasterData, DOCUMENT_TYPE_ID,
  getDocumentbyInternalDocumentID, checkBooleanForEditHelper
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

  const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)

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
                  // validate={validateInternalDocumentIDField}
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
                  // validate={validateUserEmployeeIDField}
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
                  // validate={validateAdminEmployeeIDField}
                  disabled
                  tabIndex="3" />
              </div>
              <div class="clear" />

              {/* Admin Employee ID  */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">งาน</p>
              </div>
              <div className="grid_3">
                <TextInput name="created_by_admin_employee_id"
                  // validate={validateAdminEmployeeIDField}
                  disabled
                  tabIndex="3" />
              </div>
              <div class="clear" />

              {/* Admin Employee ID  */}
              <div className="grid_1 alpha white-space">
                <p className="top-text">แผน</p> {/* ก.ไฟฟ้า */}
              </div>
              <div className="grid_3">
                <TextInput name="created_by_admin_employee_id"
                  // validate={validateAdminEmployeeIDField}
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

              {/* === Distict ID === */}
              <Label>แขวง</Label>
              <div className="grid_3 alpha">
                <SelectNoChildrenInput name="location_district_id" disabled>
                  <option value=''></option>
                  {factDistict.items.map((factDistict) => {
                    return <option value={factDistict.distict_id}>{factDistict.name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              <Label>ตอน</Label>
              <div className="grid_3 alpha">
                <SelectNoChildrenInput name="location_node_id" disabled>
                  <option value=''></option>
                  {factNodes.items.map((node) => {
                    if (values.location_district_id == node.district_id) {
                      return <option key={node.node_id} value={node.node_id} selected>{node.name}</option>
                    }
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
                    if (values.location_node_id == stations.node_id) {
                      return <option key={stations.station_id} value={stations.station_id} selected>{stations.name}</option>
                    }
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

            </div>

          </div>

        </section>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalEquipmentNoChildren />
      </div>
    </div>
  )

}

export default TopContent;
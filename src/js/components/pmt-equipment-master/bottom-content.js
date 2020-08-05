import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import TextareaInput from '../common/formik-textarea-input';
import TextInput from '../common/formik-text-input'
import NumberInput from '../common/formik-number-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import Label from '../common/form-label'
import PopupModalCheckListLineItem from '../common/popup-modal-checklist'

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam } from '../../helper.js'
const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factEquipmentStatus = useSelector((state) => ({ ...state.api.fact[FACTS.EQUIPMENT_STATUS] }), shallowEqual);

  const factDistict = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);

  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const factEquipmentGroup = useSelector((state) => ({ ...state.api.fact[FACTS.CHECKLIST_GROUP] }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);
  const factXCross = useSelector((state) => ({ ...state.api.fact[FACTS.X_CROSS] }), shallowEqual);

  const validateUomItemmasterDataIDField = (fieldName, uom_id) => {
    if (!uom_id) {
      return 'Required'
    }
    setFieldValue(fieldName, uom_id, false);
    let uoms = props.fact['unit-of-measures'].items;
    let uom = uoms.find(uom => `${uom.uom_id}` === `${uom_id}`); // Returns undefined if not found
    setFieldValue("uom_name", uom.name, false);
  };
  const validateUomIDField = (...args) => validateUomItemmasterDataIDField("uom_id", ...args);

  const validateItemMasterdataField = (fieldName, name) => {
    if (!name) {
      return 'Required'
    }
    return;
  };
  const validateMinimumOrderQuantityField = (...args) => validateItemMasterdataField("minimum_order_quantity", ...args);
  const validateLeadTimeField = (...args) => validateItemMasterdataField("lead_time", ...args);
  const validateToleranceTimeField = (...args) => validateItemMasterdataField("tolerance_time", ...args);
  const validateActiveField = (...args) => validateItemMasterdataField("active", ...args);
  const validateItemGroupIDField = (...args) => validateItemMasterdataField("checklist_group_id", ...args);

  const validatePriceCurrently = (...args) => validateItemMasterdataField("price_currently", ...args);
  const validateDepreciation = (...args) => validateItemMasterdataField("depreciation", ...args);
  const validateUsefulLife = (...args) => validateItemMasterdataField("useful_life", ...args);
  const validateResposibleDistrictID = (...args) => validateItemMasterdataField("responsible_district_id", ...args);
  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>
          {/* General Tab */}
          <div id="general_content" className="tabcontent">
            <div className="container_12 mt-3">

              {/* === uom_id === */}
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อย่อหน่วยนับ </p>
              </div>
              <div className="grid_3 pull_1">
                <SelectNoChildrenInput name="uom_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} validate={validateUomIDField} cssStyle={{ left: "-160px", top: "10px" }} tabIndex="6" >
                  <option value=''></option>
                  {fact['unit-of-measures'].items.map((list_uoms) => (
                    list_uoms.uom_id === values.uom_id
                      ?
                      <option value={list_uoms.uom_id} key={list_uoms.uom_id} selected> {list_uoms.abbreviation} </option>
                      :
                      <option value={list_uoms.uom_id} key={list_uoms.uom_id}> {list_uoms.abbreviation} </option>
                  ))}
                </SelectNoChildrenInput>
              </div>

              {/* === minimum_order_quantity === */}
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">ขั้นต่ำการสั่งซื้อ</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={0.01} name="minimum_order_quantity" tabIndex="7" cssStyle={{ left: "60px", top: "-5px" }}
                    validate={validateMinimumOrderQuantityField}
                    disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH}
                  />
                </div>
                <div className="grid_1 ml-0 pull_0">
                  <p className="cancel-default"></p>
                </div>
              </div>
            </div>

            {/* === uom_name === */}
            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อหน่วยนับ  </p>
              </div>
              <div className="grid_3 pull_1">
                <TextInput name='uom_name' disabled />
              </div>

              {/* === lead_time === */}
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">Lead Time</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={1} name="lead_time" tabIndex="8" validate={validateLeadTimeField} cssStyle={{ left: "60px", top: "-5px" }}
                    disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH}
                  />
                </div>
                <div className="grid_1">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            {/* === tolerance_time === */}
            <div className="container_12">
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">Tolerance Days</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={1} name="tolerance_time" tabIndex="9"
                    validate={validateToleranceTimeField} cssStyle={{ left: "60px", top: "-5px" }}
                    disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH}
                  />
                </div>
                <div className="grid_1">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            <div className="container_12 mt-3">
              {/* === active === */}
              <div className="grid_2 cancel-default">
                <p className="cancel-default">สถานะอะไหล่ </p>
              </div>
              <div className="grid_3 pull_1">
                <SelectNoChildrenInput name="active" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} tabIndex="10" >
                  {/* <option value=''></option> */}
                  <option value='1'>เปิดการใช้งาน</option>
                  <option value='0'>ปิดการใช้งาน</option>
                </SelectNoChildrenInput>
              </div>

              {/* === accounting_type === */}
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">ประเภทบัญชี</p>
                </div>
                <div className="grid_2">
                  <TextInput name="accounting_type"
                    disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} tabIndex="11" />
                </div>
                <div className="grid_1">
                  <p className="cancel-default"></p>
                </div>
              </div>
            </div>

            {/* === remark === */}
            <div className="container_12 mt-3">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="12"
                  disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH}
                />
              </div>
            </div>
          </div>

          {/* Equipment Tab  */}
          <div id="equipment_content" className="tabcontent">
            {/* === One Column   ==== */}
            <div className="grid_12 mt-2">

              {/* === price_import === */}
              <div className="grid_2">
                <p className="top-text">มูลค่านำเข้า</p>
              </div>
              <div className="grid_2 alpha omega">
                <NumberInput step={0.01} name="price_import" disabled />
              </div>
              <Label>บาท</Label>

              {/* === responsible_by === */}
              <div className="grid_3 alpha omega float-right">
                <SelectNoChildrenInput name="responsible_district_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} tabIndex="13" validate={validateResposibleDistrictID} cssStyle={{ left: "-160px", top: "10px" }}>
                  <option value=''></option>
                  {factDistict.items.map((factDistict) => {
                    return <option value={factDistict.district_id}>{factDistict.name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 float-right">
                <p className="top-text">หน่วยงานที่รับผิดชอบ</p>
              </div>
              <div className="clear" />

              {/* === price currently === */}
              <div className="grid_2">
                <p className="top-text">มูลค่าปัจจุบัน</p>
              </div>
              <div className="grid_2 alpha omega">
                <NumberInput step={0.01} name="price_currently" tabIndex="14" validate={validatePriceCurrently} cssStyle={{ left: "60px", top: "-5px" }}
                  disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH}
                />
              </div>
              <Label>บาท</Label>

              {/* === ผู้รับผิดชอบตามพื้นที่ TODO ===  */}
              <div className="grid_3 alpha omega float-right">
                <SelectNoChildrenInput name="responsible_node_id" disabled>
                  <option value=''></option>
                  {factNodes.items.map((node) => {
                    return <option key={node.node_id} value={node.node_id}>{node.name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="grid_2 float-right">
                <p className="top-text">ผู้รับผิดชอบตามพื้นที่</p>
              </div>

              <div className="clear" />

              {/* === depreciation ===  */}
              <div className="grid_2">
                <p className="top-text">ค่าเสื่อมต่อปี</p>
              </div>
              <div className="grid_2 alpha omega">
                <NumberInput step={0.01} name="depreciation" tabIndex="15" validate={validateDepreciation} cssStyle={{ left: "60px", top: "-5px" }}
                  disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH}
                />
              </div>
              <Label>บาท</Label>

              <div className="clear" />

              {/* === Straight Line method === */}
              <div className="grid_2">
                <p className="top-text">ประเภทค่าเสื่อม</p>
              </div>
              <div className="grid_3 alpha omega">
                <SelectNoChildrenInput name='method' disabled={true}>
                  {values.description && <option value=''>Straight Line method</option>}
                </SelectNoChildrenInput>
              </div>

              <div className="clear" />

              {/* === useful_life ===  */}
              <div className="grid_2">
                <p className="top-text">อายุการใช้งาน</p>
              </div>
              <div className="grid_2 alpha omega">
                <NumberInput step={1} name="useful_life" tabIndex="16" validate={validateUsefulLife} cssStyle={{ left: "60px", top: "-5px" }}
                  disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH}
                />
              </div>
              <Label>เดือน</Label>
              <div className="clear" />


              <div className="grid_2">
                <p className="top-text mt-1" style={{ fontWeight: "bold" }}>สถานที่</p>
              </div>
              <div className="clear" />

              {/* === Distict ID === */}
              <div className="grid_2">
                <p className="top-text">แขวง</p>
              </div>
              <div className="grid_5 alpha omega">
                <SelectNoChildrenInput name="location_district_id" disabled>
                  <option value=''></option>
                  {factDistict.items.map((factDistict) => {
                    return <option value={factDistict.district_id}>{factDistict.name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              <div className="grid_2">
                <p className="top-text">ตอน</p>
              </div>
              <div className="grid_5 alpha omega">
                <SelectNoChildrenInput name="location_node_id" disabled>
                  <option value=''></option>
                  {factNodes.items.map((node) => {
                    return <option key={node.node_id} value={node.node_id}>{node.name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              {/* === location === */}
              <div className="grid_2">
                <p className="top-text">สถานี</p>
              </div>
              <div className="grid_5 alpha omega">
                <SelectNoChildrenInput name="location_station_id" disabled>
                  <option value=''></option>
                  {factStations.items.map((stations) => {
                    return <option key={stations.station_id} value={stations.station_id}>{stations.name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              <div className="grid_2">
                <p className="top-text">รายละเอียดสถานี</p>
              </div>
              <div className="grid_5 alpha omega">
                <TextInput name="location_description"
                  disabled />
              </div>

              <div className="clear" />

              {/* === location === */}
              <div className="grid_2">
                <p className="top-text">ศูนย์กลางทางผ่าน</p>
              </div>
              <div className="grid_5 alpha omega">
                <SelectNoChildrenInput name="x_cross_x_cross_id" disabled>
                  <option value=''></option>
                  {factXCross.items.map((x_cross) => {
                    return <option key={x_cross.x_cross_id} value={x_cross.x_cross_id}>{x_cross.road_center} \\ {x_cross.name} \\ {x_cross.x_road_name}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

            </div>
          </div>

          {/* Equipment Plane Tab  */}
          <div id="equipment_plane_content" className="tabcontent">
            {/* === One Column   ==== */}
            <div className="grid_12 mt-2">

              {/* equipment_group -> name  */}
              <div className="grid_2">
                <p className="top-text">กลุ่มของการบำรุงรักษา</p>
              </div>
              <div className="grid_3 alpha omega">
                <SelectNoChildrenInput name="checklist_group_id" disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH} validate={validateItemGroupIDField} cssStyle={{ left: "-160px", top: "10px" }} tabIndex="17" >
                  <option value=''></option>
                  {factEquipmentGroup.items.map((item_group) => {
                    // if (item_group.checklist_group_id !== 1) {
                      return <option value={item_group.checklist_group_id} key={item_group.checklist_group_id}> {item_group.name} </option>
                    // }
                  })}
                </SelectNoChildrenInput>
              </div>

              <div className="clear" />

              {/* checklist -> checklist_name  */}
              <div className="grid_2">
                <p className="top-text">ชนิดของการบำรุงรักษา</p>
              </div>
              <div className="grid_3 alpha omega">
                <SelectNoChildrenInput name="checklist_id"
                  disabled={values.modeEdit ? false : toolbar.mode === TOOLBAR_MODE.SEARCH || toolbar.mode === TOOLBAR_MODE.JUST_SEARCH}
                  cssStyle={{ left: "-160px", top: "10px" }} tabIndex="18" >
                  <option value=''></option>
                  {factChecklist.items.map((factChecklist) => {
                    if (values.checklist_group_id == factChecklist.checklist_group_id) {
                      return (<option value={factChecklist.checklist_id}>{factChecklist.checklist_name}</option>)
                    }
                  })}
                </SelectNoChildrenInput>
              </div>

              <div className="clear" />

              <table className="table-many-column mt-2">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ width: "30px" }}>#</th>
                    <th className="font" style={{ width: "200px" }}>ชื่อรายการบำรุงรักษา</th>
                    <th className="font" style={{ width: "200px" }}>ความถี่ของการบำรุงรักษา</th>
                    <th className="font" style={{ width: "500px" }}>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {/* checklist_line_item */}
                  {values.checklist_line_item.map((checklist_line_item) => {
                    return (
                      <tr>
                        <td className="edit-padding text-center">{checklist_line_item.line_number}</td>
                        <td className="edit-padding"></td>
                        <td className="edit-padding"></td>
                        <td className="edit-padding"></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

            </div>
          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>

          {/* History Tab  */}
          <div id="history_content" className="tabcontent">
            {/* === One Column   ==== */}

            {/* Document ที่เกี่ยวกับ Equipment */}
            <div className="grid_12 mt-2">
              <table className="table-many-column mt-2">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ width: "30px" }}>#</th>
                    <th className="font" style={{ width: "200px" }}>เวลา</th>
                    <th className="font" style={{ width: "300px" }}>เลขที่เอกสาร</th>
                    <th className="font" style={{ width: "300px" }}>ประเภทเอกสาร</th>
                    <th className="font" style={{ width: "200px" }}>สถานะ</th>
                    {/* <th className="font" style={{ width: "150px" }}>มูลค่า</th>
                    <th className="font" style={{ width: "150px" }}>หมายเหตุ</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* {console.log("values.ref_document", values.ref_document)} */}
                  {values.ref_document.map((document, index) => {
                    let statuses = factEquipmentStatus.items;
                    let status = statuses.find(status => `${status.equipment_status_id}` === `${document.equipment_status_id}`); // Returns undefined if not found
                    if (status) {
                    return (
                      <tr>
                        <td className="edit-padding text-center">{index + 1}</td>
                        <td className="edit-padding">{document.timestamp && document.timestamp.split("T")[0]}</td>
                        <td className="edit-padding">{document.internal_document_id}</td>
                        <td className="edit-padding">{document.document_type_name}</td>
                        <td className="edit-padding">{status.status_th}</td>
                        {/* <td className="edit-padding"></td>
                        <td className="edit-padding"></td> */}
                      </tr>
                    )
                      }
                  })}
                </tbody>
              </table>

            </div>
          </div>

        </div>

        {/* PopUp ค้นหาอะไหล่ */}
        <PopupModalCheckListLineItem />

      </div>
    </>
  )
};

const mapStateToProps = (state) => ({
  fact: state.api.fact,
  toolbar: state.toolbar,
  decoded_token: state.token.decoded_token,
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(BottomContent);
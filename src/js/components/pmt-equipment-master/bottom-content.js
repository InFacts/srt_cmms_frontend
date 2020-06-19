import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
// import Table from '../common/table'; เปลัี่ยน Table ให้เป็นแบบสำหรับ form นี้
import TextInput from '../common/formik-text-input'
import NumberInput from '../common/formik-number-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import Label from '../common/form-label'

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';

import '../../../css/table.css';

const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);

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
    setFieldValue(fieldName, name, false);
  };
  const validateMinimumOrderQuantityField = (...args) => validateItemMasterdataField("minimum_order_quantity", ...args);
  const validateLeadTimeField = (...args) => validateItemMasterdataField("lead_time", ...args);
  const validateToleranceTimeField = (...args) => validateItemMasterdataField("tolerance_time", ...args);
  const validateActiveField = (...args) => validateItemMasterdataField("active", ...args);

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id="blackground-gray">
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 ">
          {/* General Tab */}
          <div id="general_content" className="tabcontent">
            <div className="container_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อย่อหน่วยนับ </p>
              </div>
              <div className="grid_3 pull_1">
                <SelectNoChildrenInput name="uom_id" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} validate={validateUomIDField} cssStyle={{ left: "-160px", top: "10px" }}>
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

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">ขั้นต่ำการสั่งซื้อ</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={0.01} name="minimum_order_quantity" tabIndex="7" cssStyle={{ left: "60px", top: "-5px" }}
                    validate={validateMinimumOrderQuantityField}
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
                <div className="grid_1 ml-0 pull_0">
                  <p className="cancel-default"></p>
                </div>
              </div>
            </div>

            <div className="container_12">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">ชื่อหน่วยนับ  </p>
              </div>
              <div className="grid_3 pull_1">
                <TextInput name='uom_name' disabled tabIndex="1" />
              </div>

              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">Lead Time</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={1} name="lead_time" tabIndex="7" validate={validateLeadTimeField} cssStyle={{ left: "60px", top: "-5px" }}
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
                <div className="grid_1">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            <div className="container_12">
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">Tolerance Days</p>
                </div>
                <div className="grid_2">
                  <NumberInput step={1} name="tolerance_time" tabIndex="7"
                    validate={validateToleranceTimeField} cssStyle={{ left: "60px", top: "-5px" }}
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                  />
                </div>
                <div className="grid_1">
                  <p className="cancel-default">วัน </p>
                </div>
              </div>
            </div>

            <div className="container_12 mt-3">
              <div className="grid_2 cancel-default">
                <p className="cancel-default">สถานะอะไหล่ </p>
              </div>
              <div className="grid_3 pull_1">
                <SelectNoChildrenInput name="active" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                  validate={validateActiveField} cssStyle={{ left: "-160px", top: "10px" }}>
                  <option value=''></option>
                  {values.active === 0
                    ?
                    <>
                      <option value='0' selected>ปิดการใช้งาน</option>
                      <option value='1'>เปิดการใช้งาน</option>
                    </>
                    :
                    <>
                      <option value='0'>ปิดการใช้งาน</option>
                      <option value='1' selected>เปิดการใช้งาน</option>
                    </>
                  }
                </SelectNoChildrenInput>
              </div>
              <div className="float-right">
                <div className="grid_2 cancel-default">
                  <p className="cancel-default float-right">ประเภทบัญชี</p>
                </div>
                <div className="grid_2">
                  <TextInput name="accounting_type"
                    disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="2" />
                </div>
                <div className="grid_1">
                  <p className="cancel-default"></p>
                </div>
              </div>
            </div>

            <div className="container_12 mt-3">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="6"
                  disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
            </div>
          </div>

          {/* Equipment Tab  */}
          <div id="equipment_content" className="tabcontent">
            {/* === One Column   ==== */}
            <div className="grid_12 mt-2">

              {/* equipment_status_log -> price for frist order  */}
              <div className="grid_2">
                <p className="top-text">มูลค่านำเข้า</p>
              </div>
              <div className="grid_2 alpha omega">
                <TextInput name="equipment_status_log"
                  disabled={true} />
              </div>
              <Label>บาท</Label>

              <div className="grid_2 alpha omega float-right">
                <TextInput name="equipment_status_log"
                  disabled={true} />
              </div>
              <div className="grid_2 float-right">
                <p className="top-text">หน่วยงานที่รับผิดชอบ</p>
              </div>
              <div className="clear" />

              {/* description_equipment`  */}
              <div className="grid_2">
                <p className="top-text">ค่าเสื่อมต่อปี</p>
              </div>
              <div className="grid_2 alpha omega">
                <TextInput name="description_equipment`"
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <Label>บาท</Label>

              {/* price currently  */}
              <div className="grid_2 alpha omega float-right">
                <TextInput name="price currently"
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <div className="grid_2 float-right">
                <p className="top-text">ผู้รับผิดชอบตามพื้นที่</p>
              </div>

              <div className="clear" />

              {/* Straight Line method  */}
              <div className="grid_2">
                <p className="top-text">ประเภทค่าเสื่อม</p>
              </div>
              <div className="grid_3 alpha omega">
                <TextInput name="method"
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>

              <div className="clear" />

              {/* useful_life  */}
              <div className="grid_2">
                <p className="top-text">อายุการใช้งาน</p>
              </div>
              <div className="grid_2 alpha omega">
                <TextInput name="useful_life"
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <Label>เดือน</Label>
              <div className="clear" />


              <div className="grid_2">
                <p className="top-text mt-1" style={{ fontWeight: "bold" }}>สถานที่</p>
              </div>
              <div className="clear" />


              {/* location  */}
              <div className="grid_2">
                <p className="top-text">สถานี</p>
              </div>
              <div className="grid_5 alpha omega">
                <TextInput name="location"
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <div className="clear" />

              <div className="grid_2">
                <p className="top-text">รายละเอียดสถานี</p>
              </div>
              <div className="grid_5 alpha omega">
                <TextInput name="location"
                  disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} />
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
                <SelectNoChildrenInput name="equipment_group" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} cssStyle={{ left: "-160px", top: "10px" }}>
                  <option value=''></option>
                </SelectNoChildrenInput>
              </div>

              <div className="clear" />

              {/* checklist -> checklist_name  */}
              <div className="grid_2">
                <p className="top-text">ชนิดของการบำรุงรักษา</p>
              </div>
              <div className="grid_3 alpha omega">
                <SelectNoChildrenInput name="checklist" disabled={props.toolbar.mode === TOOLBAR_MODE.SEARCH} cssStyle={{ left: "-160px", top: "10px" }}>
                  <option value=''></option>
                </SelectNoChildrenInput>
              </div>

              <div className="clear" />

              <table className="table-many-column mt-2">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ width: "30px" }}>#</th>
                    <th className="font" style={{ width: "200px" }}>ชื่อรายการบำรุงรักษา</th>
                    <th className="font" style={{ width: "200px" }}>ความถี่ของการบำรุงรักษา</th>
                    <th className="font" style={{ width: "350px" }}>หมายเหตุ</th>
                    <th className="font" style={{ width: "150px" }}>action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                  </tr>
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
            <div className="grid_12 mt-2">
              <table className="table-many-column mt-2">
                <thead>
                  <tr>
                    <th className="font text-center" style={{ width: "30px" }}>#</th>
                    <th className="font" style={{ width: "200px" }}>เวลา</th>
                    <th className="font" style={{ width: "200px" }}>เลขที่เอกสาร</th>
                    <th className="font" style={{ width: "200px" }}>ประเภทเอกสาร</th>
                    <th className="font" style={{ width: "150px" }}>สถานะ</th>
                    <th className="font" style={{ width: "150px" }}>มูลค่า</th>
                    <th className="font" style={{ width: "150px" }}>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                    <td className="edit-padding"></td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

        </div>
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
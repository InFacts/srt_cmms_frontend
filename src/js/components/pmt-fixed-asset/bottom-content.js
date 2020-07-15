import React, { useEffect, useState } from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import axios from "axios";
import { API_PORT_DATABASE } from '../../config_port.js';
import { API_URL_DATABASE } from '../../config_url.js';

import TextareaInput from '../common/formik-textarea-input';
import TextInput from '../common/formik-text-input'
import NumberInput from '../common/formik-number-input'
import SelectNoChildrenInput from '../common/formik-select-no-children';
import Label from '../common/form-label'
import PopupModalCheckListLineItem from '../common/popup-modal-checklist'
import TableHasEquipment from '../common/table-has-equipment';
import TableStatus from '../common/table-status';
import TableCreatePlan from '../common/table_word_order_pm';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam, checkBooleanForEditCheckNodeIDHelper, sumTotalLineItemHelper } from '../../helper.js'

const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factLevel = useSelector((state) => ({ ...state.api.fact[FACTS.LEVEL] }), shallowEqual);

  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const factEquipmentGroup = useSelector((state) => ({ ...state.api.fact[FACTS.EQUIPMENT_GROUP] }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);
  const factDistict = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
  const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const factItemStatus = useSelector((state) => ({ ...state.api.fact[FACTS.ITEM_STATUS] }), shallowEqual);

  const sumTotalLineItem = (quantity, per_unit_price, description) => sumTotalLineItemHelper(quantity, per_unit_price, description);

  let checkBooleanForEdit = checkBooleanForEditCheckNodeIDHelper(values, decoded_token, fact);
  useEffect(() => {
    checkBooleanForEdit = false
    validateField("internal_document_id")
  }, [values.internal_document_id])

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>
          {/* General Tab */}
          {/* <div id="general_content" className="tabcontent">

            <table className="table-many-column" style={{ padding: "10px" }}>
              <thead>
                <tr>
                  <th className="font text-center" style={{ width: "50px" }}>#</th>
                  <th className="font" style={{ width: "200px" }}>เลขที่สินทรัพย์เสียหาย</th>
                  <th className="font" style={{ width: "350px" }}>รายละเอียด</th>
                  <th className="font" style={{ width: "150px" }}>สถานะ</th>
                  <th className="font" style={{ width: "200px" }}>หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                {values.line_items.map(function (list, index) {
                  let line_number = index + 1;
                  return (
                    <tr key={index}>
                      <th className="edit-padding text-center">{line_number}</th>
                      <td className="edit-padding">
                        <TextInput name={`line_items[${index}].internal_item_id`}
                          // validate={internal_item_id => validateLineNumberInternalItemIDField(`line_items[${index}]`, internal_item_id, index)}
                          tabIndex="6"
                          disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                          searchable={toolbar.mode !== TOOLBAR_MODE.SEARCH} ariaControls="modalEquipment"
                          handleModalClick={() => props.setLineNumber(line_number)}
                          redBorderForError="error-in-table"
                        />
                      </td>
                      <td className="edit-padding">{list && list.description}</td>

                      <td className="edit-padding text-center">
                        <SelectNoChildrenInput name={`line_items[${index}].item_status_id`} disabled={toolbar.mode === TOOLBAR_MODE.SEARCH} >
                          <option value='' selected></option>
                          {factItemStatus.items.map((factItemStatus) => {
                            if (list) {
                              if (values.line_items[index].item_status_id === factItemStatus.item_status_id) {
                                return <option key={factItemStatus.item_status_id} value={factItemStatus.item_status_id} selected>{factItemStatus.description_th}</option>
                              } else return <option key={factItemStatus.item_status_id} value={factItemStatus.item_status_id}>{factItemStatus.description_th}</option>
                            }
                          })}
                        </SelectNoChildrenInput>
                      </td>

                      <td className="edit-padding text-center">
                        <TextInput name={`line_items[${index}].remark`} tabIndex="6"
                          disabled={toolbar.mode === TOOLBAR_MODE.SEARCH}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div className="container_12">
              <div className="grid_1"><p className="cancel-default">หมายเหตุ</p></div>
              <div className="grid_11">
                <TextareaInput name="remark" tabIndex="6"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH}
                />
              </div>
            </div>

          </div> */}

          {/* === Tab related_parties_content  === */}
          <div id="related_parties_content" className="tabcontent">
            {/* Component Title */}
            <h3 className="head-title-bottom mt-2">ผู้ปฎิบัติงาน</h3>

            {/* === One Column   ==== */}
            <div className="grid_12">
              {/* auditor_name  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">ผู้ควบคุมตรวจสอบชื่อ</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="auditor_name" tabIndex="31"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>

              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="auditor_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="32">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.auditor_position_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              {/* fixer_name  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">ดำเนินการแก้ไขชื่อ</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="fixer_name" tabIndex="33"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="fixer_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="34">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.fixer_position_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />


              {/* member_1  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="member_1" tabIndex="35"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="member_1_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="36">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.member_1_position_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              {/* member_2  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="member_2"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="37" />
              </div>
              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="member_2_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="38">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.member_2_position_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />

              {/* member_3  */}
              <div className="grid_2 alpha white-space">
                <p className="top-text">รายชื่อเพื่อนร่วมงาน</p>
              </div>
              <div className="grid_4 alpha omega">
                <TextInput name="member_3" tabIndex="39"
                  disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} />
              </div>
              <Label>ตำแหน่ง</Label>
              <div className="grid_4 alpha omega">
                <SelectNoChildrenInput name="member_3_position_id" disabled={checkBooleanForEdit === true ? false : toolbar.mode === TOOLBAR_MODE.SEARCH} tabIndex="40">
                  <option value='' selected></option>
                  {factLevel.items.map((position) => {
                    if (values.member_3_position_id === position.level_id) {
                      return <option key={position.level_id} value={position.level_id} selected>{position.level}</option>
                    } else return <option key={position.level_id} value={position.level_id}>{position.level}</option>
                  })}
                </SelectNoChildrenInput>
              </div>
              <div className="clear" />
            </div>

          </div>

          <div id="item_content" className="tabcontent">
            <TableCreatePlan checklist_line_item_use_equipment={values.checklist_line_item_use_equipment}
              sumTotalLineItem={sumTotalLineItem}
            />
          </div>

          {/* Attachment Tab */}
          <div id="attachment_content" className="tabcontent">
            <Files />
          </div>

          <div id="table_status_content" className="tabcontent">
            <TableStatus bodyTableStatus={values.step_approve} />
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
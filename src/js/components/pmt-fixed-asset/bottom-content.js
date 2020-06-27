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
import TableCreatePlan from '../common/table_for_create-plan_pmt';

import Files from '../common/files2'

import { TOOLBAR_MODE, toModeAdd } from '../../redux/modules/toolbar.js';
import { useFormikContext } from 'formik';
import { FACTS } from '../../redux/modules/api/fact.js';

import '../../../css/table.css';

import BgBlue from '../../../images/pmt/bg_blue.jpg';
import { fetchPositionPermissionData, changeTheam, checkBooleanForEditHelper } from '../../helper.js'
const BottomContent = (props) => {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur, getFieldProps, setValues, validateField, validateForm } = useFormikContext();
  const toolbar = useSelector((state) => ({ ...state.toolbar }), shallowEqual);
  const fact = useSelector((state) => ({ ...state.api.fact }), shallowEqual);
  const factPosition = useSelector((state) => ({ ...state.api.fact.position }), shallowEqual);

  const footer = useSelector((state) => ({ ...state.footer }), shallowEqual);
  const factEquipmentGroup = useSelector((state) => ({ ...state.api.fact[FACTS.EQUIPMENT_GROUP] }), shallowEqual);
  const factChecklist = useSelector((state) => ({ ...state.api.fact.checklist }), shallowEqual);
  const factDistict = useSelector((state) => ({ ...state.api.fact.districts }), shallowEqual);
  const factNodes = useSelector((state) => ({ ...state.api.fact.nodes }), shallowEqual);
  const factStations = useSelector((state) => ({ ...state.api.fact.stations }), shallowEqual);
  const decoded_token = useSelector((state) => ({ ...state.token.decoded_token }), shallowEqual);
  const factItemStatus = useSelector((state) => ({ ...state.api.fact[FACTS.ITEM_STATUS] }), shallowEqual);

  const checkBooleanForEdit = checkBooleanForEditHelper(values, decoded_token, fact)

  return (
    <>
      {/* THIS MAKES THE BACKGROUND NOT GRAY!! NEEDS TO FIX */}
      <div id={changeTheam() === true ? "" : "blackground-gray"}>
        {/* <div className="container_12 clearfix"> */}
        <div className="container_12 " id={changeTheam() === true ? "blackground-gray" : ""} style={changeTheam() === true ? { marginTop: "10px", borderRadius: "25px", border: "1px solid gray" } : {}}>
          {/* General Tab */}
          <div id="general_content" className="tabcontent">

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

          </div>

          <div id="item_content" className="tabcontent">
            <TableCreatePlan checklist_line_item_use_equipment={values.checklist_line_item_use_equipment} />
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